export class Proposal {
    DATE_OF_MEMBERSHIP(DATE_OF_MEMBERSHIP: any) {
      throw new Error("Method not implemented.");
    }
    ID: number;
    CLIENT_ID: number;
    APPLICANT_ID: number;
    LOAN_TYPE_ID: number;
    LOAN_KEY: string;
    LOAN_TYPE_NAME: string
    LOAN_AMOUNT: number;
    CREATED_ON_DATETIME: Date;
    LAST_UPDATED_ON_DATETIME: Date;
    CURRENT_STAGE_ID: number;
    CURRENT_STAGE_DATETIME: Date;
    BRANCH_ID: number;
    BRANCH_NAME: string;
    BRANCH_NAME_KN=''
    BRANCH_NAME_EN=''
    PAN: string
    AGE:number
    APPLICANT_NAME: string
    CURRENT_STAGE_NAME: string
    BOT_REPLY_ID: number
    PROPOSAL_REASON: string
    APPLICANT_ADDRESS: string
    STATE: string = 'Karnataka'
    DISTRICT: string
    TALUKA: string
    VILLAGE: string
    PINCODE: string
    LANDMARK: string
    BUILDING: string
    HOUSE_NO: string
    CIBIL_SCORE: number
    PRAPOSAL_TYPE: string
    MOBILE_NUMBER: string
    PROPOSAL_FILE = ''
    PROPOSAL_REPORT = ''
    SANCTION_FILE = ''
    SCRUTINY_FILE = ''
    SANCTION_AMOUNT = 0
    RATE_OF_INTEREST = 0
    SANCTION_DATE: any =null
    RESOLUTION_NO = 0;
    TERM_FOR_LOAN=''
    loadingRecords2 = false;
    loadingRecords = false;
    BRANCH_OPINION_TEXT = '';
    COMMITTEE_NO:number;
    AMOUNT_IN_WORDS:string;
    TERM_OF_LOAN:number
    TYPE_OF_INSTALLMENT:number;
    EMI_AMOUNT:number
    INSTALLMENT_COUNT:number

    SIGNATURE:string;

    OCCUPATION:string
    MOROTORIUM:number
    DOB: any;

    RECOMMENDED_AMOUNT:number;
    RESOLUTION_DATE:any;
    REMARK: string;

    REMARK_VALUATION_STAGE: string;
    REMARK_LEGAL_OPINION: string;
    
    REPORT_URL: string
    VALUATION_REPORT_URL: string;
    LEGAL_OPINION_REPORT_URL: string;

    SANCTION_AMOUNT1 = 0
    SCRUTINY_NOTE:''

    IS_SENT_TO_HO: number
    IS_VALUATION_NOTE: number

    APPLICANT_MIDDLE_NAME: string
    APPLICANT_LAST_NAME: string
    RECOMMENDATION : string
    CAST: string
    RELIGION: string

    MATURITY_DATE : any
    MATURITY_DUE : any
    MATURITY_DUE_DATE: any
    LOAN_DISBURSEMENT_REMARK: string
    HAND_WRITTEN_AMT_IN_WORDS1: string


}
