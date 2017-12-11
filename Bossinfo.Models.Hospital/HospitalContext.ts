
 //改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/HospitalContext')
    @I18nNamespace('Model.EDI.HospitalContext')
    export class HospitalContext {
        
        
        public his: his1[];
        
        public hospital: hospital[];
        
        public orderregresult: orderregresult[];
        
        public orderregresultdetail: orderregresultdetail[];
    }
    
    /*
    "HospitalContext": {
        
        "his": "his",
        "hospital": "hospital",
        "orderregresult": "orderregresult",
        "orderregresultdetail": "orderregresultdetail"
    }
    */
    
