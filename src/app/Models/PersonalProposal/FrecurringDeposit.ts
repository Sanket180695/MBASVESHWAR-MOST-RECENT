export class FRecurringDeposit {
    ID: number
    CLIENT_ID: number
    PROPOSAL_ID: number
    FINANCIAL_INFORMATION_ID:number
    IS_HAVE_RECURRING_DEPOSIT:boolean
    IS_HAVE_DEPOSIT = 1
    IS_HAVE_PIGMY = 1
    IS_HAVE_PIGMY_DEPOSIT :boolean
    IS_HAVE_SAVING_DEPOSIT:boolean
    DEPOSIT_TYPE:string
    ACC_NO:any
    ACC_AMOUNT:number
    LOAN_AMOUNT: number;
    LOAN_AMOUNT2: number;
    LOAN_AMOUNT_IN_WORDS: string;
    LOAN_AMOUNT_IN_WORDSS: string;
    MATURITY_DUE:any
    LOAN_TYPE_ID:number

    ARCHIVE_FLAG: string;
    PIGMY_AMOUNT1 :Number;

    constructor() {
        this.ARCHIVE_FLAG = 'F'
    }
}