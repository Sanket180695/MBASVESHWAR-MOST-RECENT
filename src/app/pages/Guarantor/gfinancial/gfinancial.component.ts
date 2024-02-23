import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GuarantorAllDeposits } from 'src/app/Models/PersonalProposal/guarantor-all-deposits';
import { GuarantorFinancial } from 'src/app/Models/PersonalProposal/guarantor-financial';
import { Incomeyear } from 'src/app/Models/PersonalProposal/incomeyear';
import { ApiService } from 'src/app/Service/api.service';
import { NzModalRef, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-gfinancial',
  templateUrl: './gfinancial.component.html',
  styleUrls: ['./gfinancial.component.css']
})
export class GfinancialComponent implements OnInit {
  index = -1;

  @Output() demo: EventEmitter<boolean> =
  new EventEmitter<boolean>();

  @Input() PROPOSAL_ID: number
  @Input() G_ID: number
  @Input() CURRENT_STAGE_ID: number;

  roleId = sessionStorage.getItem("roleId")

  incomeYears: Incomeyear[]

  confirmModal?: NzModalRef;

  data: GuarantorFinancial = new GuarantorFinancial();
  browserLang = '';

  tdata: GuarantorAllDeposits[] = [];
  cdata: GuarantorAllDeposits[] = [];
  rdata: GuarantorAllDeposits[] = [];

  t_drawer: GuarantorAllDeposits = new GuarantorAllDeposits();
  t_drawerVisible: boolean;
  t_drawerTitle: string;

  c_drawer: GuarantorAllDeposits = new GuarantorAllDeposits();
  c_drawerVisible: boolean;
  c_drawerTitle: string;

  r_drawer: GuarantorAllDeposits = new GuarantorAllDeposits();
  r_drawerVisible: boolean;
  r_drawerTitle: string;

  constructor(private api: ApiService,private modal: NzModalService,private message: NzNotificationService,) { }

  ngOnInit(): void {
    this.getFinancial();
    this.loadInfo();
    this.loadIncomeYear()
  }

  getSessionValues() {
    // this.proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
    // this.isSaved = Number(sessionStorage.getItem("C_IS_SAVED"))
  }

  loadIncomeYear() {
    this.api.getAllIncomeyears(0, 0, "ID", "desc", "").subscribe(data => {
      this.incomeYears = data['data']
    }, err => {
      //console.log(err);
    });
  }


  addTermDeposit() {
    this.t_drawerTitle = this.api.translate.instant('cash-credit-loan-other.title1')
    this.t_drawer = new GuarantorAllDeposits();
    this.t_drawer.G_ID = this.data.ID;
    this.t_drawerVisible = true;
  }

  get closeCallback3() {
    return this.tdrawerClose.bind(this);
  }

  tdrawerClose(): void {
    this.t_drawerVisible = false;
    this.getTermDeposit();
  }

  editTermDeposit(data : GuarantorAllDeposits){
    this.t_drawerTitle = this.api.translate.instant('cash-credit-loan-other.title2')
    this.t_drawer = Object.assign({}, data);
    this.t_drawerVisible = true;
  }

  deleteTermDeposit(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorTermInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getTermDeposit();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }


  addCurrentDeposit() {
    this.c_drawerTitle = this.api.translate.instant('cash-credit-loan-other.title3')
    this.c_drawer = new GuarantorAllDeposits();
    this.c_drawer.G_ID = this.data.ID;
    this.c_drawerVisible = true;
  }

  get closeCallback4() {
    return this.cdrawerClose.bind(this);
  }

  cdrawerClose(): void {
    this.c_drawerVisible = false;
    this.getCurrentDeposit();
  }

  editCurrentDeposit(data : GuarantorAllDeposits){
    this.c_drawerTitle = this.api.translate.instant('cash-credit-loan-other.title4')
    this.c_drawer = Object.assign({}, data);
    this.c_drawerVisible = true;
  }

  deleteCurrentDeposit(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorCurrentInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getCurrentDeposit();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }


  addRecurringDeposit() {
    this.r_drawerTitle = this.api.translate.instant('cash-credit-loan-other.title5')
    this.r_drawer = new GuarantorAllDeposits();
    this.r_drawer.G_ID = this.data.ID;
    this.r_drawerVisible = true;
  }

  get closeCallback5() {
    return this.rdrawerClose.bind(this);
  }

  rdrawerClose(): void {
    this.r_drawerVisible = false;
    this.getRecurringDeposit();
  }

  editRecurringDeposit(data : GuarantorAllDeposits){
    this.r_drawerTitle = this.api.translate.instant('cash-credit-loan-other.title6')
    this.r_drawer = Object.assign({}, data);
    this.r_drawerVisible = true;
  }

  deleteRecurringDeposit(data){

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorRecurringInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.message.success(this.api.translate.instant('common.message.success.deleteinfo'), "");
        this.getRecurringDeposit();
      }
      else {
        this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
      }
    });

  }





  getFinancial() {
    this.api.getGuarantorFinancialInformation(this.G_ID).subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data = successCode['data'][0]

          this.getTermDeposit()
          this.getCurrentDeposit()
          this.getRecurringDeposit()

        }
      }
    )
  }
  extraApplicantInformation:Extraapplicantinfo = new Extraapplicantinfo()
  loadInfo() {
    this.browserLang = localStorage.getItem('locale');
    let filter = " AND EXTRA_INFORMATION_ID=4 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.G_ID + " AND TYPE='G'"
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
      this.api.updateGuarantorFinancialInformation(this.data).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getFinancial();
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
      this.api.createGuarantorFinancialInformation(this.data).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getFinancial();
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



  saveTdWorkdata(): void {
    if (this.index > -1) {
      this.tdata[this.index] = Object.assign({}, this.t_drawer);
    } else {
      this.tdata.push(Object.assign({}, this.t_drawer));
    }
    this.tdata = [...this.tdata];
    this.index = -1;
  }


  saveCdWorkdata(): void {
    if (this.index > -1) {
      this.cdata[this.index] = Object.assign({}, this.c_drawer);
    } else {
      this.cdata.push(Object.assign({}, this.c_drawer));
    }
    this.cdata = [...this.cdata];
    this.index = -1;
  }


  saveRdWorkdata(): void {
    if (this.index > -1) {
      this.rdata[this.index] = Object.assign({}, this.r_drawer);
    } else {
      this.rdata.push(Object.assign({}, this.r_drawer));
    }
    this.rdata = [...this.rdata];
    this.index = -1;
  }


  getTermDeposit() {
    this.api.getGuarantorTermInformation(this.G_ID).subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.tdata = successCode['data']
          console.log(this.tdata);

        }
      }
    )

  }

  getCurrentDeposit() {
    this.api.getGuarantorCurrentInformation(this.G_ID).subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.cdata = successCode['data']
        }
      }
    )
  }

  getRecurringDeposit() {
    this.api.getGuarantorRecurringInformation(this.G_ID).subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.rdata = successCode['data']
        }
      }
    )
  }



}
