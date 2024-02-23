export class GuarantorCredit {
    ID: number;
    G_ID:number
    PROPOSAL_ID: number;

    G_IS_EXISTING_LOAN_WITH_SUB = false;
    G_IS_EXISTING_LOAN_WITH_OTHER_BANKS
    G_IS_GUARANTOR_TO_LOAN_WITH_SUB
    G_IS_GUARANTOR_TO_LOAN_WITH_OTHER_BANK
    G_IS_EARLIAR_LOAN_HISTORY
    G_IS_ANY_DEPOSITES_WITH_SUB
    G_IS_LOAN_TAKEN_FOR_CLOSE_OTHER_LOANS
    G_BANK_NAME: string;
    G_OUTSTANDING_BANK_AMOUNT: number;
    G_IS_EARLIAR_LOAN_HISTORY_WITH_OTHER_BANK
    G_IS_ANY_DEPOSITES_WITH_OTHER_BANK

    G_OTHER_LOAN_DETAILS = ""
    G_LOAN_GUARENTEE_COUNT: number
    G_LOAN_GUARENTEE_AMOUNT: number

    G_IS_NOC_OBTAINED_AND_ENCLOSED

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
    
}
