export class GcPreviousLoan {
    ID: number;
    G_ID:number;
    // CREDIT_INFORMATION_ID: number;

    LOAN_TYPE_NAME_KN=''
    ADDRESS:string
    ACCOUNT_NO:number
    LOAN_TYPE_ID: number;
    SANCTIONED_AMOUNT: number;
    SANCTION_DATE: any;
    YEAR:number 
    DUEDATE: any;
    REPAYMENT_DATE: any;
    REMARK: string;

    PURPOSE_OF_LOAN: string;
    LOAN_AMOUNT: number;
    LOAN_TAKEN_DATE: any;

     // CLIENT_ID: number;
    // BANK_NAME: string;
    // BRANCH_NAME: string;
    // 
    // 
    // 
    // ACCOUNT_CLOSE_DATE: any;
    // IS_SUB: boolean;

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }

}
