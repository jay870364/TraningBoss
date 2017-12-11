import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IFileInfo } from '@boss/bosscontrol/services/file/IFileInfo';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfiguration } from '@boss/platform/app.configuraton';
import { Router, NavigationStart } from '@angular/router';
export interface IPlatformFile { file: Blob; name: string }
@Injectable()
export class FileManagement {
    cacheData: { [key: string]: IFileInfo } = {};
    constructor(protected http: Http, protected sanitizer: DomSanitizer, protected config: AppConfiguration, protected router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.cacheData = {};
            }
        })
    }
    public upload(files: IPlatformFile[], path: string): Observable<string[]> {
        const formData = new FormData();
        files.forEach((file, i) => formData.append(file.name, file.file, file.name));
        return this.http.post(`api/filemanagement/file/${path || ''}`, formData).first().map(r => r.json());
    }

    public getFileInfo(codes: string[]): Observable<{ [key: string]: IFileInfo }> {
        const cached = {};
        codes.filter(x => x in this.cacheData).forEach(x => {
            cached[x] = this.cacheData[x];
        });
        const need = codes.filter(x => !(x in this.cacheData));
        if (need.length === 0) {
            return Observable.from([cached]);
        }
        const result = this.http.post(`api/filemanagement/info`, {
            AccessKeys: need
        }).first().map(r => r.json());
        result.subscribe(r => {
            this.cacheData = Object.assign(this.cacheData, r);
        });

        return result.map(x => Object.assign(cached, x));
    }
    public getFileUrl(key: string, file: IFileInfo) {
        return this.sanitizer.bypassSecurityTrustUrl(this.config.apiEndpoint + `api/filemanagement/file/${key}/${encodeURI(file.Name)}`);
    }
}
