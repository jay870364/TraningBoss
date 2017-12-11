import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FileManagement } from '@boss/bosscontrol/services/file/fileManagement';
import { IFileInfo } from '@boss/bosscontrol/services/file/IFileInfo';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'boss-file',
  templateUrl: './boss-file.component.html',
  styleUrls: ['./boss-file.component.scss']
})
export class BossFileComponent implements OnInit, OnChanges {
  @Input() fileCodes: string[] | string = [];

  @Input() public layout = 'text';
  @Input() public previewSize = 's';
  @Input() public showDeleteButton = false;
  @Output() public itemDelete = new EventEmitter();
  @Output() public itemUp = new EventEmitter();
  @Output() public itemDown = new EventEmitter();
  public fileKeys: string[] = [];
  public fileinfoMap: { [key: string]: IFileInfo } = {};
  protected isImage(file: IFileInfo) {
    return /^image/i.test(file.ContentType);
  }

  protected supportsMedia(mimetype, container) {
    if (!window[`supportsMedia-elem-${container}`]) {
      window[`supportsMedia-elem-${container}`] = document.createElement(container);
    }
    const elem = window[`supportsMedia-elem-${container}`];
    if (typeof elem.canPlayType === 'function') {
      const playable = elem.canPlayType(mimetype);
      if ((playable.toLowerCase() === 'maybe') || (playable.toLowerCase() === 'probably')) {
        return true;
      }
    }
    return false;
  };
  protected isVideo(file: IFileInfo) {
    return /^video/i.test(file.ContentType) && this.supportsMedia(file.ContentType, 'video');
  }
  protected isAudio(file: IFileInfo) {
    return /^audio/i.test(file.ContentType) && this.supportsMedia(file.ContentType, 'audio');
  }
  public getFileType(file: IFileInfo) {
    if (this.isImage(file)) {
      return 'image';
    } else if (this.isVideo(file)) {
      return 'video';
    } else if (this.isAudio(file)) {
      return 'audio'
    }
  }
  constructor(public fileManagement: FileManagement, protected sanitizer: DomSanitizer) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('fileCodes' in changes) {
      this.fileinfoMap = {};
      this.fileKeys = [];
      let value = changes['fileCodes'].currentValue;
      if (value) {
        if (typeof value === 'string') {
          value = value.split(',');
        }
        this.fileManagement.getFileInfo(value).subscribe(result => {
          this.fileinfoMap = result;
          this.fileKeys = value.filter(x => x in result);
        });
      }
    }
  }
}
