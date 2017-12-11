
 //改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/his1')
    @I18nNamespace('Model.EDI.his1')
    export class his1 {
        
        @Key()
        public Id: number;
        // Required()// StringLength(100)
        public Title: string;
        // MaxLength()
        public Images: string;
        // MaxLength()
        public Content: string;
        
        public CreatedTime: Date;
        
        public CreatedBy: number;
        
        public LastModifiedTime: Date;
        
        public LastModifiedBy: number;
    }
    
    /*
    "his1": {
        
        "Id": "Id",
        "Title": "Title",
        "Images": "Images",
        "Content": "Content",
        "CreatedTime": "CreatedTime",
        "CreatedBy": "CreatedBy",
        "LastModifiedTime": "LastModifiedTime",
        "LastModifiedBy": "LastModifiedBy"
    }
    */
    
