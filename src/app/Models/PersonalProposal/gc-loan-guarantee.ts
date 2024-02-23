export class GcLoanGuarantee {
    ID: number;
    G_ID:number;
    // CREDIT_INFORMATION_ID: number;

    ACCOUNT_NUMBER:any
    BORROWER_NAME: string;
    LOAN_TYPE_ID: number;
    SANCTIONED_AMOUNT: number;
    LOAN_OUTSTANDING: number;
    DUE_DATE: any;
    REMARK =""
    ADDRESS:string

    // CLIENT_ID: number;
    // BANK_OR_INSTITUTE_NAME: string;
    // BRANCH_NAME: string;
    // INSTALLMENT_AMOUNT: number;
    // LOAN_OVERDUE_AMOUNT: number;
    // IS_SUB: boolean;
    // LOAN_TYPE_NAME_KN=''

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }

}
