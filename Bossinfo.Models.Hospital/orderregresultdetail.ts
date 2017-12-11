
 //改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/orderregresultdetail')
    @I18nNamespace('Model.EDI.orderregresultdetail')
    export class orderregresultdetail {
        
        @Key()// Column(Order = 0)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public ID: number;
        @Key()// Column(Order = 1)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public OrderRegResultID: number;
        // StringLength(100)
        public ItemID: string;
        // StringLength(200)
        public ItemName: string;
        // StringLength(20)
        public ResultNoteOriginalValue: string;
        // StringLength(200)
        public Result: string;
        // StringLength(5)
        public ResultNote: string;
        // StringLength(500)
        public ReferenceVauleDescription: string;
        @Key()// Column(Order = 2)// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)
        public Sort: number;
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
    "orderregresultdetail": {
        
        "ID": "ID",
        "OrderRegResultID": "OrderRegResultID",
        "ItemID": "ItemID",
        "ItemName": "ItemName",
        "ResultNoteOriginalValue": "ResultNoteOriginalValue",
        "Result": "Result",
        "ResultNote": "ResultNote",
        "ReferenceVauleDescription": "ReferenceVauleDescription",
        "Sort": "Sort",
        "IsDelete": "IsDelete",
        "CreatedTime": "CreatedTime",
        "CreatedBy": "CreatedBy",
        "LastModifiedTime": "LastModifiedTime",
        "LastModifiedBy": "LastModifiedBy"
    }
    */
    
