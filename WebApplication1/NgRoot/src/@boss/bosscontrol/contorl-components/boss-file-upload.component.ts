import { Component, OnInit, Input } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BossConfirmFileComponent } from '@boss/bosscontrol/dialogs/boss-confirm-file.component';
import { ViewChild } from '@angular/core';
import { FileManagement, IPlatformFile } from '../services/file/fileManagement';
import { IFileInfo } from '@boss/bosscontrol/services/file/IFileInfo';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BossImageCropperComponent } from '@boss/bosscontrol/dialogs/boss-image-cropper.component';

@Component({
  selector: 'boss-file-upload',
  templateUrl: './boss-file-upload.component.html',
  styleUrls: ['./boss-file-upload.component.scss']
})
export class BossFileUploadComponent extends BossAutoFormControl implements OnInit {

  @Input() public required: boolean;
  @Input() public hint: string;
  @Input() public path: string;
  @Input() public layout = 'text';
  @Input() public fileCountLimit = 1;
  @Input() public fileSizeLimit = 2048;
  @Input() public extLimit: string[];
  @Input() public cropperSize: { width: number, height: number };

  constructor(protected dialog: MatDialog, protected fileManagement: FileManagement, protected sanitizer: DomSanitizer, protected snackBar: MatSnackBar, protected translate: TranslateService) {
    super();
  }
  public deleteItem(key: string) {
    const current = (this.control.value || '').split(',') as string[];
    const del = current.indexOf(key);
    if (del >= 0) {
      current.splice(del, 1);
      this.control.setValue(current.join(','));
    }
  }
  public itemMove(key: string, direction: number) {
    const current = (this.control.value || '').split(',') as string[];
    const target = current.indexOf(key);
    if (target >= 0) {
      const tmp = current[target + direction];
      current[target + direction] = current[target];
      current[target] = tmp;
      this.control.setValue(current.join(','));
    }
  }
  ngOnInit() {

    super.ngOnInit();
    this.subs.push(this.control.valueChanges.subscribe(nv => {
      const count = nv ? nv.split(',').length : 0;
      if (count > this.fileCountLimit) {
        this.control.setErrors({
          'fileCountLimit': { limit: this.fileCountLimit, current: count }
        })
      }
    }))
  }
  protected toFileObject(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return (<File>blob);
  }
  protected processImageFile(file: File, ok: (file?: IPlatformFile) => void) {
    if (this.cropperSize) {
      const dataUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        if (img.width !== this.cropperSize.width || img.height !== this.cropperSize.height) {
          this.dialog.open(BossImageCropperComponent, {
            data: {
              image: img,
              width: this.cropperSize.width,
              height: this.cropperSize.height,
              message: file.type === 'image/gif' ? 'BossControl.GIFWarn' : undefined
            }
          }).afterClosed().subscribe(result => {
            URL.revokeObjectURL(dataUrl);
            if (result) {
              ok({ file: this.toFileObject(result), name: file.name });
            } else {
              ok();
            }
          })
        } else {
          URL.revokeObjectURL(dataUrl);
          ok({ file: file, name: file.name });
        }
      };
      img.src = dataUrl;
    } else {
      ok({ file: file, name: file.name })
    }
  }
  protected processFiles(files: File[]): Promise<IPlatformFile[]> {

    return new Promise<IPlatformFile[]>(resolve => {
      const results: IPlatformFile[] = [];
      files.map(x => {
        switch (x.type) {
          case 'image/jpeg':
          case 'image/bmp':
          case 'image/png':
          case 'image/gif':
          case 'image/svg':
            return (next: () => void) => this.processImageFile(x, f => {
              if (f) {
                results.push(f);
              }
              next();
            });
          default:
            return (next: () => void) => {
              results.push({ file: x, name: x.name });
              next();
            };
        }
      }).reduce((chain, item) => next => item(() => chain(() => next())))(() => resolve(results));
    });
  }
  protected uploadFiles(files: File[]) {
    this.processFiles(files).then(maped => {
      if (maped.length) {
        this.fileManagement.upload(maped, this.path).subscribe(codes => {
          if (this.fileCountLimit === 1) {
            this.control.setValue(codes);
          } else {
            this.control.setValue((this.control.value || '').split(',').concat(codes).filter(x => x).join(','));
          }
        });
      }
    });

  }
  public fileChanged(files: FileList) {
    let tempFiles = Array.from(files);
    if (this.extLimit && this.extLimit.length) {
      const ok = [];
      const no = [];
      tempFiles.forEach(f => {
        const np = f.name.split('.');
        const ext = np[np.length - 1].toLowerCase();
        if (np.length === 1 || (this.extLimit.indexOf(ext) < 0)) {
          no.push(f);
        } else {
          ok.push(f);
        }
      });
      if (no.length) {
        this.translate.get('BossControl.不符合副檔名限制').subscribe(res => {
          this.snackBar.open(res + `(${this.extLimit.join(',')})`, 'Ok', {
            duration: 3000
          });
        })
      }
      tempFiles = ok;
    }
    if (this.fileSizeLimit) {
      const ok = [];
      const no = [];
      tempFiles.forEach(f => {
        if (f.size > (this.fileSizeLimit * 1024)) {
          no.push(f);
        } else {
          ok.push(f);
        }
      });
      if (no.length) {
        this.translate.get('BossControl.檔案大小超過', { limit: this.fileSizeLimit }).subscribe(res => {
          this.snackBar.open(res + `(${no.map(x => x.name).join(',')})`, 'Ok', {
            duration: 3000
          });
        })
      }
      tempFiles = ok;
    }
    if (tempFiles.length) {
      this.dialog.open(BossConfirmFileComponent, {
        data: { files: tempFiles }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.uploadFiles(tempFiles);
        }
      });
    }
  }
}
