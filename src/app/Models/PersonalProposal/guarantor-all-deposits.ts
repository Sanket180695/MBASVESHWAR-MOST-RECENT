export class GuarantorAllDeposits {
    ID: number
    G_ID:number
    IS_HAVE_RECURRING_DEPOSIT:boolean = false
    IS_HAVE_DEPOSIT = 1
    IS_HAVE_PIGMY_DEPOSIT:boolean = false
    // DEPOSIT_TYPE:string
    ACC_NO:any
    ACC_AMOUNT:number
    MATURITY_DUE:any

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}
