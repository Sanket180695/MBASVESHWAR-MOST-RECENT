export class GcLoanFromThisBank {
    ID: number;
    G_ID:number;
    
    BRANCH_NAME: string;
    ACCOUNT_NUMBER:any
    LOAN_TYPE_ID: number;
    SANCTIONED_AMOUNT: number;
    INSTALLMENT_AMOUNT: number;
    YEAR:number
    SANCTION_DATE: any;
    DUE_DATE: any;
    LOAN_OUTSTANDING: number;
    REPAYMENT_DATE:any
    REMARK:string;

    // CLIENT_ID: number;
    // BANK_OR_INSTITUTE_NAME: string;
    // LOAN_OVERDUE_AMOUNT: number;
    // SECURITY_OFFERED: string;
    // IS_SUB: boolean;
    // LOAN_TYPE_NAME_KN=''
    // LOAN_TYPE=''

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
    
}
