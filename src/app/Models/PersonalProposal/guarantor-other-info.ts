export class GuarantorOtherInfo {
    ID:number;
    PROPOSAL_ID: number;
    GUARANTOR_INCOME_INFORMATION_ID: number;
    PRODUCT_NAME:string;
    PRODUCT_INCOME:string;

    ARCHIVE_FLAG: string;

    constructor() {
        this.ARCHIVE_FLAG = 'F'
    }

}
