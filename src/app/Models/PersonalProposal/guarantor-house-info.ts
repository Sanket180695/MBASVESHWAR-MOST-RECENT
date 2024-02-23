export class GuarantorHouseInfo {
    
    ID: any;
    PROPOSAL_ID: number;
    GUARANTOR_INCOME_INFORMATION_ID: number
    RENT_DETAILS: string;
    INCOME_FROM_RENT: number;
    AMOUNT: number
    ADDRESS: string;
    YEARLY_INCOME: number;

    STATE:string = 'Karnataka'
    DISTRICT:string
    TALUKA:string
    VILLAGE:string
    PINCODE:string
    BUILDING:string

    ARCHIVE_FLAG: string;

    constructor() {
        this.ARCHIVE_FLAG = 'F'
    }
    

}
