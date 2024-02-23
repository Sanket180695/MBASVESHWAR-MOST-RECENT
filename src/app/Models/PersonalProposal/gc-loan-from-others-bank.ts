export class GcLoanFromOthersBank {

    ID: number;
    G_ID:number;
    // CREDIT_INFORMATION_ID: number;
    BANK_NAME: string;
    LOAN_OUTSTANDING: number;
    REMARK:string;
    
    // CLIENT_ID: number;
    // BRANCH_NAME: string;
    // DEPOSIT_TYPE: string;
    // DEPOSITE_AMOUNT: number;
    // IS_LOAN_TAKEN: boolean;
    // IS_SUB: boolean;
    // DEPOSITE_TYPE: string;
    // ACCOUNT_NO:number

    SANCTION_AMOUNT: number
    
    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }

}
