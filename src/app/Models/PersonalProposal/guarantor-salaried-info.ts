export class GuarantorSalariedInfo {
   
    ID: number;
    GUARANTOR_INCOME_INFORMATION_ID: number;
    // PLACE_OF_EMPLOYMENT: number;
    ORGANISATION_NAME: string;
    CONTACT_NO_OF_EMPLOYER: string;
    POST_OF_EMPLOYMENT: string;
    TYPE_OF_SECTOR: string ="P";
    TYPE_OF_EMPLOYMENT: string ="P";
    IS_PROVIDENT_FUND_DEDUCTED: boolean;
    // JOINING_DATE: any;
    // RETIREMENT_DATE: any;
    // LATEST_SALARY_MONTH: any;
    GROSS_SALARY: number;
    TOTAL_DEDUCTION: number;
    NET_SALARY: number;
    SALARY_PAID_TYPE: string ="B";
    IS_LETTER_FOR_LOAN_DEDUCTION: boolean;
    // APPLICANT_DOCUMENTS_ID: number;
    BANK_NAME: string;
    BRANCH_NAME: string;
    IFSC_CODE: string;
    PROVIDANT_FUND:number=0
    INSURANCE:number=0
    INCOME_TAX:number=0
    LOAN_INSTALLMENT:number=0
    OTHER_DEDUCTION:number=0
    ADDRESS: string;
    AMOUNT:number
    JOB_TYPE = ""

    STATE:string= 'Karnataka'
    DISTRICT:string
    TALUKA:string
    VILLAGE:string
    PINCODE:string
    BUILDING:string
    // LANDMARK:string
    
    // HOUSE_NO:string

    ARCHIVE_FLAG: string;

    constructor() {
        this.ARCHIVE_FLAG = 'F'
    }

}
