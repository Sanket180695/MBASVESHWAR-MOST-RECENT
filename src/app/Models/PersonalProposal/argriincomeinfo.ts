export class AgriIncomeInfo {
  	CLIENT_ID: number;
	ID: any;
	// DETAILED_ADDRESS_ID:number
	// PROPOSAL_ID: number;
    INCOME_INFORMATION_ID:any
	IS_NAME_APPEAR_IN_7_12:any
	SUGAR_CANE:number
	MAIZE:number
	TAMBACCO:number
	GRAINS:number
	OTHER:number
	TOTAL:number
	CURRENT_AGRICULTURE_PRODUCT:string
	ANNUAL_INCOME_FROM_THIS_LAND:number

	YEARLY_INCOME: number;

	STATE:string = 'Karnataka'
    DISTRICT:string
    TALUKA:string
    VILLAGE:string
    PINCODE:string
    BUILDING:string

	ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }


}