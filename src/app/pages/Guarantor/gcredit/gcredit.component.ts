import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { GcLoanFromOthersBank } from 'src/app/Models/PersonalProposal/gc-loan-from-others-bank';
import { GcLoanFromThisBank } from 'src/app/Models/PersonalProposal/gc-loan-from-this-bank';
import { GcLoanGuarantee } from 'src/app/Models/PersonalProposal/gc-loan-guarantee';
import { GcPreviousLoan } from 'src/app/Models/PersonalProposal/gc-previous-loan';
import { GuarantorCredit } from 'src/app/Models/PersonalProposal/guarantor-credit';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';
import { Bank } from 'src/app/bank';


@Component({
  selector: 'app-gcredit',
  templateUrl: './gcredit.component.html',
  styleUrls: ['./gcredit.component.css']
})
export class GcreditComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
  new EventEmitter<boolean>();
  @Input() data: GuarantorCredit = new GuarantorCredit();
  @Input() PROPOSAL_ID: number
  @Input() G_ID: number
  @Input() CURRENT_STAGE_ID: number;

  bank = Bank.BankName
  browserLang = 'en';

  roleId = sessionStorage.getItem("roleId")

  thisBankData: GcLoanFromThisBank[] = [];
  otherBankData : GcLoanFromOthersBank[] = [];
  loanGuaranteeData : GcLoanGuarantee[] = [];
  previousLoanData : GcPreviousLoan[] = [];


  drawerData_ThisBank : GcLoanFromThisBank = new GcLoanFromThisBank()
  drawerTitle_ThisBank:string;
  drawerVisible_ThisBank : boolean;

  drawerData_OtherBank : GcLoanFromOthersBank = new GcLoanFromOthersBank()
  drawerTitle_OtherBank:string;
  drawerVisible_OtherBank : boolean;

  drawerData_LoanGuarantee : GcLoanGuarantee = new GcLoanGuarantee()
  drawerTitle_LoanGuarantee : string;
  drawerVisible_LoanGuarantee : boolean;

  drawerData_PreviousLoan : GcPreviousLoan = new GcPreviousLoan()
  drawerTitle_PreviousLoan : string;
  drawerVisible_PreviousLoan : boolean;

  loans: any = [];
  loans2: any = [];
  loans3: any = [];
  loanData2: any = [];

  dataList10 =[];
  dataList11 =[];
  setOfCheckedId = new Set<number>();

  checked = false;
  indeterminate = false;


  constructor( private api: ApiService,private modal: NzModalService,private message: NzNotificationService) { }

  ngOnInit(): void {
    this.getCredit();
    this.loadInfo();
    this.getLoanType();
  }

  addLoanFromThisBank(){
    this.drawerTitle_ThisBank = this.api.translate.instant('gcreditinfo.drawerTitle1')
    this.drawerData_ThisBank = new GcLoanFromThisBank();
    this.loans = this.loanData2;
    this.drawerData_ThisBank.G_ID = this.data.ID;
    this.drawerVisible_ThisBank = true;
  }

  get closeCallback1() {
    return this.drawerCloseThisBank.bind(this);
  }

  drawerCloseThisBank(): void {
    this.getLoanFromThisBank();
    this.drawerVisible_ThisBank = false;
  }

  editLoanFromThisBank(data : GcLoanFromThisBank){
    this.drawerTitle_ThisBank = this.api.translate.instant('gcreditinfo.drawerTitle3')
    this.drawerData_ThisBank = Object.assign({}, data);
    this.loans = this.loanData2;
    this.drawerVisible_ThisBank = true;
  }

  deleteLoanFromThisBank(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorCreditLoanFromThisBank(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getLoanFromThisBank();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }



  addLoanFromOtherBank(){
    this.drawerTitle_OtherBank = this.api.translate.instant('gcreditinfo.drawerTitle2')
    this.drawerData_OtherBank = new GcLoanFromOthersBank();
    this.drawerData_OtherBank.G_ID = this.data.ID;
    this.drawerVisible_OtherBank = true;
  }

  get closeCallback4() {
    return this.drawerCloseOtherBank.bind(this);
  }

  drawerCloseOtherBank(): void {
    this.getLoanFromOtherBank();
    this.drawerVisible_OtherBank = false;
  }

  editLoanFromOtherBank(data : GcLoanFromOthersBank){
    this.drawerTitle_OtherBank = this.api.translate.instant('gcreditinfo.drawerTitle4')
    this.drawerData_OtherBank = Object.assign({}, data);
    this.drawerVisible_OtherBank = true;
  }

  deleteLoanFromOtherBank(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorCreditLoanFromOtherBank(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getLoanFromOtherBank();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }



  addLoanGuarantee(){
    this.drawerTitle_LoanGuarantee = this.api.translate.instant('gcreditinfo.drawerTitle5')
    this.drawerData_LoanGuarantee = new GcLoanGuarantee();
    this.loans2 = this.loanData2;
    this.drawerData_LoanGuarantee.G_ID = this.data.ID;
    this.drawerVisible_LoanGuarantee = true;
  }

  get closeCallback2() {
    return this.drawerCloseLoanGuarantee.bind(this);
  }

  drawerCloseLoanGuarantee(): void {
    this.getLoanGuarantee();
    this.drawerVisible_LoanGuarantee = false;
  }

  editLoanGuarantee(data : GcLoanGuarantee){
    this.drawerTitle_LoanGuarantee = this.api.translate.instant('gcreditinfo.drawerTitle7')
    this.drawerData_LoanGuarantee = Object.assign({}, data);
    this.loans2 = this.loanData2;
    this.drawerVisible_LoanGuarantee = true;
  }

  deleteLoanGuarantee(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorCreditLoanGuarantee(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getLoanGuarantee();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }



  addLoanPreviousLoan(){
    this.drawerTitle_PreviousLoan = this.api.translate.instant('gcreditinfo.drawerTitle9')
    this.drawerData_PreviousLoan = new GcPreviousLoan();
    this.loans3 = this.loanData2;
    this.drawerData_PreviousLoan.G_ID = this.data.ID;
    this.drawerVisible_PreviousLoan = true;
  }

  get closeCallback3() {
    return this.drawerClosePreviousLoan.bind(this);
  }

  drawerClosePreviousLoan(): void {
    this.getPreviousLoan();
    this.drawerVisible_PreviousLoan = false;
  }

  editLoanPreviousLoan(data : GcPreviousLoan){
    this.drawerTitle_PreviousLoan = this.api.translate.instant('gcreditinfo.drawerTitle11')
    this.drawerData_PreviousLoan = Object.assign({}, data);
    this.loans3 = this.loanData2;
    this.drawerVisible_PreviousLoan = true;
  }

  deleteLoanPreviousLoan(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorCreditPreviousLoan(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getPreviousLoan();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }




  getLoanType(){
    
    let filter = ""
    this.api.getAllLoanScheme(0, 0, 'ID', "asc", filter)
      .subscribe(successCode => {
        //console.log("bank loan types")
        //console.log(successCode)
        this.loanData2 = [];
        if (successCode['code'] == "200" && successCode['count'] > 0) {
          this.loanData2 = successCode['data'];
        }
      });

  }

  getLoanName(id: number, issub) {

    var num = Number(id);
     if (this.loanData2.length > 0 && num > 0) {
       var loannames = this.loanData2.filter((item) => item.ID == id);
       if (this.browserLang == 'mr') {
         return loannames[0]['NAME_MR'];
       } else if (this.browserLang == 'en') {
         return loannames[0]['NAME_EN'];
       } else {
         return loannames[0]['NAME_KN'];
       }
     } else {
       return '-';
     }
  
 }


  getCredit() {
    this.api.getGuarantorCreditInformation(this.G_ID).subscribe(
      successCode => {
        if (successCode['code'] == 200 && successCode['data'].length>0 ) {
          this.data = successCode['data'][0]

          this.getLoanFromThisBank()
          this.getLoanFromOtherBank()
          this.getLoanGuarantee()
          this.getPreviousLoan()

        }
      }
    )

  }

  extraApplicantInformation:Extraapplicantinfo = new Extraapplicantinfo()
  loadInfo() {
    this.browserLang = localStorage.getItem('locale');
    let filter = " AND EXTRA_INFORMATION_ID=5 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.G_ID + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0) {

        this.extraApplicantInformation = data['data'][0]
        console.log('extraApplicantInformation', this.extraApplicantInformation)
      }
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
    });
  }

  save() {
    this.data.G_ID = this.G_ID
    this.data.PROPOSAL_ID = this.PROPOSAL_ID

    if(this.data.ID){
      this.api.updateGuarantorCreditInformation(this.data).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getCredit();
            this.getLoanType();
            this.extraApplicantInformation.IS_PROVIDED = true;

            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.demo.emit(false);
                this.loadInfo();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              }
            });
          }
        }
      )
    }
    else{
      this.api.createGuarantorCreditInformation(this.data).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getCredit();
            this.getLoanType();
            this.extraApplicantInformation.IS_PROVIDED = true;

            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.demo.emit(false);
                this.loadInfo();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              }
            });
          }
        }
      )
    }

  }


  getLoanFromThisBank(){
    this.api.getGuarantorCreditLoanFromThisBank(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.thisBankData = successCode['data']
        }
      }
    )
  }

  getLoanFromOtherBank(){
    this.api.getGuarantorCreditLoanFromOtherBank(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.otherBankData = successCode['data']
        }
      }
    )
  }

  getLoanGuarantee(){
    this.api.getGuarantorCreditLoanGuarantee(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.loanGuaranteeData = successCode['data']
        }
      }
    )
  }

  getPreviousLoan(){
    this.api.getGuarantorCreditPreviousLoan(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.previousLoanData = successCode['data']
        }
      }
    )
  }

  updateCheckedSet(id: number, checked: boolean, amount: number, indexOfelement): void {
    if (id != undefined) {
      if (checked) {
        this.data.G_OUTSTANDING_BANK_AMOUNT = this.data.G_OUTSTANDING_BANK_AMOUNT + amount;
        this.dataList10[indexOfelement].IS_SELECTED = true;
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
        this.data.G_OUTSTANDING_BANK_AMOUNT = this.data.G_OUTSTANDING_BANK_AMOUNT - amount;
        this.dataList10[indexOfelement].IS_SELECTED = false;
        if (this.data.G_OUTSTANDING_BANK_AMOUNT < 0) {
          this.data.G_OUTSTANDING_BANK_AMOUNT = 0;
        }
      }
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.dataList10.every(item => this.setOfCheckedId.has(item.ID));
    this.indeterminate = this.dataList10.some(item => this.setOfCheckedId.has(item.ID)) && !this.checked;
  }

  filterLoans(G_IS_EXISTING_LOAN_WITH_SUB, G_IS_EXISTING_LOAN_WITH_OTHER_BANKS) {
    
    if (this.dataList11.length > 0) {
      if (G_IS_EXISTING_LOAN_WITH_SUB == 1 && G_IS_EXISTING_LOAN_WITH_OTHER_BANKS == 1) {
        this.dataList10 = this.dataList11;
      } else {


        if (G_IS_EXISTING_LOAN_WITH_OTHER_BANKS == 1) {
          this.dataList10 = this.dataList11.filter((item) => item.IS_SUB == 0);
        }

        if (G_IS_EXISTING_LOAN_WITH_SUB == 1) {
          this.dataList10 = this.dataList11.filter((item) => item.IS_SUB == 1);
        }
      }
    }
    this.data.G_OUTSTANDING_BANK_AMOUNT = 0;
    this.dataList10.forEach((item, index) => {

      if (item.IS_SELECTED == 1) {
        this.updateCheckedSet(item.ID, true, item.G_LOAN_OUTSTANDING, index);
      } else {
        this.updateCheckedSet(item.ID, false, 0, index);
      }
    });
    this.refreshCheckedStatus();
  }

  
}
