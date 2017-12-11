
 //改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/orderregresult')
    @I18nNamespace('Model.EDI.orderregresult')
    export class orderregresult {
        
        @Key()// Column(Order = 0)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public ID: number;
        @Key()// Column(Order = 1)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public HospitalID: number;
        @Key()// Column(Order = 2)// StringLength(10)
        public InspectionNumber: string;
        // StringLength(10)
        public Idno: string;
        // StringLength(40)
        public Name: string;
        // Column(TypeName = "datetime2")
        public InspectionDateTime: Date;
        // Column(TypeName = "datetime2")
        public SendInspectionDateTime: Date;
        // Column(TypeName = "datetime2")
        public RegDateTime: Date;
        // StringLength(20)
        public RegNo: string;
        @Key()// Column(Order = 3)
        public IsDelete: boolean;
        // Column(TypeName = "datetime2")
        public CreatedTime: Date;
        
        public CreatedBy: number;
        // Column(TypeName = "datetime2")
        public LastModifiedTime: Date;
        
        public LastModifiedBy: number;
    }
    
    /*
    "orderregresult": {
        
        "ID": "ID",
        "HospitalID": "HospitalID",
        "InspectionNumber": "InspectionNumber",
        "Idno": "Idno",
        "Name": "Name",
        "InspectionDateTime": "InspectionDateTime",
        "SendInspectionDateTime": "SendInspectionDateTime",
        "RegDateTime": "RegDateTime",
        "RegNo": "RegNo",
        "IsDelete": "IsDelete",
        "CreatedTime": "CreatedTime",
        "CreatedBy": "CreatedBy",
        "LastModifiedTime": "LastModifiedTime",
        "LastModifiedBy": "LastModifiedBy"
    }
    */
    
