export class GuarantorExpenditureInfo {
    ID: any;
    GUARANTOR_INCOME_INFORMATION_ID:number
    HOUSE:number=0
    TRADE:number=0
    AGRICULTURE:number=0
    INSURANCE:number=0
    EDUCATION:number=0
    MISCELLANEOUS:number=0
    OTHER:number=0
    TOTAL:number=0

    ARCHIVE_FLAG: string;

    constructor() {
        this.ARCHIVE_FLAG = 'F'
    }
    

}
