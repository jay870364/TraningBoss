
 //改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/hospital')
    @I18nNamespace('Model.EDI.hospital')
    export class hospital {
        
        @Key()// Column(Order = 0)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public ID: number;
        @Key()// Column(Order = 1)// StringLength(20)
        public MedicalInstitutionNumber: string;
        @Key()// Column(Order = 2)// StringLength(200)
        public Name: string;
        @Key()// Column(Order = 3)// StringLength(10)
        public Account: string;
        @Key()// Column(Order = 4)// StringLength(10)
        public Password: string;
        @Key()// Column(Order = 5)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public Status: number;
        // StringLength(500)
        public Remark: string;
        @Key()// Column(Order = 6)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public HisID: number;
        // Column(TypeName = "datetime2")
        public CreatedTime: Date;
        
        public CreatedBy: number;
        // Column(TypeName = "datetime2")
        public LastModifiedTime: Date;
        
        public LastModifiedBy: number;
    }
    
    /*
    "hospital": {
        
        "ID": "ID",
        "MedicalInstitutionNumber": "MedicalInstitutionNumber",
        "Name": "Name",
        "Account": "Account",
        "Password": "Password",
        "Status": "Status",
        "Remark": "Remark",
        "HisID": "HisID",
        "CreatedTime": "CreatedTime",
        "CreatedBy": "CreatedBy",
        "LastModifiedTime": "LastModifiedTime",
        "LastModifiedBy": "LastModifiedBy"
    }
    */
    
