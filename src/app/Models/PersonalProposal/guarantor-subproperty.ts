export class GuarantorSubproperty {
   


    ID: number
    G_ID:number
    PROPOSAL_ID: number
    
    G_OWNER_NAME:string
    G_MOVABLE_TYPE: string
    G_IS_MACHINERY_OR_OTHER: string="M"
    G_IS_AGRICULTURE_LAND_OR_OTHER: string;
    G_TOTAL_AREA: string
    G_AREA_UNIT: string;

    G_BUILDUP_AREA: number
    G_PROPERTY_DETAILS: string
    G_IS_VALUATION_DONE: boolean
    G_VALUATOR_NAME: string
    G_VALUATION_AMOUNT: number

    G_CATEGORY_OF_SOIL:string

    G_VALUATION_DATE: string
    G_POLICY_NO:number
    G_INSURANCE_NO:string
    G_VALUATION:number
    G_CHESIS_NO:number
    G_ENGINE_NO:number
    G_MODEL_NO:number
    G_VEHICLE_NO:string
    G_INSURANCE_EXPIRY_DATE:string
    G_VEHICLE_NAME:string
    G_WHEELS_COUNT:any
    G_VEHICLE_TYPE:string="N"

    G_IS_MORTGAGED:boolean
    G_IS_MORTGAGED_SUB:boolean=false
    G_IS_MORTGAGED_FOR_SUB:boolean
    G_BANK_INSTITUTION_NAME:string
    G_LOAN_OUTSTANDING_AMOUNT:number
    G_EXPECTED_AMOUNT
    G_STOCK_AMOUNT:number
    
    G_REMARK:string
    G_AKAR_RS:number
    G_MORTGUAGE_DETAILS:string
    G_OUT_OF_WHICH:string
    G_EAST:any
    G_WEST:any
    G_NORTH:any
    G_SOUTH:any

    G_IS_VERIFIED:boolean=false
    G_DATE_OF_VERIFICATION:any
    G_NAME_OF_VERIFYING_OFFICER:string
    G_DETAILS_OF_DOCUMENT_CONFORMING_RIGHT:boolean
    G_ENCUMBRANCE:any

    G_BOJA_TYPE:string="R"
    
    G_ACRE:number
    G_GUNTE:number
    G_AANE:number
    G_OUT_OF_ACRE:number
    G_OUT_OF_GUNTE:number
    G_OUT_OF_AANE:number


    G_R_S_NO:string
    G_TMC_NO:string
    G_SURVEY_NO:string
    G_VPC_NO:string
    G_FLAT_NO:string
    G_PLOT_NO:string
    G_E_SWATTU:string
    G_CTS_NO:string

    G_STATE:string
    G_DISTRICT:string
    G_TALUKA:string
    G_VILLAGE:string
    G_PINCODE:string
    G_LANDMARK:string
    G_BUILDING:string
    G_HOUSE_NO:string
    

    OTHER_PROPERTY_NAME: string
    OTHER_PROPERTY_VALUATION: number
    OTHER_PROPERTY_DETAILS: string
    OTHER_PROPERTY_COMPANY: string
    OTHER_PROPERTY_YEAR: number
    OTHER_PROPERTY_TYPE: string ="N"

    VEHICLE_COMPANY: string
    YEAR_OF_VEHICLE: number
    TYPE_OF_BODY: string
    HP: string
    REGISTRATION_NUMBER: string
    DEALER_OR_SHOWROOM_NAME: string

    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }

}
