
 //改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/his')
    @I18nNamespace('Model.EDI.his')
    export class his {
        
        @Key()// Column(Order = 0)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public ID: number;
        @Key()// Column(Order = 1)// StringLength(200)
        public Name: string;
        @Key()// Column(Order = 2)// StringLength(10)
        public Account: string;
        @Key()// Column(Order = 3)// StringLength(10)
        public Password: string;
        @Key()// Column(Order = 4)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public Status: number;
        // StringLength(500)
        public Remark: string;
        // Column(TypeName = "datetime2")
        public CreatedTime: Date;
        
        public CreatedBy: number;
        // Column(TypeName = "datetime2")
        public LastModifiedTime: Date;
        
        public LastModifiedBy: number;
    }
    
    /*
    "his": {
        
        "ID": "ID",
        "Name": "Name",
        "Account": "Account",
        "Password": "Password",
        "Status": "Status",
        "Remark": "Remark",
        "CreatedTime": "CreatedTime",
        "CreatedBy": "CreatedBy",
        "LastModifiedTime": "LastModifiedTime",
        "LastModifiedBy": "LastModifiedBy"
    }
    */
    
