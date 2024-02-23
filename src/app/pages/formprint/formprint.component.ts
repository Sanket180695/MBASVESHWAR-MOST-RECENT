import { DatePipe } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";
import { Extraapplicantinfo } from "src/app/Models/extraapplicantinfo";
import { BalanceSheetInformation } from "src/app/Models/FirmProposal/balance-sheet-information";
import { Constitutes } from "src/app/Models/FirmProposal/constitutes";
import { EmployeeInfo } from "src/app/Models/FirmProposal/employee-info";
import { FactoryUnit } from "src/app/Models/FirmProposal/factory-unit";
import { FirmDetails } from "src/app/Models/FirmProposal/firm-details";
import { Gurantorinfo } from "src/app/Models/FirmProposal/gurantorinfo";
import { ManagementOfSalesInformation } from "src/app/Models/FirmProposal/management-of-sales";
import { ManufacturingInfo } from "src/app/Models/FirmProposal/manufacturing-info";
import { PartnersInfo } from "src/app/Models/FirmProposal/partners-info";
import {
  CostInfo,
  MeansInfo
} from "src/app/Models/FirmProposal/projection-info";
import { SisterConcern } from "src/app/Models/FirmProposal/sister-concern";
import { Addressinfo } from "src/app/Models/PersonalProposal/addressinfo";
import { AgriInfo } from "src/app/Models/PersonalProposal/agri-info";
import { BankLoan } from "src/app/Models/PersonalProposal/bank-loan";
import { BusinessInfo } from "src/app/Models/PersonalProposal/business-info";
import { Creditinformation } from "src/app/Models/PersonalProposal/creditinformation";
import { DepositeInBank } from "src/app/Models/PersonalProposal/deposite-in-bank";
import { EarlierLoanInfo } from "src/app/Models/PersonalProposal/earlier-loan-info";
import { Financialinformation } from "src/app/Models/PersonalProposal/financialinformation";
import { Proposal } from "src/app/Models/proposal";
import { ApiService } from "src/app/Service/api.service";

import html2pdf from "html2pdf.js";
import { Goldloan } from "src/app/Models/LoanTypeQues/goldloan";
import { AgriIncomeInfo } from "src/app/Models/PersonalProposal/argriincomeinfo";
import { Banker } from "src/app/Models/PersonalProposal/banker";
import { Employer } from "src/app/Models/PersonalProposal/employer";
import { ExpenditureInfo } from "src/app/Models/PersonalProposal/expenditureinfo";
import { GnGuarantor } from "src/app/Models/PersonalProposal/gn-guarantor";
import { GnPersonal } from "src/app/Models/PersonalProposal/gn-personal";
import { GnProperty } from "src/app/Models/PersonalProposal/gn-property";
import { HouseShopRentInfo } from "src/app/Models/PersonalProposal/Houseshoprentinfo";
import { Incomeinformation } from "src/app/Models/PersonalProposal/incomeinformation";
import { JointAccount } from "src/app/Models/PersonalProposal/jointaccount";
import { Loaninformation } from "src/app/Models/PersonalProposal/loaninformation";
import { Personalinformation } from "src/app/Models/PersonalProposal/personalinformation";
import { PledgeLoan } from "src/app/Models/PersonalProposal/pledge-loan";
import { ProjectionInfo } from "src/app/Models/PersonalProposal/projection-info";
import { Propertyinformation } from "src/app/Models/PersonalProposal/propertyinformation";
import { RealEstateResidential } from "src/app/Models/PersonalProposal/real-estate-residential";
import { SalariedInfo } from "src/app/Models/PersonalProposal/salaried-info";

import { Sort } from "src/app/Models/PersonalProposal/sort";
import { SubPropertyinfo } from "src/app/Models/PersonalProposal/subpropertyinfo";
import { Vehicleloan } from "src/app/Models/PersonalProposal/vehicleloan";
import { GuarantorForLoans } from "../PersonalProposal/credit-info/Models/guarantor-for-loans";
import { depositLoan } from "../PersonalProposal/loan-demand/loanquestions/depositeloan/depositeloan.component";

import { GuarantorAgriInfo } from "src/app/Models/PersonalProposal/guarantor-agri-info";
import { GuarantorBusinessInfo } from "src/app/Models/PersonalProposal/guarantor-business-info";
import { GuarantorCredit } from "src/app/Models/PersonalProposal/guarantor-credit";
import { GuarantorFinancial } from "src/app/Models/PersonalProposal/guarantor-financial";
import { GuarantorHouseInfo } from "src/app/Models/PersonalProposal/guarantor-house-info";
import { GuarantorIncome } from "src/app/Models/PersonalProposal/guarantor-income";
import { GuarantorOtherInfo } from "src/app/Models/PersonalProposal/guarantor-other-info";
import { GuarantorPersonal } from "src/app/Models/PersonalProposal/guarantor-personal";
import { GuarantorProperty } from "src/app/Models/PersonalProposal/guarantor-property";
import { GuarantorSalariedInfo } from "src/app/Models/PersonalProposal/guarantor-salaried-info";
import { GuarantorSubproperty } from "src/app/Models/PersonalProposal/guarantor-subproperty";



@Component({
  selector: "app-formprint",
  templateUrl: "./formprint.component.html",
  styleUrls: ["./formprint.component.css"],
  providers: [DatePipe],
})
export class FormprintComponent implements OnInit {

  currentYear: number = new Date().getFullYear();

  @Input() drawerClose: Function;
  @Input() data: Proposal;
  @Input() security = false;
  @Input() type1 = false;
  @Input() type2 = false;
  @Input() type3 = false;
  @Input() type4 = false;
  @Input() type5 = false;
  @Input() type6 = false;
  @Input() type7 = false;
  @Input() type8 = false;
  @Input() type9 = false;
  @Input() type10 = false;
  @Input() type11 = false;
  @Input() type12 = false;
  @Input() type13 = false;
  @Input() type14 = false;
  @Input() type15 = false;
  @Input() type16 = false;
  @Input() type17 = false;
  @Input() formname: string;

  disburmentDate: Proposal = new Proposal()



  // newGuarantorPersonal: GnPersonal = new GnPersonal();
  // newGuarantorEmployer: Employer[] = [];
  // newGuarantorBanker: Banker[] = [];

  // guarantorProperties: GnProperty[] = [];
  // gVehicleProp: GnProperty[] = [];
  // gNotVehicleProp: GnProperty[] = [];

  // guarantor: GnGuarantor = new GnGuarantor();

  amulyaGuarantorPersonal: GnPersonal = new GnPersonal();
  amulyaGuarantorEmployer: Employer[] = [];
  amulyaGuarantorBanker: Banker[] = [];

  guarantorProperties: GnProperty[] = [];
  gVehicleProp: GnProperty[] = [];
  gNotVehicleProp: GnProperty[] = [];

  guarantor: GnGuarantor = new GnGuarantor();

  guarantorMain = []
  guarantorPersonalData: GuarantorPersonal = new GuarantorPersonal();
  guarantorPropertyData: GuarantorProperty = new GuarantorProperty();
  guarantorSubPropertyData: GuarantorSubproperty = new GuarantorSubproperty();
  guarantorIncomeData: GuarantorIncome = new GuarantorIncome();
  guarantorCreditData: GuarantorCredit = new GuarantorCredit();
  guarantorFinancialData: GuarantorFinancial = new GuarantorFinancial();


  pigmidata: depositLoan = new depositLoan();
  dataList = [];
  GdataList = [new Gurantorinfo(), new Gurantorinfo()];
  GdataList2 = [];

  // GnewdataList = [new GnGuarantor(), new GnGuarantor()]
  // GndataList = [];

  dataListterm = [];
  dataListrecuring = [];
  agriinfooo: AgriIncomeInfo = new AgriIncomeInfo();
  agriInfo12: AgriIncomeInfo = new AgriIncomeInfo();
  dataListcurrent = [];
  CBdataList = [new Personalinformation(), new Personalinformation()];
  IndivisualInfotabs = [];
  IndivisualInfotabs2 = [];
  house = [new HouseShopRentInfo()]
  sum1 = 0;
  sum2 = 0;
  agriInfo13 = 0;
  sanctionamount = 0;
  sanctionamount1 = 0;
  loantypee: any;
  loantypee12: any;
  otherIncomSource = 0;
  costdata = [new CostInfo(), new CostInfo(), new CostInfo()];
  meansdata = [new MeansInfo(), new MeansInfo(), new MeansInfo()];
  dataList1 = [new ManufacturingInfo()];
  dataList4 = [new FactoryUnit()];
  dataList5 = [
    new EmployeeInfo(),
    new EmployeeInfo(),
    new EmployeeInfo(),
    new EmployeeInfo(),
  ];
  personalInfo: Personalinformation = new Personalinformation();
  personalInfo2: Personalinformation = new Personalinformation();
  RECEIPT_AMOUNT_IN_WORDS = "";
  loanInfo: Loaninformation = new Loaninformation();
  creditInfo: Creditinformation = new Creditinformation();
  propertyInfo: Propertyinformation = new Propertyinformation();
  addressinfoCurrent: Addressinfo = new Addressinfo();
  addressinfoCurrent2: Addressinfo = new Addressinfo();
  addressinfoPermanent: Addressinfo = new Addressinfo();
  addressinfoPermanent2: Addressinfo = new Addressinfo();
  salaryInfo: SalariedInfo = new SalariedInfo();
  agriInfo: AgriInfo = new AgriInfo();
  buisnessInfo: BusinessInfo = new BusinessInfo();
  addressinfoAgri: Addressinfo = new Addressinfo();
  addressinfoBussiness: Addressinfo = new Addressinfo();
  addressinfoSalary: Addressinfo = new Addressinfo();

  addressinfoHouse: Addressinfo = new Addressinfo();
  addressinfoOther: Addressinfo = new Addressinfo();

  drawerData: Loaninformation = new Loaninformation();
  expenditure: ExpenditureInfo = new ExpenditureInfo();

  addressinfoExpenditure: Addressinfo = new Addressinfo();

  joint: JointAccount = new JointAccount();
  LoanTakenList_otherBank = [];
  Expendituree = localStorage.getItem("Expenditure");
  Agri = localStorage.getItem("id");
  pan = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  isSpinningTabs = false;
  WhiteSpace = "";
  isButtonSpinning = false;
  index = 0;
  familyDeatails = [];
  Tredincome = 0;
  visible = [];
  visible2 = [];
  ManagementOfSales = [new ManagementOfSalesInformation()];
  PROPOSAL_ID: number;
  chnageIndex: number;
  personalInformationId: number;
  personalInformationId2: number;
  PROPOSAL_TYPE: string = "";
  textVisible = false;
  drawerchatTitle: string = "";
  drawerchatVisible: boolean;
  drowerData: Proposal = new Proposal();
  drawerDocumentVisible = false;
  drawerDocumentTitle: string = "";
  drawerStattusVisible = false;
  drawerStattusTitle: string;
  APPLICANT_ID: number;
  applicantId: number;
  applicantId2: number;
  data2: FirmDetails = new FirmDetails();
  constitutionData = [
    { ID: "1", NAME: "पार्टनरशीप फर्म" },
    { ID: "2", NAME: "प्रायव्हेट लि. कंपनी" },
    { ID: "3", NAME: "पब्लिक लि. कंपनी" },
    { ID: "4", NAME: "एचयूएफ" },
    { ID: "5", NAME: "चॅरिटेबल ट्रस्ट" },
    { ID: "6", NAME: "मर्यादित दायित्व भागीदारी" },
  ];
  proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"));
  dataListss = [
    new PartnersInfo(),
    new PartnersInfo(),
    new PartnersInfo(),
    new PartnersInfo(),
  ];

  calculateAllLoanAmount() {
    let total = 0;

    for (let loan of this.LoanTakenList) {
      if (loan.SANCTIONED_AMOUNT) {
        total += loan.SANCTIONED_AMOUNT;
      }
    }

    for (let otherloan of this.LoanTakenList_otherBank) {
      if (otherloan.SANCTIONED_AMOUNT) {
        total += otherloan.SANCTIONED_AMOUNT;
      }
    }

    total += this.loanInfo.LOAN_AMOUNT;

    return total;
  }

  calculateAllLoanAmount2() {
    let total = 0;

    for (let loan of this.LoanTakenList) {
      if (loan.SANCTIONED_AMOUNT) {
        total += loan.SANCTIONED_AMOUNT;
      }
    }

    for (let otherloan of this.dataGList2) {
      if (otherloan.SANCTIONED_AMOUNT) {
        total += otherloan.SANCTIONED_AMOUNT;
      }
    }

    total += this.loanInfo.LOAN_AMOUNT;

    return total;
  }

  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo();
  ProjectionInfo: ProjectionInfo = new ProjectionInfo();
  amountinwords = "";
  installmentFrequencyData = [];
  termdata = [];
  @ViewChild("tableToMeasure") elementView;

  primedataList = [];
  arrayIndex2: number;
  financialData: Financialinformation = new Financialinformation();
  gfinancialData = new Financialinformation();
  incomeSourceId: number;
  otherincomeSourceId: number;
  otherincomeSourceId2: number;
  total = [];
  total1 = [];
  year1 = "";
  year2 = "";
  year3 = "";
  dataCode = 0;
  houserent: HouseShopRentInfo = new HouseShopRentInfo();
  agriculture: AgriIncomeInfo = new AgriIncomeInfo();
  // sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT)
  // remark1 = localStorage.getItem('remark')
  creditdata: Creditinformation = new Creditinformation();
  subproperty: SubPropertyinfo = new SubPropertyinfo();
  amount = 0;
  dataList11 = [];
  dataList12 = [new BankLoan()];
  addressinfoBBussiness: Addressinfo = new Addressinfo();
  gaddressinfoBBussiness: Addressinfo = new Addressinfo();
  incomeInfo: Incomeinformation = new Incomeinformation();
  gincomedata: Incomeinformation = new Incomeinformation();
  gdataSalary: SalariedInfo = new SalariedInfo();
  gagridataList = [new AgriInfo()];

  dataSalary: SalariedInfo = new SalariedInfo();

  allSalary = []
  allBusiness = []
  allHouse = []
  allAgriculture = []
  allOther = []

  guarantorAllSalary = []
  guarantorAllBusiness = []
  guarantorAllHouse = []
  guarantorAllAgriculture = []
  guarantorAllOther = []

  guarantorAllSalary2 = []
  guarantorAllBusiness2 = []
  guarantorAllHouse2 = []
  guarantorAllAgriculture2 = []
  guarantorAllOther2 = []

  dataBList1: BusinessInfo = new BusinessInfo();
  dataList3 = [];
  dataLists = [new BusinessInfo()];
  incomeTypeData3 = [];
  incomeTypeData2 = [];
  incomeTypeData = [];
  gincomeTypeData = [];
  count = 0;
  amount24 = 0;
  amount245 = 0;

  arrayIndex = 0;
  dataSisList = [new SisterConcern(), new SisterConcern()];
  dataPartnerList = [new PartnersInfo()];
  dataConstiList = [new Constitutes(), new Constitutes()];
  dataListConstitutes = [new Constitutes(), new Constitutes()];
  dataPropertyList = [];
  dataPropertyList5 = [];
  dataPropertyList1 = [new Propertyinformation()];
  dataPropertyList2 = [new Propertyinformation()];
  datajoint = [new JointAccount()];
  property: Propertyinformation = new Propertyinformation();
  dataLTList11 = [];
  LoanTakenList = [];
  dataLTList6 = [new BankLoan(), new BankLoan()];
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  dataGList2 = [new GuarantorForLoans(), new GuarantorForLoans()];
  dataGList7 = [new GuarantorForLoans(), new GuarantorForLoans()];
  dataGList4 = [new DepositeInBank(), new DepositeInBank()];
  dataGList5 = [new EarlierLoanInfo(), new EarlierLoanInfo()];
  dataGList9 = [new EarlierLoanInfo(), new EarlierLoanInfo()];
  loanData: any = [];
  loanData2: any = [];
  loanInfoData: any = [];
  @ViewChild("htmlData") htmlData: ElementRef;
  pledgeLoandata: PledgeLoan = new PledgeLoan();
  pledgeLoandataaddressinfo: Addressinfo = new Addressinfo();

  balanceData: BalanceSheetInformation[];
  balanceSheetInformation: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceSheetInformation1: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceSheetInformation2: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceSheetInformation3: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceSheetInformation4: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceSheetInformation5: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceSheetInformation6: BalanceSheetInformation =
    new BalanceSheetInformation();
  balanceTotal = [0, 0, 0, 0, 0, 0, 0];
  balanceTotal1 = [0, 0, 0, 0, 0, 0, 0];

  gdataList1 = [new BusinessInfo()];
  gdataList3 = [new BusinessInfo()];
  gdataLists = [new BusinessInfo()];
  gdataListO = [];
  gdataListA = [];
  gdataList = [];
  gdataList2 = [];


  // gNewPropList = [];
  // gNewPropList2 = [];

  gpersonalInfo: Personalinformation = new Personalinformation();
  gaddressinfoCurrent: Addressinfo = new Addressinfo();
  gcreditdata: Creditinformation = new Creditinformation();
  jointaccountinfo: JointAccount = new JointAccount();
  gamount = 0;
  gdataList11 = [];
  gdataList12 = [new BankLoan()];
  gdataLTList11 = [];
  gdataLTList = [new BankLoan(), new BankLoan()];
  gdataLTList6 = [new BankLoan(), new BankLoan()];
  gdataGList4 = [new DepositeInBank(), new DepositeInBank()];
  gdataGList5 = [new EarlierLoanInfo(), new EarlierLoanInfo()];
  gdataGList9 = [new EarlierLoanInfo(), new EarlierLoanInfo()];
  vehicledata: Vehicleloan = new Vehicleloan();
  agridataList = [];
  golddataList = [
    new Goldloan(),
    new Goldloan(),
    new Goldloan(),
    new Goldloan(),
    new Goldloan(),
    new Goldloan(),
  ];
  goldTotal = 0;
  browserLang = "kn";
  proposalData: Proposal = new Proposal();
  proposalAmInWords = "";
  addressinfo4: Addressinfo = new Addressinfo();
  RealEstatedata: RealEstateResidential = new RealEstateResidential();
  proposalDocumentData = [];
  proposalDocumentData1 = [];
  familyDetils: any;
  constructor(
    public api: ApiService,
    private message: NzNotificationService,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.otherIncomSource = 0;
    // this.gNewPropList = [new GnProperty(), new GnProperty()];
    this.gdataListO = [new Propertyinformation(), new Propertyinformation()];
    this.gdataListA = [new Propertyinformation(), new Propertyinformation()];
    this.gdataListO[0]["addressinfo"] = new Addressinfo();
    this.gdataListO[1]["addressinfo"] = new Addressinfo();
    this.gdataListA[0]["addressinfo"] = new Addressinfo();
    this.gdataListA[1]["addressinfo"] = new Addressinfo();
    sessionStorage.setItem("incomesourceId", "0");
    sessionStorage.setItem("otherincomesourceId", "0");
    this.browserLang = localStorage.getItem("locale");
    console.log("data", this.data);
    // this.familyDeatails = [
    //   {
    //     ID: 0,
    //     PERSONAL_INFORMATION_ID: 0,
    //     NAME: "",
    //     RELATION: "",
    //     FOCCUPATION: "",
    //     FAGE: "",
    //     ARCHIVE_FLAG: "F",
    //     CLIENT_ID: 0,
    //   },
    // ];


    this.dataList11 = [new BankLoan(), new BankLoan()];
    this.GdataList2 = [
      {
        gdataLists: [new BusinessInfo()],
        gagridataList: [new AgriInfo()],
        gpersonalInfo: new Personalinformation(),
        gaddressinfoCurrent: new Addressinfo(),
        gincomedata: new Incomeinformation(),
        gincomeTypeData: [],
        gdataSalary: new SalariedInfo(),
        gaddressinfoBBussiness: new Addressinfo(),
        gcreditdata: [new Creditinformation()],
        gdataLTList6: [new BankLoan()],
        gdataListO: [new Propertyinformation()],
        gfinancialData: new Financialinformation(),
      },
      {
        gdataLists: [new BusinessInfo()],
        gagridataList: [new AgriInfo()],
        gpersonalInfo: new Personalinformation(),
        gaddressinfoCurrent: new Addressinfo(),
        gincomedata: new Incomeinformation(),
        gincomeTypeData: [],
        gdataSalary: new SalariedInfo(),
        gaddressinfoBBussiness: new Addressinfo(),
        gcreditdata: [new Creditinformation()],
        gdataLTList6: [new BankLoan()],
        gdataListO: [new Propertyinformation()],
        gfinancialData: new Financialinformation(),
      },
    ];
  }


  modifyDisbursementdate(MATURITY_DUE) {
    // const originalDate = new Date(this.disburmentDate.MATURITY_DUE)
    // const currentMonth = originalDate.getMonth();
    // originalDate.setMonth(currentMonth + 1);
    // const modifiedMonth = originalDate.getMonth();
    // console.log(modifiedMonth);

    if (!MATURITY_DUE) {
      return ''
    }
    let originalDate = MATURITY_DUE
    let splitDate = []
    let modifiedDate = ''

    if (originalDate) {
      splitDate = originalDate.split('/');

      if (splitDate.length == 3) {
        modifiedDate = `${splitDate[0]}/${Number(splitDate[1]) + 1}/${splitDate[2]}`
      }

    }

    return modifiedDate;

  }



  // getGuarantorInfo() {
  //   let sortKey: Sort = {
  //     PROPOSAL_ID: this.PROPOSAL_ID
  //   }

  //   this.api.getAllGuarantorInfo_Amulya(sortKey).subscribe(res => {
  //     if (res['code'] == 200 && res['data'].length) {
  //       this.guarantor = res['data'][0]

  //       let sortKey_GID: GIDSort = {
  //         G_ID: this.guarantor.ID
  //       };

  //       this.api.getGuarantorPersonal_Amulya(sortKey_GID).subscribe(resP => {
  //         if (resP['code'] == 200 && resP['data'].length > 0) {
  //           this.amulyaGuarantorPersonal = resP['data'][0]
  //         }
  //       });

  //       this.api.getAllGuarantorProperty_Amulya(sortKey_GID).subscribe(resB => {
  //         if (resB['code'] == 200 && resB['data'].length > 0) {
  //           this.guarantorProperties = resB['data']
  //           this.gVehicleProp = this.guarantorProperties.filter(
  //             (item) =>
  //               item.PROPERTY_TYPE == 'V'
  //           );

  //           this.gNotVehicleProp = this.guarantorProperties.filter(
  //             (item) =>
  //               item.PROPERTY_TYPE != 'V'
  //           );

  //         }

  //       });

  //       this.api.getAllBanker_Amulya(sortKey_GID).subscribe(resBA => {
  //         if (resBA['code'] == 200 && resBA['data'].length > 0) {
  //           this.amulyaGuarantorBanker = resBA['data'];
  //         }
  //       });

  //       this.api.getAllEmployer_Amulya(sortKey_GID).subscribe(resE => {
  //         if (resE['code'] == 200 && resE['data'].length > 0) {
  //           this.amulyaGuarantorEmployer = resE['data']
  //         }
  //       })
  //     }
  //   });
  // }


  getGuarantor() {
    let sortKey: Sort = new Sort(this.PROPOSAL_ID);
    this.api.getGuarantorInformation1(sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.guarantorMain = res['data'];
        this.getGuarantorPersonal();
        this.getGuarantorProperty();
        this.getGuarantorFinancialInformation();
        this.getGuarantorCreditInformation();
        this.getGuarantorIncomeInformation();

      }
    });
  }

  getGuarantorPersonal() {
    for (let i = 0; i < this.guarantorMain.length; i++) {
      this.guarantorMain[i].PERSONAL_INFORMATION = new GuarantorPersonal();

      this.api.getGuarantorPersonal(this.guarantorMain[i].ID).subscribe(resP => {
        if (resP['code'] == 200 && resP['data'].length > 0) {
          this.guarantorMain[i].PERSONAL_INFORMATION = resP['data'][0]
        }
      });

    }
  }

  getGuarantorProperty() {
    for (let i = 0; i < this.guarantorMain.length; i++) {
      this.guarantorMain[i].PROPERTY_INFORMATION = []

      this.api.getGuarantorPropertiesToAdd(this.guarantorMain[i].ID).subscribe(resP => {
        if (resP['code'] == 200 && resP['data'].length > 0) {
          this.guarantorMain[i].PROPERTY_INFORMATION = resP['data']
        }
      });

    }
  }

  getGuarantorFinancialInformation() {
    for (let i = 0; i < this.guarantorMain.length; i++) {
      this.guarantorMain[i].FINANCIAL_INFORMATION = new GuarantorFinancial();

      this.api.getGuarantorFinancialInformation(this.guarantorMain[i].ID).subscribe(resP => {
        if (resP['code'] == 200 && resP['data'].length > 0) {
          this.guarantorMain[i].FINANCIAL_INFORMATION = resP['data'][0]
        }
      });

    }
  }

  getGuarantorCreditInformation() {
    for (let i = 0; i < this.guarantorMain.length; i++) {
      this.guarantorMain[i].CREDIT_INFORMATION = new GuarantorCredit();

      this.api.getGuarantorCreditInformation(this.guarantorMain[i].ID).subscribe(resP => {
        if (resP['code'] == 200 && resP['data'].length > 0) {
          this.guarantorMain[i].CREDIT_INFORMATION = resP['data'][0];
          this.getCreaditLoanInfo();
        }
      });

    }
  }

  getGuarantorIncomeInformation() {
    for (let i = 0; i < this.guarantorMain.length; i++) {
      this.guarantorMain[i].INCOME_INFORMATION = new GuarantorIncome();

      this.api.getgIncomeInformation(this.guarantorMain[i].ID).subscribe(resP => {
        if (resP['code'] == 200 && resP['data'].length > 0) {
          this.guarantorMain[i].INCOME_INFORMATION = resP['data'][0]
          this.getGSalary();
          this.getGBusiness();
          this.getGHouse();
          this.getGAgri();
          this.getGOther();
        }
      });



    }
  }

  getGSalary() {

    if (this.guarantorMain.length > 0) {

      this.api.getAllGuarantorSalariedInformation(this.guarantorMain[0].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[0].INCOME_INFORMATION.SALARY_INFO = data['data'][0];
            this.guarantorAllSalary = data['data'];
            console.log('Guarantor Salary Information--------', this.guarantorAllSalary)
          }
        }
      )
    }


    if (this.guarantorMain.length > 1) {

      this.api.getAllGuarantorSalariedInformation(this.guarantorMain[1].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[1].INCOME_INFORMATION.SALARY_INFO = data['data'][1];
            this.guarantorAllSalary2 = data['data'];
            console.log('Guarantor Salary Information--------', this.guarantorAllSalary2)
          }
        }
      )
    }

  }

  getGBusiness() {
    if (this.guarantorMain.length > 0) {

      this.api.getGuarantorBusinessInformation(this.guarantorMain[0].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[0].INCOME_INFORMATION.BUSINESS_INFO = data['data'][0];
            this.guarantorAllBusiness = data['data'];
          }
        }
      )

    }

    if (this.guarantorMain.length > 1) {

      this.api.getGuarantorBusinessInformation(this.guarantorMain[1].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[1].INCOME_INFORMATION.BUSINESS_INFO = data['data'][1];
            this.guarantorAllBusiness2 = data['data'];
          }
        }
      )

    }

  }

  getGHouse() {
    if (this.guarantorMain.length > 0) {

      this.api.getGuarantorHouseInformation(this.guarantorMain[0].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[0].INCOME_INFORMATION.HOUSE_INFO = data['data'][0];
            this.guarantorAllHouse = data['data'];
          }
        }
      )

    }

    if (this.guarantorMain.length > 1) {

      this.api.getGuarantorHouseInformation(this.guarantorMain[1].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[1].INCOME_INFORMATION.HOUSE_INFO = data['data'][1];
            this.guarantorAllHouse2 = data['data'];
          }
        }
      )

    }

  }

  getGAgri() {
    if (this.guarantorMain.length > 0) {

      this.api.getGuarantorAgricultureInformation(this.guarantorMain[0].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[0].INCOME_INFORMATION.AGRI_INFO = data['data'][0];
            this.guarantorAllAgriculture = data['data'];
          }
        }
      )

    }

    if (this.guarantorMain.length > 1) {

      this.api.getGuarantorAgricultureInformation(this.guarantorMain[1].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[1].INCOME_INFORMATION.AGRI_INFO = data['data'][1];
            this.guarantorAllAgriculture2 = data['data'];
          }
        }
      )

    }

  }

  getGOther() {
    if (this.guarantorMain.length > 0) {

      this.api.getGuarantorOtherInformation(this.guarantorMain[0].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[0].INCOME_INFORMATION.OTHER_INFO = data['data'][0];
            this.guarantorAllOther = data['data'];
          }
        }
      )

    }

    if (this.guarantorMain.length > 1) {

      this.api.getGuarantorOtherInformation(this.guarantorMain[1].INCOME_INFORMATION.ID).subscribe(
        data => {
          if (data['code'] == 200 && data['data'].length > 0) {
            this.guarantorMain[1].INCOME_INFORMATION.OTHER_INFO = data['data'][1];
            this.guarantorAllOther2 = data['data'];
          }
        }
      )

    }

  }

  getCreaditLoanInfo() {
    for (let i = 0; i < this.guarantorMain.length; i++) {
      this.guarantorMain[i].CREDIT_INFORMATION.THIS_BANK_LOAN = []
      this.guarantorMain[i].CREDIT_INFORMATION.OTHER_BANK_LOAN = []
      this.guarantorMain[i].CREDIT_INFORMATION.THIS_BANK_GUARANTEE = []

      this.api.getGuarantorCreditLoanFromThisBank(this.guarantorMain[i].ID).subscribe(
        successCode => {
          if (successCode['code'] == 200 && successCode['data'].length > 0) {
            this.guarantorMain[i].CREDIT_INFORMATION.THIS_BANK_LOAN = successCode['data'];
          }
        });

      this.api.getGuarantorCreditLoanFromOtherBank(this.guarantorMain[i].ID).subscribe(
        successCode => {
          if (successCode['code'] == 200 && successCode['data'].length > 0) {
            this.guarantorMain[i].CREDIT_INFORMATION.OTHER_BANK_LOAN = successCode['data']
          }
        }
      );

      this.api.getGuarantorCreditLoanGuarantee(this.guarantorMain[i].ID).subscribe(
        successCode => {
          if (successCode['code'] == 200 && successCode['data'].length > 0) {
            this.guarantorMain[i].CREDIT_INFORMATION.THIS_BANK_GUARANTEE = successCode['data']
          }
        }
      );

    }
  }

  // CalculateTotal(guarantor) {
  //   let total = 0;
  //   for (let loan of guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN) {
  //     total += loan.SANCTIONED_AMOUNT;
  //   }

  //   for (let loan of guarantor.CREDIT_INFORMATION.OTHER_BANK_LOAN) {
  //     total += loan.SANCTION_AMOUNT;
  //   }

  //   return total;
  // }


  CalculateTotal(guarantor) {
    let total = 0;

    // Check if guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN is an array
    if (Array.isArray(guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN)) {
      for (let loan of guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN) {
        total += loan.SANCTIONED_AMOUNT;
      }
    }

    // Check if guarantor.CREDIT_INFORMATION.OTHER_BANK_LOAN is an array
    if (Array.isArray(guarantor.CREDIT_INFORMATION.OTHER_BANK_LOAN)) {
      for (let loan of guarantor.CREDIT_INFORMATION.OTHER_BANK_LOAN) {
        total += loan.SANCTION_AMOUNT;
      }
    }

    return total;
  }

  // CalculateTotal2(guarantor) {
  //   let total = 0;
  //   for (let loan of guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN) {
  //     total += loan.SANCTIONED_AMOUNT;
  //   }

  //   for (let loan of guarantor.CREDIT_INFORMATION.THIS_BANK_GUARANTEE) {
  //     total += loan.SANCTIONED_AMOUNT;
  //   }

  //   return total;
  // }

  CalculateTotal2(guarantor) {
    let total = 0;

    // Check if guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN is an array
    if (Array.isArray(guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN)) {
      for (let loan of guarantor.CREDIT_INFORMATION.THIS_BANK_LOAN) {
        total += loan.SANCTIONED_AMOUNT;
      }
    }

    // Check if guarantor.CREDIT_INFORMATION.THIS_BANK_GUARANTEE is an array
    if (Array.isArray(guarantor.CREDIT_INFORMATION.THIS_BANK_GUARANTEE)) {
      for (let loan of guarantor.CREDIT_INFORMATION.THIS_BANK_GUARANTEE) {
        total += loan.SANCTIONED_AMOUNT;
      }
    }

    return total;
  }


  // getAllGuarantorData() {

  //   let sortKey: Sort = new Sort(this.PROPOSAL_ID);
  //   this.api.getGuarantorInformation1(sortKey).subscribe(res => {
  //     if (res['code'] == 200 && res['data'].length) {
  //       this.guarantorMain = res['data'][0]

  //       let sortKey_GID: GIDSort = {
  //         G_ID: this.guarantorMain.ID
  //       };

  //       this.api.getGuarantorPersonal(sortKey_GID).subscribe(resP => {
  //         if (resP['code'] == 200 && resP['data'].length > 0) {
  //           this.guarantorPersonalData = resP['data'][0]
  //         }
  //       });

  //       this.api.getGuarantorProperty(sortKey_GID).subscribe(resP => {
  //         if (resP['code'] == 200 && resP['data'].length > 0) {
  //           this.guarantorSubPropertyData = resP['data'][0]
  //         }
  //       });

  //       this.api.getGuarantorFinancialInformation(sortKey_GID).subscribe(resP => {
  //         if (resP['code'] == 200 && resP['data'].length > 0) {
  //           this.guarantorFinancialData = resP['data'][0]
  //         }
  //       });

  //       this.api.getGuarantorCreditInformation(sortKey_GID).subscribe(resP => {
  //         if (resP['code'] == 200 && resP['data'].length > 0) {
  //           this.guarantorCreditData = resP['data'][0]
  //         }
  //       });

  //       this.api.getgIncomeInformation(sortKey_GID).subscribe(resP => {
  //         if (resP['code'] == 200 && resP['data'].length > 0) {
  //           this.guarantorIncomeData = resP['data'][0]
  //         }
  //       });


  //     }

  //   });
  // }

  coborrowerData = []

  getCoborrower() {
    this.api.getAllGuarantorInformation(1, 100, "id", "desc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND VISIBILITY=1").subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0) {
        this.coborrowerData = data['data'];
        this.getCoborrowerPersonal()
      }

    }, err => {

    });
  }

  getCoborrowerPersonal() {
    for (let i = 0; i < this.coborrowerData.length; i++) {
      this.api.getAddressInfo(this.PROPOSAL_ID, "G", this.coborrowerData[i].APPLICANT_ID).subscribe(data => {
        this.coborrowerData[i].PERSONAL_INFORMATION = new Personalinformation();
        if (data['code'] == 200 && data['data'].length > 0) {
          this.coborrowerData[i].PERSONAL_INFORMATION = data['data'][0];
          console.log(this.coborrowerData[i].PERSONAL_INFORMATION, 'this is coborrower personal data-------------------------------------------------------------------------------------------------------------')
        }
      }, err => {

      });
    }
  }

  getcoborrowerAddress() {

  }



  public generatePDF() {
    this.isButtonSpinning = true;
    var i = 0;
    var date = new Date();
    var datef = this.datePipe.transform(date, "dd-MM-yyyy");
    var dates = this.datePipe.transform(date, "h:mm:ss a");
    var data = document.getElementById("contentToConvert");

    let startCount = 1;

    let loan_type = '';

    if (this.security == true) {
      startCount = 0;
      loan_type = 'Loan Application'
    }
    if (this.type2 == true) {
      startCount = 1;
      loan_type = 'Salad Kararpatra I'
    }
    if (this.type3 == true) {
      startCount = 5;
      loan_type = 'Receipt'
    }
    if (this.type4 == true) {
      startCount = 6;
      loan_type = 'Promissory Note'
    }
    if (this.type5 == true) {
      startCount = 10;
      loan_type = 'Salad Kararpatra II'
    }

    if (this.type6 == true) {
      startCount = 18;
      loan_type = 'Nagadu Kararpatra'
    }

    if (this.type7 == true) {
      startCount = 18;
      loan_type = 'Kantine Kararpatra'
    }

    if (this.type8 == true) {
      startCount = 19;
      loan_type = 'Continue Mortgage Form'
    }

    if (this.type9 == true) {
      startCount = 0;
      loan_type = 'Kabja Patra'
    }

    if (this.type10 == true) {
      startCount = 7;
      loan_type = 'Hypothecation Agreement'
    }

    if (this.type11 == true) {
      startCount = 7;
      loan_type = 'Guarantee Clause'
    }

    if (this.type12 == true) {
      startCount = 7;
      loan_type = 'Letter of Authority'
    }


    var opt = {
      margin: 5.08,
      filename: `${loan_type}_${this.data.LOAN_KEY}.pdf`,
      image: { type: "jpeg", quality: 0.92 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "legal", orientation: "portrait" },
    };
    html2pdf()
      .set(opt)
      .from(data)
      .save();

    this.isButtonSpinning = false;

    this.api
      .getAllPraposals(
        0,
        0,
        "ID",
        "asc",
        " AND ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200 && data["count"] > 0) {
            this.data = data["data"][0];
            console.log("poposal signature ani" + this.data);
          }
        },
        (err) => {
          this.isButtonSpinning = false;
          console.log(err);
          if (err["ok"] == false) this.message.error("Server Not Found", "");
        }
      );
  }
  bar: string = "|";

  termIdToTerm_Jyoti(termID: number): any {
    let TermArray = [2, 3, 5, 7, 9]
    if (termID == 1) {
      return TermArray[0];
    }
    else if (termID == 2) {
      return TermArray[1]
    }
    else if (termID == 3) {
      return TermArray[2]
    }
    else if (termID == 4) {
      return TermArray[3]
    }
    else if (termID == 9) {
      return TermArray[4]
    }
    else {
      return "";
    }

  }

  termIdToTerm(termID: number): any {
    let TermArray = [2, 3, 5, 7, 8, 10, 15, 20];
    if (termID == 1) {
      return TermArray[0];
    } else if (termID == 2) {
      return TermArray[1];
    } else if (termID == 3) {
      return TermArray[2];
    } else if (termID == 4) {
      return TermArray[3];
    } else if (termID == 5) {
      return TermArray[4];
    } else if (termID == 6) {
      return TermArray[5];
    } else if (termID == 7) {
      return TermArray[6];
    } else if (termID == 8) {
      return TermArray[7];
    } else {
      return "";
    }
  }
  getJointaccData() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID;
    this.api
      .getAllJoints(1, 1, "ID", "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID)
      .subscribe((data) => {
        if (data["code"] == "200" && data["count"] > 0) {
          this.datajoint = data["data"];

          this.datajoint[0].NAME = data["data"][0]["NAME"];
          this.datajoint[0].OCCUPATION = data["data"][0]["OCCUPATION"];
          this.datajoint[0].PARENT_NAME = data["data"][0]["PARENT_NAME"];
          console.log('For parent name :', this.datajoint[0]);

          for (let i = 0; i < this.datajoint.length; i++) {
            filter = " AND ID=" + this.datajoint[i].ADDRESS_ID;
            console.log("property filter", filter);
            this.datajoint[i]["addressinfo11"] = new Addressinfo();
            this.api
              .getAllAddressInformation(0, 0, "ID", "desc", filter)
              .subscribe(
                (data2) => {
                  console.log("joint", data2);

                  this.datajoint[i]["addressinfo11"] = data2["data"][0];

                  this.datajoint[0].VILLAGE = data2["data"][0]["VILLAGE"];
                  this.datajoint[0].DISTRICT = data2["data"][0]["DISTRICT"];
                  this.datajoint[0].TALUKA = data2["data"][0]["TALUKA"];

                  // console.log(datajoint.addressinfo.TALUKA)
                },
                (err) => {
                  //console.log(err);
                }
              );
          }
          //console.log(this.joint,"joint");
        }
      });
  }
  parent_name;
  loadparent(proposalId, applicantId) {
    this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
      console.log("data adatafaxjhghxjhxsj", data)
      if (data['code'] == 200 && data['data'].length > 0) {
        // this.data = Object.assign({}, data['data'][0]);
        this.parent_name = data['data'][0]['PARENT_NAME']
        console.log("parent name", this.parent_name);


      }
    }, err => {
      //console.log(err);
    });

  }

  loanproposals() {
    this.api
      .getAllPraposals(
        0,
        0,
        "ID",
        "asc",
        " AND ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200 && data["count"] > 0) {
            this.data = data["data"][0];

            console.log(this.data + "aniruddha here");
          }
        },
        (err) => {
          this.isButtonSpinning = false;
          console.log(err);
          if (err["ok"] == false) this.message.error("Server Not Found", "");
        }
      );
  }

  changeLang(language: string): void {
    this.browserLang = language;

  }

  convertNumberToWords(num) {
    if (num == undefined || num == null) {
      num = 0;
    }

    var a = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    var b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    var n;
    if ((num = num.toString()).length > 9) return "overflow";
    n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
        : "";
    return str;
  }

  onChange2(dates) {
    if (dates != undefined && dates != "") {
      const bdate = new Date(dates);
      const currentDate = new Date();
      let currentMonth = currentDate.getMonth() + 1;
      let birthMonth = bdate.getMonth() + 1;

      return this.findAge(
        currentDate.getDate(),
        currentMonth,
        currentDate.getFullYear(),
        bdate.getDate(),
        birthMonth,
        bdate.getFullYear()
      );
    }
  }

  getconsti(value) {
    if (value > 0) {
      var data = this.constitutionData.filter((item) => item.ID == value);

      return data[0]["NAME"];
    } else {
      return "";
    }
  }
  getText(i) {
    if (i == 0) {
      return "अ";
    }
    if (i == 1) {
      return "ब";
    }
    if (i == 2) {
      return "क";
    }
    if (i == 3) {
      return "ड";
    }
    if (i == 4) {
      return "ई";
    }
    if (i == 5) {
      return "फ";
    }
    if (i == 6) {
      return "ग";
    }
  }
  getN(i: number) {
    if (i == 0) {
      return "१";
    }
    if (i == 1) {
      return "२";
    }
    if (i == 2) {
      return "३";
    }
    if (i == 3) {
      return "४";
    }
    if (i == 4) {
      return "५";
    }
    if (i == 5) {
      return "६";
    }
    if (i == 6) {
      return "७";
    }
    if (i == 7) {
      return "८";
    }
    if (i == 8) {
      return "९";
    }
    if (i == 9) {
      return "१०";
    }
  }

  findAge(
    current_date,
    current_month,
    current_year,
    birth_date,
    birth_month,
    birth_year
  ) {
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (birth_date > current_date) {
      current_month = current_month - 1;

      current_date = current_date + month[birth_month - 1];
    }

    if (birth_month > current_month) {
      current_year = current_year - 1;
      current_month = current_month + 12;
    }

    let calculated_date = current_date - birth_date;

    let calculated_month = current_month - birth_month;

    let calculated_year = current_year - birth_year;

    return calculated_year.toString();
  }

  index2: number = 0;
  i2 = 0;
  onIndexChange(event) {
    this.index = event;
    console.log(this.dataGList5.length);
    this.index2 = event + this.dataGList5.length;
  }

  isvisible() {
    for (var index = 1; index <= 12; index++) {
      var ok = false;
      this.IndivisualInfotabs.find((data) => {
        if (data.EXTRA_INFORMATION_ID == index) {
          ok = true;
        }
      });

      if (ok) {
        this.visible[index] = true;
      } else this.visible2[index] = false;
    }
  }

  getStatus(status) {
    return "finish";
  }

  bankopinion: any;
  IS_CHECK_obtained: any;
  IS_IDENTITY_card_obtained: any;
  loadAllExtraInformationMapped(
    proposalId,
    applicantId,
    type,
    data1?: Proposal
  ) {
    this.APPLICANT_ID = applicantId;
    this.PROPOSAL_ID = proposalId;
    this.proposalData = data1;
    this.bankopinion = data1["BRANCH_OPINION_TEXT"];
    this.IS_CHECK_obtained = data1["IS_CHECK_OBTAINED"];
    this.IS_IDENTITY_card_obtained = data1["IS_IDENTITY_CARD_OBTAINED"];
    // console.log(this.IS_CHECK_obtained,"is checked")
    // console.log(this.IS_IDENTITY_card_obtained,"is obtained")
    // console.log(this.bankopinion,"opnioin")
    this.api
      .getAllProposalDocuments(
        0,
        0,
        "CREATED_MODIFIED_DATE",
        "desc",
        " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
      )
      .subscribe((data) => {
        var data1 = [];
        data1 = data["data"];

        this.proposalDocumentData1 = data1.filter(
          (item) => item.IS_APPROVED == 1
        );
        console.log(this.proposalDocumentData1);

        this.proposalDocumentData = data1.filter((object) => {
          return object["IS_APPROVED"] == 1;
        });
      });
    this.proposalAmInWords = this.convertNumberToWords(
      this.proposalData.SANCTION_AMOUNT
    );
    sessionStorage.setItem("APPLICANT_ID", data1.APPLICANT_ID.toString());
    //load all extra information mapped
    if (type == 1) {
      this.security = true;
      this.type2 = false;
      this.type3 = false;
      this.type4 = false;
      this.type1 = false;
      this.type5 = false;
      this.type6 = false;
      this.type7 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
    }

    if (type == 2) {
      this.type2 = true;
      this.security = false;
      this.type3 = false;
      this.type4 = false;
      this.type1 = false;
      this.type5 = false;
      this.type6 = false;
      this.type7 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 3) {
      this.type3 = true;
      this.security = false;
      this.type2 = false;
      this.type4 = false;
      this.type1 = false;
      this.type5 = false;
      this.type7 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 4) {
      this.type4 = true;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type5 = false;
      this.type7 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }
    if (type == 5) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type5 = true;
      this.type6 = false;
      this.type7 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 6) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type6 = true;
      this.type5 = false;
      this.type7 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 7) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type6 = false;
      this.type5 = false;
      this.type7 = true;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 8) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type6 = false;
      this.type5 = false;
      this.type8 = true;
      this.type7 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 9) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type6 = false;
      this.type5 = false;
      this.type8 = false;
      this.type7 = false;
      this.type9 = true;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 10) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = true;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 11) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = true;
      this.type12 = false;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 12) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = true;
      this.type13 = false;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 13) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = true;
      this.type14 = false;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 14) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type14 = true;
      this.type15 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 15) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type15 = true;
      this.type14 = false;
      this.type16 = false;
      this.type17 = false;
    }

    if (type == 16) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type16 = true;
      this.type15 = false;
      this.type14 = false;
      this.type17 = false;
    }

    if (type == 17) {
      this.type4 = false;
      this.security = false;
      this.type2 = false;
      this.type3 = false;
      this.type1 = false;
      this.type7 = false;
      this.type5 = false;
      this.type6 = false;
      this.type8 = false;
      this.type9 = false;
      this.type10 = false;
      this.type11 = false;
      this.type12 = false;
      this.type13 = false;
      this.type17 = true;
      this.type15 = false;
      this.type16 = false;
      this.type14 = false;
    }

    let filter = " AND PROPOSAL_ID=" + proposalId + " AND TYPE = 'B'";
    this.isSpinningTabs = true;

    this.api
      .getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter)
      .subscribe(
        (data) => {
          this.isSpinningTabs = false;
          if (data["count"] > 0) {
            this.textVisible = false;
            this.IndivisualInfotabs = data["data"];
            this.isvisible();
            this.api
              .getAllIncomeInformation(0, 0, "ID", "ASC", filter)
              .subscribe(
                (data) => {
                  if (data["code"] == 200 && data["count"] > 0) {
                    sessionStorage.setItem(
                      "IS_SAVED",
                      data["data"][0]["IS_SAVED"]
                    );
                    // this.incomeSourceId = data["data"][0]["INCOME_SOURCE_ID"];
                    // this.otherincomeSourceId =
                    //   data["data"][0]["OTHER_INCOME_SOURCE_ID"];
                    // this.otherincomeSourceId2 =
                    //   data["data"][0]["OTHER_INCOME_SOURCE_ID2"];
                  }
                },
                (err) => {
                  //console.log(err);
                }
              );

            if (data1.PRAPOSAL_TYPE == "वैयक्तिक") {
              this.PROPOSAL_TYPE = "1";
              sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE);

              this.index = 0;
              this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(
                (data) => {
                  if (data["code"] == 200) {
                    this.personalInfo = Object.assign({}, data["data"][0]);
                    this.pan = this.personalInfo["PAN"].split("");
                    this.personalInfo.MOBILE_NO1 = data1.MOBILE_NUMBER;
                    sessionStorage.setItem(
                      "personalMobile",
                      this.personalInfo.MOBILE_NO1
                    );
                    sessionStorage.setItem(
                      "ApplicantName",
                      this.personalInfo.APPLICANT_NAME
                    );
                    this.personalInformationId = this.personalInfo.ID;
                    this.addressinfoCurrent = Object.assign(
                      {},
                      data["data"][0]["CURRENT_ADDRESS"][0]
                    );
                    this.addressinfoPermanent = Object.assign(
                      {},
                      data["data"][0]["PERMANENT_ADDRESS"][0]
                    );
                    this.familyDeatails = this.personalInfo.FAMILY_MEMBERS;

                    console.log(this.familyDeatails);

                    // this.personalinfo1.loadInfo(proposalId)
                  }
                },
                (err) => {
                  //console.log(err);
                }
              );
            } else {
              this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(
                (data) => {
                  if (data["code"] == 200) {
                    this.personalInfo = Object.assign({}, data["data"][0]);
                    this.pan = this.personalInfo["PAN"].split("");
                    this.personalInformationId = this.personalInfo.ID;
                    this.addressinfoCurrent = Object.assign(
                      {},
                      data["data"][0]["CURRENT_ADDRESS"][0]
                    );
                    this.addressinfoPermanent = Object.assign(
                      {},
                      data["data"][0]["PERMANENT_ADDRESS"][0]
                    );
                    this.familyDeatails = [];

                    if (this.personalInfo.DOB != "") {
                      // this.personalinfo1.loadInfo(proposalId)
                    }
                  }
                },
                (err) => {
                  //console.log(err);
                }
              );
              this.PROPOSAL_TYPE = "2";
              sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE);
              // this.index=0
            }
          } else {
            this.IndivisualInfotabs = [];
            this.textVisible = true;
            sessionStorage.setItem("PRAPOSAL_TYPE", "0");
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    this.api.getAllIncomeSocurce(0, 0, "ID", "asc", "").subscribe(
      (data) => {
        this.incomeTypeData = data["data"];
      },
      (err) => {
        //console.log(err);
      }
    );
    // this.api.getAllFirmInformation(0, 0, "ID", "asc", "AND PROPOSAL_ID=" + proposalId)
    //   .subscribe(data => {
    //     if (data['code'] == "200" && data['count'] > 0) {
    //       this.data2 = data['data'][0];
    //       this.getsisData();
    //       // if (this.type4) {
    //       this.getData1();
    //       this.getData4();
    //       this.getData5();
    //       // }
    //     }
    //   }, err => {
    //     //console.log(err);
    //   });

    this.api
      .getAllLoanScheme(0, 0, "ID", "asc", " AND  IS_ACTIVE = 1")
      .subscribe((successCode) => {
        this.loanData = [];
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.loanData = successCode["data"];
        }
      });
    this.api
      .getAllInstallmentFrequency(0, 0, "ID", "asc", "AND IS_ACTIVE = '1'")
      .subscribe(
        (loanInfos) => {
          if (loanInfos["code"] == "200") {
            this.installmentFrequencyData = loanInfos["data"];
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    this.api.getAllTermofLoan(1, 20, "ID", "asc", "").subscribe(
      (data) => {
        if (data["code"] == "200") {
          this.termdata = data["data"];
        }
      },
      (err) => {
        //console.log(err);
      }
    );
    let filters = "";

    // if (this.PROPOSAL_TYPE == "1") {
    //   filters = " AND IS_ACTIVE=1 AND TYPE='I' OR TYPE='B'"
    // }
    // else {

    filters = " AND IS_ACTIVE=1 AND TYPE='B'";
    // }

    // this.api.getAllBankLoanTypes(0, 0, 'ID', "asc", filters)
    //   .subscribe(successCode => {
    //     this.loanData2 = [];
    //     if (successCode['code'] == "200" && successCode['count'] > 0) {
    //       this.loanData2 = successCode['data'];
    //     }
    //   });

    this.GdataList2 = [
      {
        gdataLists: [new BusinessInfo()],
        gagridataList: [new AgriInfo()],
        gpersonalInfo: new Personalinformation(),
        gaddressinfoCurrent: new Addressinfo(),
        gincomedata: new Incomeinformation(),
        gincomeTypeData: [],
        gdataSalary: new SalariedInfo(),
        gaddressinfoBBussiness: new Addressinfo(),
        gcreditdata: [new Creditinformation()],
        gdataLTList6: [new BankLoan()],
        gdataListO: [new Propertyinformation()],
        gfinancialData: new Financialinformation(),
      },
      {
        gdataLists: [new BusinessInfo()],
        gagridataList: [new AgriInfo()],
        gpersonalInfo: new Personalinformation(),
        gaddressinfoCurrent: new Addressinfo(),
        gincomedata: new Incomeinformation(),
        gincomeTypeData: [],
        gdataSalary: new SalariedInfo(),
        gaddressinfoBBussiness: new Addressinfo(),
        gcreditdata: [new Creditinformation()],
        gdataLTList6: [new BankLoan()],
        gdataListO: [new Propertyinformation()],
        gfinancialData: new Financialinformation(),
      },
    ];
    this.dataPropertyList = [
      new Propertyinformation(),
      new Propertyinformation(),
    ];
    this.dataPropertyList[0]["addressinfo"] = new Addressinfo();
    this.dataPropertyList[1]["addressinfo"] = new Addressinfo();
    this.dataPropertyList1 = [
      new Propertyinformation(),
      new Propertyinformation(),
    ];
    this.dataPropertyList1[0]["addressinfo"] = new Addressinfo();
    this.dataPropertyList1[1]["addressinfo"] = new Addressinfo();
    this.dataPropertyList2 = [
      new Propertyinformation(),
      new Propertyinformation(),
    ];
    this.dataPropertyList2[0]["addressinfo"] = new Addressinfo();
    this.dataPropertyList2[1]["addressinfo"] = new Addressinfo();
    this.dataPropertyList5 = [
      new Propertyinformation(),
      new Propertyinformation(),
    ];
    this.dataPropertyList5[0]["addressinfo"] = new Addressinfo();
    this.dataPropertyList5[1]["addressinfo"] = new Addressinfo();
    this.datajoint = [new JointAccount(), new JointAccount()];
    this.datajoint[0]["addressinfo11"] = new Addressinfo();
    // this.datajoint[1]['addressinfo'] = new Addressinfo();
    this.primedataList = this.dataPropertyList;
    this.addressinfoBBussiness = new Addressinfo();
    this.financialData = new Financialinformation();
    this.agridataList = [];
    // this.dataBList1 = [];
    this.dataSalary = new SalariedInfo();
    this.loadInfo();
    this.getdata();
    this.expenditure1();
    this.Info();
    this.loadAllLoanInformation();
    this.loadAllPrimeInfo();
    this.loadFinanceData();
    this.loadcreditdata();
    this.getincomeData();
    this.loadparent(proposalId, applicantId);

    // this.assignData()
    this.loadsubproperty();
    this.getJointaccData();
    this.getCoborrower();
    this.getGuarantor();
    this.loanproposals();
    this.getEduIns();

    // if (this.type4) {
    // this.getBalanceData();
    this.api.getAllPurposeofloan(0, 0, "ID", "asc", "").subscribe(
      (data) => {
        if (data["code"] == "200") {
          this.loanInfoData = data["data"];
          console.log(this.loanInfoData["NAME"]);
          // this.isSpinning1 = false
        }
      },
      (err) => {
        //console.log(err);
      }
    );







    // }
    if (this.type2) {
      this.getAllRealEstateResidentialLoan();
    }

    if (this.type1) {
      this.api
        .getAlldepositLoan(
          0,
          0,
          "ID",
          "asc",
          " AND PROPOSAL_ID=" + this.PROPOSAL_ID
        )
        .subscribe(
          (data) => {
            if (data["code"] == "200" && data["count"] > 0) {
              this.pigmidata = data["data"][0];
              this.RECEIPT_AMOUNT_IN_WORDS = this.convertNumberToWords(
                this.pigmidata.RECEIPT_AMOUNT
              );
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }

    if (this.type4) {
      this.vehicledata = new Vehicleloan();
      this.api
        .getAllVehicleLoan(
          0,
          0,
          "ID",
          "asc",
          "AND PROPOSAL_ID=" + this.PROPOSAL_ID
        )
        .subscribe(
          (data) => {
            if (data["code"] == "200" && data["count"] > 0) {
              this.vehicledata = data["data"][0];
              console.log("vehicledata" + this.vehicledata);
            }
          },
          (err) => { }
        );
    }
  }
  getAllRealEstateResidentialLoan() {
    this.addressinfo4 = new Addressinfo();
    this.api
      .getAllRealEstateResidentialLoan(
        0,
        0,
        "ID",
        "asc",
        "AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == "200" && data["count"] > 0) {
            this.RealEstatedata = data["data"][0];
            if (this.RealEstatedata.ADDRESS_ID > 0)
              this.api
                .getAllAddressInformation(
                  0,
                  0,
                  "ID",
                  "asc",
                  "AND ID =" + this.RealEstatedata.ADDRESS_ID
                )
                .subscribe(
                  (data) => {
                    if (data["code"] == "200" && data["count"] > 0) {
                      this.addressinfo4 = data["data"][0];
                    }
                  },
                  (err) => {
                    //console.log(err);
                  }
                );
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  assignData() {
    this.balanceSheetInformation.YEAR =
      new Date().getFullYear() +
      "-" +
      (new Date().getFullYear() + 1).toString().substring(2);
    this.balanceSheetInformation1.YEAR =
      new Date().getFullYear() +
      1 +
      "-" +
      (new Date().getFullYear() + 2).toString().substring(2);
    this.balanceSheetInformation2.YEAR =
      new Date().getFullYear() +
      2 +
      "-" +
      (new Date().getFullYear() + 3).toString().substring(2);
    this.balanceSheetInformation3.YEAR =
      new Date().getFullYear() +
      3 +
      "-" +
      (new Date().getFullYear() + 4).toString().substring(2);
    this.balanceSheetInformation4.YEAR =
      new Date().getFullYear() +
      4 +
      "-" +
      (new Date().getFullYear() + 5).toString().substring(2);
    this.balanceSheetInformation5.YEAR =
      new Date().getFullYear() +
      5 +
      "-" +
      (new Date().getFullYear() + 6).toString().substring(2);
    this.balanceSheetInformation6.YEAR =
      new Date().getFullYear() +
      6 +
      "-" +
      (new Date().getFullYear() + 7).toString().substring(2);
    this.balanceData = [
      this.balanceSheetInformation,
      this.balanceSheetInformation1,
      this.balanceSheetInformation2,
      this.balanceSheetInformation3,
      this.balanceSheetInformation4,
      this.balanceSheetInformation5,
      this.balanceSheetInformation6,
    ];
  }

  getBalanceData() {
    this.api
      .getAllBalanceSheetInformation(
        0,
        0,
        "ID",
        "asc",
        "AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == "200" && data["count"] > 0) {
            this.balanceData = data["data"];
            this.calculateB(0);
            this.calculateB(1);
            this.calculateB(2);
            this.calculateB(3);
            this.calculateB(4);
            this.calculateB(5);
            this.calculateB(6);

            this.calculateLiabilityB(0);
            this.calculateLiabilityB(1);
            this.calculateLiabilityB(2);
            this.calculateLiabilityB(3);
            this.calculateLiabilityB(4);
            this.calculateLiabilityB(5);
            this.calculateLiabilityB(6);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  calculateB(index) {
    this.balanceTotal[index] =
      Number(this.balanceData[index]["FIXED_ASSETS"]) +
      Number(this.balanceData[index]["INVESTMENTS"]) +
      Number(
        this.balanceData[index]["STOCK"] +
        this.balanceData[index]["WORK_IN_PROGRESS"]
      ) +
      Number(this.balanceData[index]["DEBTORS"]) +
      Number(this.balanceData[index]["CASH_AND_BANK"]) +
      Number(this.balanceData[index]["OTHER_ASSETS"]);
  }

  calculateLiabilityB(index) {
    this.balanceTotal1[index] =
      Number(this.balanceData[index]["CAPITAL"]) +
      Number(this.balanceData[index]["RESERVES"]) +
      Number(
        this.balanceData[index]["SUB_LOANS"] +
        this.balanceData[index]["OTHER_LOANS"]
      ) +
      Number(this.balanceData[index]["UNSECURED_LOANS"]) +
      Number(this.balanceData[index]["CREDITORS"]) +
      Number(this.balanceData[index]["PROVISION"]) +
      Number(this.balanceData[index]["OTHER_LIABILITIES"]);
  }

  getPurposeName(id: number) {
    if (id != null || id != undefined) {
      // if (id == 1) {
      if (this.loanInfoData.length > 0) {
        var Purposenames = this.loanInfoData.filter((item) => item.ID == id);
        // console.log(Purposenames);

        if (Purposenames.length > 0) {
          return Purposenames[0]["NAME"];
        } else return "";
      } else {
        return "-";
      }
      // }
    }
  }

  getfrequencyName(id: number) {
    if (id != null || id != undefined) {
      // if (id == 1) {
      if (this.installmentFrequencyData.length > 0) {
        var frequencyName = this.installmentFrequencyData.filter(
          (item) => item.ID == id
        );
        // console.log(Purposenames);

        if (frequencyName.length > 0) {
          return frequencyName[0]["NAME_EN"];
        } else return "";
      } else {
        return "-";
      }
      // }
    }
  }

  getTermName(id: number) {
    if (id != null || id != undefined) {
      // if (id == 1) {
      if (this.termdata.length > 0) {
        var termName = this.termdata.filter((item) => item.ID == id);
        // console.log(Purposenames);

        if (termName.length > 0) {
          return termName[0]["NAME"];
        } else return "";
      } else {
        return "-";
      }
      // }
    }
  }

  // getPurposeName(value) {

  //     if (this.loanInfoData.length > 0) {
  //       var Purposenames = this.loanInfoData.filter((item) => item.LOAN_PURPOSE_ID == value);
  //       if (this.browserLang == 'kn') {
  //         return Purposenames[0]['NAME'];
  //       } else if (this.browserLang == 'en') {
  //         return Purposenames[0]['NAME'];
  //         // console.log( Purposenames[0]['NAME_EN'])
  //       } else {
  //         return Purposenames[0]['NAME'];
  //       };
  //     } else {
  //       return '-';
  //     }
  // }

  loadAllLoanInformation() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID;
    this.api.getAllLoanInformation(0, 0, "ID", "asc", filter).subscribe(
      (data) => {
        if (data["count"] > 0) {
          this.loanInfo = data["data"][0];
          // this.loanInfoData = data['data'][0]
          // console.log(this.loanInfoData)
          //  purposename = this.loanInfo.filter((item) => item.ID == id);
          this.amountinwords = this.convertNumberToWords(
            this.loanInfo.LOAN_AMOUNT
          );
          // this.loanInfo.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(this.loanInfo.LOAN_AMOUNT);
          sessionStorage.setItem(
            "bankLoanId",
            this.loanInfo.BANK_LOAN_TYPE_ID.toString()
          );
          sessionStorage.setItem(
            "amount",
            this.loanInfo.LOAN_AMOUNT.toString()
          );
          sessionStorage.setItem("inwords", this.loanInfo.LOAN_AMOUNT_IN_WORDS);
          // if (this.type2) {
          this.getloanskimdata();
          // }
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }
  getloanskimdata() {
    if (this.loanInfo.BANK_LOAN_TYPE_ID == 8) {
      this.golddataList = [];
      this.goldTotal = 0;
      this.api
        .getAllGoldLoan(
          0,
          0,
          "ID",
          "asc",
          " AND PROPOSAL_ID=" + this.PROPOSAL_ID
        )
        .subscribe(
          (data) => {
            if (data["code"] == "200" && data["count"] > 0) {
              this.golddataList = data["data"];
              for (let i = 0; i < this.golddataList.length; i++) {
                this.goldTotal =
                  this.goldTotal + this.golddataList[i]["VALUATION_AMOUNT"];
              }
            } else {
              this.golddataList = [
                new Goldloan(),
                new Goldloan(),
                new Goldloan(),
                new Goldloan(),
                new Goldloan(),
                new Goldloan(),
              ];
            }
          },
          (err) => {
            //console.log(err);
          }
        );
    }

    // // this.isSpinning=true
    // this.api.getAllPladgeLoanInformation(0, 0, "ID", 'asc', "AND PROPOSAL_ID=" + this.PROPOSAL_ID).subscribe(data => {
    //   this.pledgeLoandata = new PledgeLoan();
    //   if (data['code'] == '200' && data['count'] > 0) {
    //     this.pledgeLoandata = data['data'][0];
    //     if (this.pledgeLoandata.ADDRESS_DETAILS_ID > 0)
    //       this.getaddressData(this.pledgeLoandata.ADDRESS_DETAILS_ID);

    //   }
    // }, err => {
    //   //console.log(err);
    // });
  }

  getWords(monthCount) {
    var months = { one: "month", other: "months" },
      years = { one: "year", other: "years" },
      m = monthCount % 12,
      y = Math.floor(monthCount / 12),
      result = [];

    y && result.push(y + " " + this.getPlural(y, years));
    m && result.push(m + " " + this.getPlural(m, months));
    return result.join(" and ");
  }

  getPlural(number, word) {
    return (number === 1 && word.one) || word.other;
  }

  getLoanName(id: number) {
    if (id != null || id != undefined) {
      // if (issub == 1) {
      if (this.loanData.length > 0) {
        var loannames = this.loanData.filter((item) => item.ID == id);
        //console.log(loannames);
        if (loannames.length > 0) {

          if (this.browserLang == "mr") {
            return loannames[0]["NAME_MR"];
          } else if (this.browserLang == "en") {
            return loannames[0]["NAME_EN"];
          } else {
            return loannames[0]["NAME_KN"];
          }

        } else return "";
      } else {
        return "-";
      }

    }
  }

  getLoanName11(id: number) {
    if (id != null || id != undefined) {
      // if (issub == 1) {
      if (this.loanData.length > 0) {
        var loannames = this.loanData.filter((item) => item.ID == id);
        //console.log(loannames);
        if (loannames.length > 0) {
          if (this.browserLang == "mr") {
            return loannames[0]["NAME_MR"];
          } else if (this.browserLang == "en") {
            return loannames[0]["NAME_EN"];
          } else {
            return loannames[0]["NAME_KN"];
          }
        } else return "";
      } else {
        return "-";
      }
      // } else {
      //   if (this.loanData.length > 0) {
      //     var loannames = this.loanData.filter((item) => item.ID == id);

      //     if (loannames.length > 0) {
      //       if (this.browserLang == 'mr') {
      //         return loannames[0]['NAME_MR'];
      //       } else if (this.browserLang == 'en') {
      //         return loannames[0]['NAME_EN'];
      //       } else {
      //         return loannames[0]['NAME_KN'];
      //       }
      //     }
      //     else
      //       return ""
      //   } else {
      //     return '-';
      //   }
      // }
    }
  }
  getLoanName111(id: number) {
    if (id != null || id != undefined) {
      // if (issub == 1) {
      if (this.loanData.length > 0) {
        var loannames = this.loanData.filter((item) => item.ID == id);
        //console.log(loannames);
        if (loannames.length > 0) {
          if (this.browserLang == "mr") {
            return loannames[0]["NAME_MR"];
          } else if (this.browserLang == "en") {
            return loannames[0]["NAME_EN"];
          } else {
            return loannames[0]["NAME_KN"];
          }
        } else return "";
      } else {
        return "-";
      }
      // } else {
      //   if (this.loanData.length > 0) {
      //     var loannames = this.loanData.filter((item) => item.ID == id);

      //     if (loannames.length > 0) {
      //       if (this.browserLang == 'mr') {
      //         return loannames[0]['NAME_MR'];
      //       } else if (this.browserLang == 'en') {
      //         return loannames[0]['NAME_EN'];
      //       } else {
      //         return loannames[0]['NAME_KN'];
      //       }
      //     }
      //     else
      //       return ""
      //   } else {
      //     return '-';
      //   }
      // }
    }
  }

  getaddressData(ID) {
    this.api
      .getAllAddressInformation(0, 0, "ID", "asc", "AND ID =" + ID)
      .subscribe(
        (data) => {
          this.pledgeLoandataaddressinfo = new Addressinfo();
          if (data["code"] == "200" && data["count"] > 0) {
            this.pledgeLoandataaddressinfo = data["data"][0];
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  getType(type) {
    var types = "";
    if (type) {
      var v = type.split(",");
      if (v.length == 2) {
        if (v[0] == "B" || v[1] == "B") types = types + " बागायीत";

        if (v[1] == "G" || v[0] == "G") types = types + " जिरायीत";
      } else {
        if (v[0] == "B") types = "बागायीत";
        else types = "जिरायीत";
      }
    }
    return types;
  }

  getLoanName2(id: number) {
    if (this.loanData.length > 0 && id != undefined && id > 0) {
      var loannames1 = this.loanData.filter((item) => item.ID == id);
      return loannames1[0]["NAME"];
    }
  }
  getLoanName3(id: number) {
    console.log(this.installmentFrequencyData);
    console.log(id);
    if (this.installmentFrequencyData != undefined) {
      if (
        this.installmentFrequencyData.length > 0 &&
        id != undefined &&
        id > 0
      ) {
        var loannames2 = this.installmentFrequencyData.filter(
          (item) => item.ID == id
        );
        return loannames2[0]["NAME"];
      }
    }
  }

  getwords() {
    this.loanInfo.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(
      this.loanInfo.LOAN_AMOUNT
    );
  }
  getword() {
    return this.amountinwords;
  }

  allProperties: Propertyinformation;

  addBar(str: string) {
    let strArray = []
    let BaredStr = ''
    if (str == '' || str == undefined) {
      return ' ';
    }
    else {
      strArray = str.split(' ');
      if (strArray.length == 1 || strArray.length == 0) {
        return str;
      }
      else {
        for (let i = 0; i < strArray.length; i++) {
          if (i != (strArray.length - 1)) {
            BaredStr += `${strArray[i]} | `
          }
          else {
            BaredStr += `${strArray[i]}`
          }
        }
      }
    }
    return BaredStr;

  }

  getAllprops2(prop): string {
    let propStr = ''
    if (prop.hasOwnProperty('addressinfo')) {
      if (prop.addressinfo.hasOwnProperty('R_S_NO')) {
        if (prop.addressinfo.R_S_NO != 0 && prop.addressinfo.R_S_NO != undefined) {
          propStr += `${prop.addressinfo.R_S_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('FLAT_NO')) {
        if (prop.addressinfo.FLAT_NO != 0 && prop.addressinfo.FLAT_NO != undefined) {
          propStr += `${prop.addressinfo.FLAT_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('TMC_NO')) {
        if (prop.addressinfo.TMC_NO != 0 && prop.addressinfo.TMC_NO != undefined) {
          propStr += `${prop.addressinfo.TMC_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('PLOT_NO')) {
        if (prop.addressinfo.PLOT_NO != 0 && prop.addressinfo.PLOT_NO != undefined) {
          propStr += `${prop.addressinfo.PLOT_NO}`
        }
      }

      if (prop.addressinfo.hasOwnProperty('E_SWATTU')) {
        if (prop.addressinfo.E_SWATTU != 0 && prop.addressinfo.E_SWATTU != undefined) {
          propStr += `${prop.addressinfo.E_SWATTU} `
        }
      }


      if (prop.addressinfo.hasOwnProperty('CTS_NO')) {
        if (prop.addressinfo.CTS_NO != 0 && prop.addressinfo.CTS_NO != undefined) {
          propStr += `${prop.addressinfo.CTS_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('VPC_NO')) {
        if (prop.addressinfo.VPC_NO != 0 && prop.addressinfo.VPC_NO != undefined) {
          propStr += `${prop.addressinfo.VPC_NO} `
        }
      }

      propStr = propStr.trim();
      propStr = this.addBar(propStr);

    }
    return propStr;
  }

  getAllprops(prop): string {
    let propStr = ''
    if (prop.hasOwnProperty('addressinfo')) {
      if (prop.addressinfo.hasOwnProperty('R_S_NO')) {
        if (prop.addressinfo.R_S_NO != 0 && prop.addressinfo.R_S_NO != undefined) {
          propStr += `${prop.addressinfo.R_S_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('SURVEY_NO')) {
        if (prop.addressinfo.SURVEY_NO != 0 && prop.addressinfo.SURVEY_NO != undefined) {
          propStr += `${prop.addressinfo.SURVEY_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('VPC_NO')) {
        if (prop.addressinfo.VPC_NO != 0 && prop.addressinfo.VPC_NO != undefined) {
          propStr += `${prop.addressinfo.VPC_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('CTS_NO')) {
        if (prop.addressinfo.CTS_NO != 0 && prop.addressinfo.CTS_NO != undefined) {
          propStr += `${prop.addressinfo.CTS_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('TMC_NO')) {
        if (prop.addressinfo.TMC_NO != 0 && prop.addressinfo.TMC_NO != undefined) {
          propStr += `${prop.addressinfo.TMC_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('E_SWATTU')) {
        if (prop.addressinfo.E_SWATTU != 0 && prop.addressinfo.E_SWATTU != undefined) {
          propStr += `${prop.addressinfo.E_SWATTU} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('FLAT_NO')) {
        if (prop.addressinfo.FLAT_NO != 0 && prop.addressinfo.FLAT_NO != undefined) {
          propStr += `${prop.addressinfo.FLAT_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('PLOT_NO')) {
        if (prop.addressinfo.PLOT_NO != 0 && prop.addressinfo.PLOT_NO != undefined) {
          propStr += `${prop.addressinfo.PLOT_NO}`
        }
      }

      propStr = propStr.trim();
      propStr = this.addBar(propStr);

    }

    return propStr;

  }

  getFourprops(prop): string {

    let propStr = ''
    if (prop.hasOwnProperty('addressinfo')) {
      if (prop.addressinfo.hasOwnProperty('VPC_NO')) {
        if (prop.addressinfo.VPC_NO != 0 && prop.addressinfo.VPC_NO != undefined) {
          propStr += `${prop.addressinfo.VPC_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('PLOT_NO')) {
        if (prop.addressinfo.PLOT_NO != 0 && prop.addressinfo.PLOT_NO != undefined) {
          propStr += `${prop.addressinfo.PLOT_NO}`
        }
      }

      if (prop.addressinfo.hasOwnProperty('CTS_NO')) {
        if (prop.addressinfo.CTS_NO != 0 && prop.addressinfo.CTS_NO != undefined) {
          propStr += `${prop.addressinfo.CTS_NO} `
        }
      }

      if (prop.addressinfo.hasOwnProperty('TMC_NO')) {
        if (prop.addressinfo.TMC_NO != 0 && prop.addressinfo.TMC_NO != undefined) {
          propStr += `${prop.addressinfo.TMC_NO} `
        }
      }

      propStr = propStr.trim();
      propStr = this.addBar(propStr);

    }

    return propStr;

  }

  loadAllPrimeInfo() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'";
    this.api.getAllPropertyInformation(0, 0, "ID", "asc", filter).subscribe(
      (data) => {
        if (data["code"] == "200" && data["count"] > 0) {
          this.allProperties = data["data"];
          this.primedataList = data["data"].filter(
            (item) => item.IS_MORTGAGED_FOR_SUB == 1
          );
          this.dataPropertyList5 = data["data"].filter(
            (item7) =>
              item7.IS_AGRICULTURE_LAND_OR_OTHER != "V" &&
              item7.IS_AGRICULTURE_LAND_OR_OTHER != "O"
          );

          this.dataPropertyList = data["data"];
          console.log("dataPropertyList", this.dataPropertyList);
          this.dataPropertyList2 = data["data"].filter(
            (item6) =>
              item6.IS_AGRICULTURE_LAND_OR_OTHER == "H" ||
              item6.IS_AGRICULTURE_LAND_OR_OTHER == "P" ||
              item6.IS_AGRICULTURE_LAND_OR_OTHER == "S"
          );
          this.dataPropertyList1 = data["data"].filter(
            (item5) => item5.IS_AGRICULTURE_LAND_OR_OTHER == "V"
          );
          console.log("dataPropertyList5", this.dataPropertyList5);
          console.log("dataPropertyList1", this.dataPropertyList1);
          for (let i = 0; i < this.dataPropertyList.length; i++) {
            filter = " AND ID=" + this.dataPropertyList[i].ADDRESS_ID;
            console.log("property filter1", filter);
            this.dataPropertyList[i]["addressinfo"] = new Addressinfo();
            this.api
              .getAllAddressInformation(0, 0, "ID", "desc", filter)
              .subscribe(
                (data2) => {
                  console.log("property", data2);
                  this.dataPropertyList[i]["addressinfo"] = data2["data"][0];
                },
                (err) => {
                  //console.log(err);
                }
              );
          }
          for (let i = 0; i < this.dataPropertyList2.length; i++) {
            filter = " AND ID=" + this.dataPropertyList2[i].ADDRESS_ID;
            console.log("property filter2", filter);
            this.dataPropertyList2[i]["addressinfo"] = new Addressinfo();
            this.api
              .getAllAddressInformation(0, 0, "ID", "desc", filter)
              .subscribe(
                (data2) => {
                  console.log("property", data2);
                  this.dataPropertyList2[i]["addressinfo"] = data2["data"][0];
                },
                (err) => {
                  //console.log(err);
                }
              );
          }
        } else {
          this.dataPropertyList = [
            new Propertyinformation(),
            new Propertyinformation(),
          ];
          this.dataPropertyList[0]["addressinfo"] = new Addressinfo();
          this.dataPropertyList[1]["addressinfo"] = new Addressinfo();
          this.dataPropertyList1 = [
            new Propertyinformation(),
            new Propertyinformation(),
          ];
          this.dataPropertyList1[0]["addressinfo"] = new Addressinfo();
          this.dataPropertyList1[1]["addressinfo"] = new Addressinfo();
          this.dataPropertyList2 = [
            new Propertyinformation(),
            new Propertyinformation(),
          ];
          this.dataPropertyList2[0]["addressinfo"] = new Addressinfo();
          this.dataPropertyList2[1]["addressinfo"] = new Addressinfo();
          this.dataPropertyList5 = [
            new Propertyinformation(),
            new Propertyinformation(),
          ];
          this.dataPropertyList5[0]["addressinfo"] = new Addressinfo();
          this.dataPropertyList5[1]["addressinfo"] = new Addressinfo();
          this.datajoint = [new JointAccount(), new JointAccount()];
          this.datajoint[0]["addressinfo11"] = new Addressinfo();
          this.primedataList = [
            new Propertyinformation(),
            new Propertyinformation(),
          ];
        }

        if (this.primedataList.length == 0)
          this.primedataList = [
            new Propertyinformation(),
            new Propertyinformation(),
          ];
      },
      (err) => {
        if (err["ok"] == false) this.message.error("Server Not Found", "");
      }
    );

    // this.api.getAllPropertyInformation(0, 0, 'ID', "asc", filter).subscribe(data => {
    //   if (data['code'] == "200" && data['count'] > 0) {
    //     this.primedataList = data['data'].filter((item) => item.IS_MORTGAGED_FOR_SUB == 1);
    //     this.property = data['data'];

    //     console.log(this.property)

    //   }

    // }, err => {
    //   if (err['ok'] == false)
    //     this.message.error("Server Not Found", "");
    // });
  }

  getsisData() {
    this.api
      .getAllSisterOrAssociateConcern(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCodes) => {
        if (successCodes["code"] == "200" && successCodes["count"] > 0) {
          this.dataSisList = successCodes["data"];
        } else {
        }
      });

    this.api
      .getAllPartnersInformation(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCode) => {
        this.dataPartnerList = [];
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataPartnerList = successCode["data"];
        } else {
        }
      });

    this.api
      .getAllConstitutes(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCode) => {
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataListConstitutes = successCode["data"].filter(
            (item) => item.TYPE == "O"
          );
          this.dataConstiList = successCode["data"].filter(
            (item) => item.TYPE == "N"
          );
        }
      });
    this.api
      .getAllPartnersInformation(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCode) => {
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataListss = successCode["data"];
        }
      });
    this.api
      .getAllAddressInformation(
        0,
        0,
        "ID",
        "asc",
        "AND ID =" + this.data2.REGISTERED_OFFICE_ADDRESS_ID
      )
      .subscribe(
        (data) => {
          this.addressinfoBussiness = new Addressinfo();
          if (data["code"] == 200 && data["count"] > 0) {
            this.addressinfoBussiness = data["data"][0];
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  getincomeData() {
    this.otherIncomSource = 0;
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'";
    this.api.getAllIncomeInformation(0, 0, "ID", "asc", filter).subscribe(
      (data) => {
        if (data["code"] == "200" && data["count"] > 0) {
          this.incomeInfo = data["data"][0];
          console.log("THIS IS INCOME INFORMATION ::::::::::::::::::::::::::", this.incomeInfo)
          if (
            this.incomeInfo.IS_SALARY
          ) {
            this.getsalaryData();
          }

          if (
            this.incomeInfo.IS_BUSINESS
          ) {
            this.getbusData();
          }
          if (
            this.incomeInfo.IS_HOUSE
          ) {
            this.house1();
          }
          if (
            this.incomeInfo.IS_OTHER
          ) {
            this.Info();
          }

          // gethere
          // this.Info();
          // this.expenditure1();

          // this.getbusData();
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  house1() {
    this.api
      .getAllHouseRentInfo(
        1,
        20,
        "ID",
        "asc",
        "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
      )
      .subscribe((data1) => {

        if (data1["count"] > 0) {
          this.houserent = data1["data"][0];

          this.allHouse = data1['data'];

          if (this.houserent.ADDRESS_ID > 0) {
            this.api.getAllAddressInformation(
              0,
              0,
              "ID",
              "asc",
              "AND ID =" + this.houserent.ADDRESS_ID
            )
              .subscribe(
                (data) => {
                  if (data["code"] == "200") {
                    if (data["count"] > 0) {
                      this.addressinfoHouse = data["data"][0];
                      console.log("addressinfoHouse", this.addressinfoHouse);
                    }
                  }
                },
                (err) => {
                  //console.log(err);
                }
              );
          } else this.addressinfoHouse = new Addressinfo();
        }
      });
  }
  expenditure1() {
    this.api
      .getAllExpenditureInformation(
        0,
        0,
        "ID",
        "asc",
        "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
      )
      .subscribe((data) => {
        // this.loadingRecords2 = false;
        this.addressinfoExpenditure = new Addressinfo();
        if (data["count"] > 0) {
          this.expenditure = data["data"][0];
          this.addressinfoExpenditure = data["data"][0];
          // this.expenditure.AGRICULTURE= data['data']['AGRICULTURE']
          // this.expenditure.MISCELLANEOUS= data['data']['MISCELLANEOUS']

          console.log(this.expenditure);
          // this.dataList29 = successCode['data'];
        }
      });
  }


  Info() {

    this.allOther = []
    this.allAgriculture = []

    this.api
      .getAllAgricultureInformation(
        0,
        0,
        "ID",
        "asc",
        "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
      ).subscribe(successCode => {
        // this.addressinfoAgri = new Addressinfo();
        if (successCode['count'] > 0) {
          // this.addressinfoAgri = successCode["data"][0];

          let agri = [];
          agri = successCode['data'];
          console.log('agri data : ', successCode['data']);
          for (let i = 0; i < agri.length; i++) {
            if (agri[i].ANNUAL_INCOME_FROM_THIS_LAND != null) {
              // this.dataList2.push(agri[i]);

              this.allOther.push(agri[i])

            }
            else {

              this.allAgriculture.push(agri[i])

              this.agriinfooo = agri[i];
              this.agriInfo13 = agri[i]["TOTAL"];
            }
          }

          // if (this.agriculture.ADDRESS_ID > 0) {
          //   this.api.getAllAddressInformation(
          //       0,
          //       0,
          //       "ID",
          //       "asc",
          //       "AND ID =" + this.agriculture.ADDRESS_ID
          //     )
          //     .subscribe(
          //       (data) => {
          //         if (data["code"] == "200") {
          //           if (data["count"] > 0) {
          //             this.addressinfoHouse = data["data"][0];
          //             console.log("addressinfoHouse", this.addressinfoHouse);
          //           }
          //         }
          //       },
          //       (err) => {
          //         //console.log(err);
          //       }
          //     );
          // } else this.addressinfoHouse = new Addressinfo();



        }
      });
    // .subscribe((data1) => {
    //   // this.loadingRecords2 = false;
    //   if (data1["count"] > 0) {

    //     this.agriinfooo = data1["data"][0];
    //     this.agriInfo13 = data1["data"][0]["TOTAL"];
    //     console.log(this.agriInfo13, "agriInfo13");
    //     // console.log(this.Agri);
    //   }
    // });
  }



  getsalaryData() {
    this.api
      .getAllSalariedInformation(
        0,
        0,
        "ID",
        "asc",
        "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
      )
      .subscribe(
        (data) => {
          if (data["count"] > 0) {
            this.dataSalary = data["data"][0];

            this.allSalary = data['data'];


            console.log("dataSalary", this.dataSalary);
            if (this.dataSalary.CONTACT_NO_OF_EMPLOYER != "") {
              // this.pan = this.dataSalary.CONTACT_NO_OF_EMPLOYER.split("");
            }

            this.api
              .getAllAddressInformation(
                0,
                0,
                "ID",
                "asc",
                "AND ID =" + this.dataSalary.PLACE_OF_EMPLOYMENT
              )
              .subscribe(
                (data) => {
                  if (data["code"] == "200") {
                    if (data["count"] != 0) {
                      this.addressinfoSalary = data["data"][0];
                      console.log("addressinfoSalary", this.addressinfoSalary);
                    }
                  }
                },
                (err) => {
                  //console.log(err);
                }
              );
          } else {
            this.count = 0;
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  getbusData() {
    this.api
      .getAllBusinessInformation(
        0,
        0,
        "ID",
        "asc",
        "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
      )
      .subscribe((data1) => {
        if (data1["count"] > 0) {
          this.dataBList1 = data1["data"][0];

          this.allBusiness = data1['data']

          // this.dataBList1=data1['data'][0]['INCOME_YEARLY']
          console.log(this.dataBList1);
          this.sum1 = 0;

          this.sum1 = this.sum1 + Number(this.dataBList1["INCOME_YEARLY"]);
          // this.Tredincome=this.sum1
          console.log(this.sum1, "Tredincome");

          // console.log(this.sum1,"Tredincome");

          if (this.dataBList1.ADDRESS_ID > 0) {
            this.api
              .getAllAddressInformation(
                0,
                0,
                "ID",
                "asc",
                "AND ID =" + this.dataBList1.ADDRESS_ID
              )
              .subscribe(
                (data) => {
                  if (data["code"] == "200" && data["count"] > 0) {
                    this.addressinfoBBussiness = data["data"][0];
                  }
                },
                (err) => { }
              );
          } else this.addressinfoBBussiness = new Addressinfo();
        }
      });
  }

  getd(datas: any): void {
    this.dataLists = datas;
    for (let i = 0; i < this.dataLists.length; i++) {
      this.api
        .getAllAddressInformation(
          0,
          0,
          "ID",
          "asc",
          "AND ID =" + this.dataLists[i].ADDRESS_ID
        )
        .subscribe(
          (data) => {
            if (data["code"] == "200" && data["count"] > 0) {
              this.addressinfoBBussiness = data["data"][0];
            }
          },
          (err) => {
            //console.log(err);
          }
        );
    }
  }

  getname(values) {
    if (values) {
      var v = values.split(",");
      var string = "";
      if (v.length == 2) {
        if (v[0] == "B" || v[1] == "B") string = string + "बागायत";

        if (v[1] == "G" || v[0] == "G") string = string + ", जिरायत";
      } else {
        if (v[0] == "B") string = "बागायत";
        else string = "जिरायत";
      }

      return string;
    } else {
      return "";
    }
  }

  // changeIncomeSource(incomeSourceId) {
  //   this.incomeTypeData2 = [];
  //   this.incomeTypeData2 = this.incomeTypeData.filter(
  //     (item) => item.ID !== this.incomeInfo.INCOME_SOURCE_ID
  //   );
  //   this.incomeTypeData2.splice(0, 0, {
  //     ID: 0,
  //     NAME: "इतर उत्पन्नाचे साधन नाही",
  //   });
  //   sessionStorage.setItem("incomesourceId", incomeSourceId);
  //   //console.log(this.incomeInfo.OTHER_INCOME_SOURCE_ID)
  //   this.changeOtherIncomeSource(this.incomeInfo.OTHER_INCOME_SOURCE_ID);
  //   if (this.incomeInfo.INCOME_SOURCE_ID == 1) {
  //     this.getsalaryData();
  //   }

  //   if (this.incomeInfo.INCOME_SOURCE_ID == 2) {
  //     this.getbusData();
  //   }
  // }

  // changeOtherIncomeSource(otherincomeSourceId) {
  //   this.incomeTypeData3 = [];
  //   this.incomeTypeData3 = this.incomeTypeData.filter(
  //     (item) =>
  //       item.ID !== this.incomeInfo.INCOME_SOURCE_ID &&
  //       item.ID !== this.incomeInfo.OTHER_INCOME_SOURCE_ID
  //   );
  //   this.incomeTypeData3.splice(0, 0, {
  //     ID: 0,
  //     NAME: "इतर उत्पन्नाचे साधन नाही",
  //   });
  //   sessionStorage.setItem("otherincomesourceId", otherincomeSourceId);
  //   this.changeOtherIncomeSource2(this.incomeInfo.OTHER_INCOME_SOURCE_ID2);
  //   if (this.incomeInfo.OTHER_INCOME_SOURCE_ID == 1) {
  //     this.getsalaryData();
  //   }

  //   if (
  //     this.incomeInfo.OTHER_INCOME_SOURCE_ID == 2 ||
  //     this.incomeInfo.OTHER_INCOME_SOURCE_ID == 4
  //   ) {
  //     this.getbusData();
  //   }
  //   if (this.incomeInfo.OTHER_INCOME_SOURCE_ID == 5) {
  //     this.api
  //       .getAllAgricultureInformation(
  //         1,
  //         20,
  //         "ID",
  //         "asc",
  //         "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
  //       )
  //       .subscribe((successCode) => {
  //         if (successCode["count"] > 0) {
  //           this.agridataList = successCode["data"];
  //         }
  //       });
  //   }
  // }

  // changeOtherIncomeSource2(otherIncomeSourceId2) {
  //   sessionStorage.setItem("otherincomesourceId2", otherIncomeSourceId2);

  //   if (this.incomeInfo.OTHER_INCOME_SOURCE_ID2 == 1) {
  //     this.getsalaryData();
  //   }

  //   if (
  //     this.incomeInfo.OTHER_INCOME_SOURCE_ID2 == 2 ||
  //     this.incomeInfo.OTHER_INCOME_SOURCE_ID2 == 4
  //   ) {
  //     this.getbusData();
  //   }

  //   if (this.incomeInfo.OTHER_INCOME_SOURCE_ID2 == 5) {
  //     this.api
  //       .getAllAgricultureInformation(
  //         1,
  //         20,
  //         "ID",
  //         "asc",
  //         "AND INCOME_INFORMATION_ID = " + this.incomeInfo.ID
  //       )
  //       .subscribe((successCode) => {
  //         if (successCode["count"] > 0) {
  //           this.agridataList = successCode["data"];
  //         }
  //       });
  //   }
  // }

  getAllLoanTakenInformation(creditID) {
    this.api
      .getAllLoanTakenInformation(
        0,
        0,
        "ID",
        "asc",
        "AND CREDIT_INFORMATION_ID = " + creditID + " AND ARCHIVE_FLAG = 'F'"
      )
      .subscribe((successCode) => {
        // this.dataList11 = [];
        // if (successCode['code'] == "200" && successCode['count'] > 0) {
        //   this.dataList11 = successCode['data'];
        // this.dataList12 = successCode['data'].filter((item) => item.IS_SELECTED == true);
        // if (this.dataList12.length == 0) {
        //   this.dataList12 = [new BankLoan()];
        // }

        // this.dataList11.forEach((item, index) => {
        //   this.amount = this.amount + item.SANCTIONED_AMOUNT;
        //   this.creditdata.OUTSTANDING_BANK_AMOUNT = this.creditdata.OUTSTANDING_BANK_AMOUNT + item.LOAN_OUTSTANDING;
        // });
        // } else {
        //   this.dataList11 = [new BankLoan(), new BankLoan()];
        // }

        this.dataLTList11 = [];
        this.LoanTakenList = [];
        this.dataLTList6 = [];

        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataLTList11 = successCode["data"];
          this.LoanTakenList = successCode["data"].filter(
            (item) => item.IS_SUB == 1
          );

          this.sanctionamount = 0;
          for (let i = 0; i < this.LoanTakenList.length; i++) {
            this.sanctionamount =
              this.sanctionamount +
              Number(this.LoanTakenList[i]["SANCTIONED_AMOUNT"]);

            // this.amount24 = this.amount24 + Number(this.dataList[i]['LOAN_OUTSTANDING'])

            console.log(this.sanctionamount, "this.sanctionamount");
          }
          this.dataLTList6 = successCode["data"].filter(
            (item) => item.IS_SUB == 0
          );
          console.log(this.dataLTList6);
        }

        if (this.LoanTakenList.length == 0) {
          this.LoanTakenList = [new BankLoan(), new BankLoan()];
        }

        if (this.dataLTList6.length == 0) {
          this.dataLTList6 = [new BankLoan(), new BankLoan()];
        }
      });
  }

  NameOfVerifyingOfficer: string = "";
  DateOfVerification: string = "";
  loadsubproperty() {
    this.api
      .getAllSubPropertyInformation(
        0,
        0,
        "ID",
        "desc",
        " AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe((data1) => {
        if (data1["count"] > 0) {
          this.subproperty = Object.assign({}, data1["data"][0]);
          this.NameOfVerifyingOfficer =
            this.subproperty.NAME_OF_VERIFYING_OFFICER;
          this.DateOfVerification = this.subproperty.DATE_OF_VERIFICATION;
          console.log(this.subproperty);
        }
      });
  }
  totalOutStanding_otherBank = 0;
  allLoaninfo = [];
  loadcreditdata() {
    this.allLoaninfo = [];
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'";
    this.api.getAllCreditInformation(0, 0, "ID", "asc", filter).subscribe(
      (data) => {
        this.creditdata = new Creditinformation();
        this.creditdata.OUTSTANDING_BANK_AMOUNT = 0;
        this.amount = 0;
        if (data["count"] > 0) {
          this.creditdata = Object.assign({}, data["data"][0]);
          this.api
            .getAllLoanTakenInformation(
              0,
              0,
              "ID",
              "asc",
              "AND CREDIT_INFORMATION_ID = " +
              this.creditdata.ID +
              " AND ARCHIVE_FLAG = 'F'"
            )
            .subscribe((successCode) => {
              this.dataList1 = [];
              if (successCode["code"] == "200" && successCode["count"] > 0) {
                this.dataList11 = successCode["data"];
                console.log("dataList11 : ", this.dataList11);
                this.dataList12 = successCode["data"].filter(
                  (item) => item.IS_SELECTED == true
                );
                console.log("dataList12 : ", this.dataList12);
                if (this.dataList12.length == 0) {
                  this.dataList12 = [new BankLoan()];
                }
                this.creditdata.OUTSTANDING_BANK_AMOUNT = 0;
                this.amount = 0;
                this.dataList11.forEach((item, index) => {
                  this.amount = this.amount + item.SANCTIONED_AMOUNT;
                  this.creditdata.OUTSTANDING_BANK_AMOUNT =
                    this.creditdata.OUTSTANDING_BANK_AMOUNT +
                    item.LOAN_OUTSTANDING;
                });
              } else {
                this.dataList11 = [new BankLoan(), new BankLoan()];
              }

              this.dataLTList11 = [];
              this.LoanTakenList = [];
              this.dataLTList6 = [];

              if (successCode["code"] == "200" && successCode["count"] > 0) {
                this.dataLTList11 = successCode["data"];
                this.LoanTakenList = successCode["data"].filter(
                  (item) => item.IS_SUB == 1
                );
                this.LoanTakenList_otherBank = successCode["data"].filter(
                  (item) => item.IS_SUB == 0
                );
                for (let i of this.LoanTakenList) {
                  this.allLoaninfo.push(i);
                }

                console.log("LoanTakenList : ", this.LoanTakenList);
                console.log(
                  "LoanTakenList_otherBank : ",
                  this.LoanTakenList_otherBank
                );
                this.sanctionamount = 0;
                this.amount245 = 0;
                this.totalOutStanding_otherBank = 0;
                for (let i = 0; i < this.LoanTakenList.length; i++) {
                  this.sanctionamount =
                    this.sanctionamount +
                    Number(this.LoanTakenList[i]["SANCTIONED_AMOUNT"]);
                  this.loantypee12 = this.LoanTakenList[i]["LOAN_TYPE_NAME_EN"];
                  this.amount245 =
                    this.amount245 +
                    Number(this.LoanTakenList[i]["LOAN_OUTSTANDING"]);

                  console.log(this.sanctionamount, "this.sanctionamount");
                }

                for (let i = 0; i < this.LoanTakenList_otherBank.length; i++) {
                  this.totalOutStanding_otherBank =
                    this.totalOutStanding_otherBank +
                    Number(this.LoanTakenList_otherBank[i]["LOAN_OUTSTANDING"]);
                }

                this.dataLTList6 = successCode["data"].filter(
                  (item) => item.IS_SUB == 0
                );
              }
              if (this.LoanTakenList.length == 0) {
                this.LoanTakenList = [new BankLoan(), new BankLoan()];
              }
              if (this.dataLTList6.length == 0) {
                this.dataLTList6 = [new BankLoan(), new BankLoan()];
              }
            });

          this.api
            .getAllGuarantorForLoans(
              0,
              0,
              "ID",
              "asc",
              "AND CREDIT_INFORMATION_ID = " +
              this.creditdata.ID +
              " AND ARCHIVE_FLAG = 'F'"
            )
            .subscribe((successCode) => {
              this.dataGList2 = [];
              this.dataGList7 = [];

              if (successCode["code"] == "200" && successCode["count"] > 0) {
                this.dataGList2 = successCode["data"].filter(
                  (item) => item.IS_SUB == 1
                );
                console.log("dataGList2", this.dataGList2);
                this.dataGList7 = successCode["data"].filter(
                  (item) => item.IS_SUB == 0
                );
              }
              if (this.dataGList2.length == 0) {
                this.dataGList2 = [

                ];
              }
            });

          this.api
            .getAllDepositsInBank(
              0,
              0,
              "ID",
              "asc",
              "AND CREDIT_INFORMATION_ID = " +
              this.creditdata.ID +
              " AND ARCHIVE_FLAG = 'F'"
            )
            .subscribe((successCode) => {
              this.dataGList4 = [];
              if (successCode["code"] == "200" && successCode["count"] > 0) {
                this.dataGList4 = successCode["data"];
              } else {
                this.dataGList4 = [new DepositeInBank(), new DepositeInBank()];
              }
              if (this.dataGList4.length == 0) {
                this.dataGList4 = [new DepositeInBank(), new DepositeInBank()];
              }
            });

          this.api
            .getAllEarlierLoanHistory(
              0,
              0,
              "ID",
              "asc",
              "AND CREDIT_INFORMATION_ID = " +
              this.creditdata.ID +
              " AND ARCHIVE_FLAG = 'F'"
            )
            .subscribe((successCode) => {
              this.dataGList5 = [];
              this.dataGList9 = [];

              if (successCode["code"] == "200" && successCode["count"] > 0) {
                this.dataGList5 = successCode["data"].filter(
                  (item) => item.IS_SUB == 1
                );
                for (let i of this.dataGList5) {
                  this.allLoaninfo.push(i);
                }

                console.log("all loan info", this.allLoaninfo);
                console.log(this.allLoaninfo);
                this.sanctionamount1 = 0;
                this.arrayIndex2 = this.dataGList5.length - 1;
                for (let i = 0; i < this.dataGList5.length; i++) {
                  this.sanctionamount1 =
                    this.sanctionamount1 +
                    Number(this.dataGList5[i]["LOAN_AMOUNT"]);

                  this.loantypee = this.dataGList5[i]["LOAN_TYPE_NAME_EN"];
                  this.amount24 =
                    this.amount24 +
                    Number(this.dataGList5[i]["LOAN_OUTSTANDING"]);

                  console.log(this.sanctionamount1, "this.sanctionamount1");

                  // console.log(this.amount24);
                }

                this.dataGList9 = successCode["data"].filter(
                  (item) => item.IS_SUB == 0
                );
              } else {
                this.dataGList5 = [
                  new EarlierLoanInfo(),
                  new EarlierLoanInfo(),
                ];
              }
              if (this.dataGList5.length == 0) {
                this.dataGList5 = [
                  new EarlierLoanInfo(),
                  new EarlierLoanInfo(),
                ];
              }
            });
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  income = 0;
  // sum=0

  // house1 = localStorage.getItem('house')
  loadFinanceData() {
    this.api
      .getFinancialInformation(this.PROPOSAL_ID, "B", this.APPLICANT_ID)
      .subscribe(
        (data) => {
          if (data["code"] == 200 && data["data"] != null) {
            this.dataCode = data["code"];
            this.financialData = data["data"][0];
            console.log("financialData : ", this.financialData);
            this.dataListterm = this.financialData["TERM_DEPOSIT"];
            this.dataListrecuring = this.financialData["RECURING_DEPOSIT"];
            this.dataListcurrent = this.financialData["CURRENT_DEPOSIT"];

            // this.financialData.LAST_3_YEAR_INFORMATION = data['data'][0]['LAST_3_YEAR_INFORMATION']
            // this.year1 = this.financialData.LAST_3_YEAR_INFORMATION[0]['FINANCIAL_YEAR']
            // this.year2 = this.financialData.LAST_3_YEAR_INFORMATION[1]['FINANCIAL_YEAR']
            // this.year3 = this.financialData.LAST_3_YEAR_INFORMATION[2]['FINANCIAL_YEAR']
            // this.calculate(0)
            // this.calculate(1)
            // this.calculate(2)
            // this.calculateTotal(0)
            // this.calculateTotal(1)
            // this.calculateTotal(2)
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  calculate(index) {
    if (index == 0) {
      this.total[index] = 0;
      this.total[index] =
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[33]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[36]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[39]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[42]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[45]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[48]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[51]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[54]["INCOME_AMOUNT"]
        ) +
        Number(this.financialData.LAST_3_YEAR_INFORMATION[57]["INCOME_AMOUNT"]);
    }

    if (index == 1) {
      this.total[index] = 1;
      this.total[index] =
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[34]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[37]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[40]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[43]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[46]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[49]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[52]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[55]["INCOME_AMOUNT"]
        ) +
        Number(this.financialData.LAST_3_YEAR_INFORMATION[58]["INCOME_AMOUNT"]);
    }

    if (index == 2) {
      this.total[index] = 2;
      this.total[index] =
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[35]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[38]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[41]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[44]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[47]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[50]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[53]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[56]["INCOME_AMOUNT"]
        ) +
        Number(this.financialData.LAST_3_YEAR_INFORMATION[59]["INCOME_AMOUNT"]);
    }
  }

  calculateTotal(index) {
    if (index == 0) {
      this.total1[index] = 0;
      this.total1[index] =
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[60]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[63]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[66]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[69]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[72]["INCOME_AMOUNT"]
        ) +
        Number(this.financialData.LAST_3_YEAR_INFORMATION[75]["INCOME_AMOUNT"]);
    }

    if (index == 1) {
      this.total1[index] = 1;
      this.total1[index] =
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[61]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[64]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[67]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[70]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[73]["INCOME_AMOUNT"]
        ) +
        Number(this.financialData.LAST_3_YEAR_INFORMATION[76]["INCOME_AMOUNT"]);
    }

    if (index == 2) {
      this.total1[index] = 2;
      this.total1[index] =
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[62]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[65]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[68]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[71]["INCOME_AMOUNT"]
        ) +
        Number(
          this.financialData.LAST_3_YEAR_INFORMATION[74]["INCOME_AMOUNT"]
        ) +
        Number(this.financialData.LAST_3_YEAR_INFORMATION[77]["INCOME_AMOUNT"]);
    }
  }

  getData1() {
    this.api
      .getAllManagementOfSalesInformation(
        0,
        0,
        "ID",
        "asc",
        "AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == "200" && data["count"] > 0) {
            this.ManagementOfSales = data["data"];
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    this.api
      .getAllManufacturingInfromation(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCode) => {
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataList1 = successCode["data"];
        }
      });

    this.api
      .getAllCostInformation(
        0,
        0,
        "ID",
        "asc",
        "AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200 && data["count"] > 0) {
            this.costdata = data["data"];
          }
        },
        (err) => {
          //console.log(err);
        }
      );

    this.api
      .getAllMeansInformation(
        0,
        0,
        "ID",
        "asc",
        "AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data2) => {
          if (data2["code"] == 200 && data2["count"] > 0) {
            this.meansdata = data2["data"];
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    this.getNote();
  }

  getNote() {
    this.api
      .getAllProjectionsInformation(
        0,
        0,
        "ID",
        "asc",
        "AND PROPOSAL_ID=" + this.PROPOSAL_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200 && data["count"] > 0) {
            this.ProjectionInfo = data["data"][0];
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  getData4() {
    // this.loadingRecords4 = true;
    this.api
      .getAllFactoryUnitInformation(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCode) => {
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataList4 = successCode["data"];
        }
      });
  }

  getData5() {
    this.api
      .getAllDetailsOfEmployee(
        0,
        0,
        "ID",
        "asc",
        "AND FIRM_INFORMATION_ID = " + this.data2.ID
      )
      .subscribe((successCode) => {
        if (successCode["code"] == "200" && successCode["count"] > 0) {
          this.dataList5 = successCode["data"];
        }
      });
  }

  loadInfo() {
    let filter =
      " AND EXTRA_INFORMATION_ID=12 AND PROPOSAL_ID=" + this.PROPOSAL_ID;
    this.api
      .getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter)
      .subscribe(
        (data) => {
          this.extraApplicantInformation = data["data"][0];
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  getdata() {
    //console.log("this.GdataList")
    this.api.getGuarantorsInformation(this.PROPOSAL_ID).subscribe(
      (data) => {
        if (data["code"] == 200 && data["data"].length > 0) {
          this.GdataList = data["data"];
          this.getGarantorsData();
        } else {
          this.GdataList = [new Gurantorinfo(), new Gurantorinfo()];
        }
      },
      (err) => {
        //console.log(err);
      }
    );

    // this.api.getAllCoborrowerInformation(0, 0, "ID", "asc", "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND VISIBILITY=1").subscribe(data => {
    //   if (data['code'] == 200 && data['count'] > 0) {
    //     this.dataList = data['data'];
    //     this.loadAllExtraInformationMapped2()
    //   } else {
    //     this.CBdataList = [new Personalinformation(), new Personalinformation()];
    //   }
    // }, err => {
    //   //console.log(err);
    // });
  }

  isvisible2(i, data) {
    for (var index = 1; index <= 6; index++) {
      var ok = false;
      data.find((data) => {
        if (data.EXTRA_INFORMATION_ID == index) {
          ok = true;
        }
      });
      if (ok) {
        this.visible2[index] = true;
      } else this.visible2[index] = false;
    }
  }

  loadAllExtraInformationMapped2() {
    this.CBdataList = [];
    this.dataList.forEach((item, index) => {
      this.api
        .getAddressInfo(this.PROPOSAL_ID, "C", item.APPLICANT_ID)
        .subscribe(
          (data) => {
            if (data["code"] == 200 && data["data"].length > 0) {
              this.CBdataList.push(data["data"][0]);
            }
          },
          (err) => {
            //console.log(err);
          }
        );
      // this.applicantId2 = item.APPLICANT_ID
      let filter =
        " AND PROPOSAL_ID=" +
        this.PROPOSAL_ID +
        " AND APPLICANT_ID=" +
        item.APPLICANT_ID +
        " AND TYPE='C'";
      this.api
        .getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter)
        .subscribe(
          (data) => {
            if (data["count"] > 0) {
              // this.IndivisualInfotabs2 = data['data'];
              this.isvisible2(index, data["data"]);
              // if (data1.PRAPOSAL_TYPE == "वैयक्तिक") {
              //   this.PROPOSAL_TYPE = "1"
              //   sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
              //   this.api.getAddressInfo(this.PROPOSAL_ID, "C", this.applicantId).subscribe(data => {

              //     if (data['code'] == 200) {
              //       this.personalInfo2 = Object.assign({}, data['data'][0]);
              //       this.personalInfo2.MOBILE_NO1 = data1.MOBILE_NUMBER
              //       sessionStorage.setItem("personalMobile2", this.personalInfo2.MOBILE_NO1)
              //       this.personalInformationId2 = this.personalInfo2.ID
              //       this.addressinfoCurrent2 = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              //       this.addressinfoPermanent2  = new Addressinfo()
              //       this.familyDeatails2 = []
              //       if (this.personalInfo2.DOB != "") {
              //         this.personalinfo2.onChange(this.personalInfo.DOB)
              //       }
              //       this.personalinfo2.loadInfo(this.PROPOSAL_ID, this.applicantId)
              //     }
              //   }, err => {
              //     //console.log(err);
              //   });
              // }
              // else {
              //   this.api.getAddressInfo(this.PROPOSAL_ID, "C", this.applicantId).subscribe(data => {

              //     if (data['code'] == 200) {
              //       this.personalInfo2 = Object.assign({}, data['data'][0]);
              //       this.personalInformationId2 = this.personalInfo2.ID
              //       this.addressinfoCurrent2 = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              //       this.addressinfoPermanent2 = new Addressinfo()
              //       this.familyDeatails2 = []
              //       if (this.personalInfo2.DOB != "") {
              //         this.personalinfo2.onChange(this.personalInfo2.DOB)
              //         this.personalinfo2.loadInfo(this.PROPOSAL_ID, this.applicantId)
              //       }

              //     }
              //   }, err => {
              //     //console.log(err);
              //   });
              //   this.PROPOSAL_TYPE = "2"
              //   sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
              //   // this.index=0
              // }
            } else {
              // this.IndivisualInfotabs = []
              // sessionStorage.setItem("PRAPOSAL_TYPE", "0")
            }
          },
          (err) => {
            //console.log(err);
          }
        );
    });
  }

  getGarantorsData() {
    for (var i = 0; i < this.GdataList.length; i++) {
      var ind = i;
      this.gdataLists = [new BusinessInfo()];
      this.gdataLists[0]["gaddressinfoBBussiness"] = new Addressinfo();
      if (
        this.GdataList[i]["INCOME_INFORMATION"][0]["BUSINESS_FIRM_INFORMATION"]
          .length > 0
      ) {
        this.gdataLists[0] =
          this.GdataList[i]["INCOME_INFORMATION"][0][
          "BUSINESS_FIRM_INFORMATION"
          ][0];
        this.gdataLists[0]["gaddressinfoBBussiness"] =
          this.gdataLists[0]["ADDRESS"][0];
      }
      this.GdataList2[ind].gdataLists = this.gdataLists;

      this.GdataList2[ind].gpersonalInfo =
        this.GdataList[i]["PERSONAL_INFORMATION"][0];
      var gaddress = JSON.parse(
        this.GdataList[i]["PERSONAL_INFORMATION"][0]["CURRENT_ADDRESS"]
      );
      this.GdataList2[ind].gaddressinfoCurrent = gaddress[0];

      this.gfinancialData = new Financialinformation();
      this.gfinancialData = this.GdataList[i]["FINANCIAL_INFORMATION"][0];
      this.GdataList2[ind].gfinancialData = this.gfinancialData;

      if (
        this.GdataList[i]["INCOME_INFORMATION"][0]["SALARIED_INFORMATION"]
          .length > 0
      ) {
        this.GdataList2[ind].gdataSalary =
          this.GdataList[i]["INCOME_INFORMATION"][0]["SALARIED_INFORMATION"][0];
        console.log(this.GdataList2[ind].gdataSalary["ADDRESS"][0]);
      }

      this.gincomeTypeData = this.incomeTypeData.filter(
        (item) =>
          item.ID ==
          this.GdataList[i]["INCOME_INFORMATION"][0]["INCOME_SOURCE_ID"]
      );

      this.GdataList2[ind].gincomeTypeData = this.gincomeTypeData;
      if (
        this.GdataList[i]["INCOME_INFORMATION"][0][
          "AGRICULTURE_LAND_INFORMATION"
        ].length > 0
      ) {
        this.GdataList2[ind].gagridataList =
          this.GdataList[i]["INCOME_INFORMATION"][0][
          "AGRICULTURE_LAND_INFORMATION"
          ];
      }
      this.GdataList2[ind].gcreditdata =
        this.GdataList[i]["CREDIT_INFORMATION"][0];

      this.gloadAllPrimeInfo(this.GdataList[i]["PROPERTY_INFORMATION"], i);
    }
  }

  // getNewGarantorData() {
  //   for (var i = 0; i < this.GndataList.length; i++) {
  //     var ind = i;

  //     this.GndataList[ind].gpersonalInfo =
  //       this.GnewdataList[i]["PERSONAL_INFORMATION"][0];
  //     var gNewaddress = JSON.parse(
  //       this.GnewdataList[i]["PERSONAL_INFORMATION"][0]["CURRENT_ADDRESS"]
  //     );
  //     // this.GndataList[ind].gaddressinfoCurrent = gNewaddress[0];

  //     this.getGpropetyInfo(this.GnewdataList[i]["PROPERTY_INFORMATION"], i);

  //   }
  // }

  // getGpropetyInfo(data, a){
  //   this.gNewPropList2 = data;

  //   // if (this.gNewPropList2.length > 0) {
  //   //   for (let i = 0; i < this.gNewPropList2.length; i++) {
  //   //     this.gNewPropList2[i]["addressinfo"] = new Addressinfo();
  //   //     if (this.gNewPropList2[i]["ADDRESS_ID"] > 0)
  //   //       var gaddress = JSON.parse(this.gNewPropList2[i]["ADDRESS"]);
  //   //     this.gNewPropList2[i]["addressinfo"] = gaddress[0];
  //   //   }
  //   // }

  //   if (this.gNewPropList2.length == 0)
  //     this.gNewPropList2 = [new GnProperty(), new GnProperty()];
  //   else this.GndataList[a].gNewPropList = this.gNewPropList2;

  // }

  gloadAllPrimeInfo(data, a) {
    this.gdataList2 = data;
    if (this.gdataList2.length > 0) {
      for (let i = 0; i < this.gdataList2.length; i++) {
        this.gdataList2[i]["addressinfo"] = new Addressinfo();
        if (this.gdataList2[i]["ADDRESS_ID"] > 0)
          var gaddress = JSON.parse(this.gdataList2[i]["ADDRESS"]);
        this.gdataList2[i]["addressinfo"] = gaddress[0];
      }
    }

    if (this.gdataList2.length == 0)
      this.gdataList2 = [new Propertyinformation(), new Propertyinformation()];
    else this.GdataList2[a].gdataListO = this.gdataList2;
  }

  ggetd(datas: any, j): void {
    this.gdataLists = datas;
    for (let i = 0; i < this.gdataLists.length; i++) {
      this.api
        .getAllAddressInformation(
          0,
          0,
          "ID",
          "asc",
          "AND ID =" + this.gdataLists[i].ADDRESS_ID
        )
        .subscribe(
          (data) => {
            if (data["code"] == "200" && data["count"] > 0) {
              this.gaddressinfoBBussiness = data["data"][0];
              this.GdataList2[j].gaddressinfoBBussiness =
                this.gaddressinfoBBussiness;
            }
          },
          (err) => {
            //console.log(err);
          }
        );
    }
  }

  getEduIns(): number {
    let total = 0;
    total += this.expenditure.EDUCATION + this.expenditure.INSURANCE;
    return total;
  }

  getTotal23(sum1, GROSS_SALARY, agriInfo13, AMOUNT, other) {
    return (Number(sum1 != undefined ? sum1 : 0) +
      (Number(GROSS_SALARY != undefined ? GROSS_SALARY : 0) * 12)
      + Number(agriInfo13 != undefined ? agriInfo13 : 0) +
      Number(AMOUNT != undefined ? AMOUNT : 0) + Number(other != undefined && other != null ? other : 0));
  }
  getTotal24(TRADE, HOUSE, EDUCATION, AGRICULTURE, OTHER, MISCELLANEOUS) {
    return (
      Number(TRADE != undefined ? TRADE : 0) +
      Number(HOUSE != undefined ? HOUSE : 0) +
      Number(EDUCATION != undefined ? EDUCATION : 0) +
      Number(AGRICULTURE != undefined ? AGRICULTURE : 0) +
      Number(OTHER != undefined ? OTHER : 0) +
      Number(MISCELLANEOUS != undefined ? MISCELLANEOUS : 0)
    );
  }

  getTotal25(sanctionamount, sanctionamount1) {
    return (
      Number(sanctionamount != undefined ? sanctionamount : 0) +
      Number(sanctionamount1 != undefined ? sanctionamount1 : 0)
    );
  }
  getTotal256(amount24, amount245) {
    return (
      Number(amount24 != undefined ? amount24 : 0) +
      Number(amount245 != undefined ? amount245 : 0)
    );
  }


  get totalIncome() {
    let total = 0;

    // Calculate the total income from allBusiness
    for (let salaried of this.allSalary) {
      if (salaried.GROSS_SALARY) {
        total += parseFloat(salaried.GROSS_SALARY);
      }
    }

    // Calculate the total income from allHouse
    for (const business of this.allBusiness) {
      if (business.INCOME_YEARLY) {
        total += parseFloat(business.INCOME_YEARLY);
      }
    }

    for (const agri of this.allAgriculture) {
      if (agri.YEARLY_INCOME) {
        total += parseFloat(agri.YEARLY_INCOME);
      }
    }



    // Calculate the total income from allAgriculture
    // for (const agri of this.allAgriculture) {
    //   if (agri.YEARLY_INCOME) {
    //     total += parseFloat(agri.YEARLY_INCOME);
    //   }
    // }

    return total;
  }
}






