export class GuarantorFinancial {
    ID: number
    G_ID:number
    PROPOSAL_ID: number

    G_IS_INCOME_TAX_FILED: boolean = false
    G_FINANCIAL_YEAR: number
    G_INCOME_AMOUNT: number
    G_TAX_PAID_AMOUNT: number
    G_AGRICULTURE_INCOME: number
    G_OTHER_INCOME: number
    G_MONTHLY_HOUSEHOLD_EXPENSES: number
    G_IS_PIGMY: boolean = false
    G_BANK_NAME: string
    G_DAILY_PIGMY_AMOUNT: number
    G_PIGMY_BALANCE: number

    G_CC_LOAN_TERNOVER: number
    G_INCOME_SOURCE_AMOUNT: string
    G_YEARLY_INCOME: number
    G_SAVING_ACCOUNT_NO: any
    G_SAVING_AMOUNT: number
    G_OTHER_DEPOSIT_ACC_NO: string
    G_OTHER_DEPOSIT_ACC_NO2: string
    G_BALANCE_AMOUNT: number
    G_BALANCE_AMOUNT2: number
    G_ACCOUNT_NO: string
    G_ACCOUNT_BALANCE: number
    G_LOAN_TAKEN_YEARS: number
    G_SHARE_ACCOUNT_NO:number
    G_PERIODS:number
    G_TYPE_OF_ACCOUNT:string  
    G_IS_HAVE_DEPOSIT:any
    G_DEPOSIT_TYPE:any

    G_IS_HAVE_TERM_DEPOSIT:boolean = false
    G_IS_HAVE_CURRENT_DEPOSIT:boolean = false
    G_IS_HAVE_RECURRING_DEPOSIT:boolean = false
    G_IS_PAY_SALES_TAX_FILED: boolean = false
    G_FINANCIAL_YEAR_SALES_TAX:number
    G_SALES_TAX_PAID_AMOUNT:number

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}
