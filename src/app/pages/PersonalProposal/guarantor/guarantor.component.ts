import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { GuarantorMain } from 'src/app/Models/PersonalProposal/guarantor-main';
import { GuarantorPersonal } from 'src/app/Models/PersonalProposal/guarantor-personal';
import { Sort } from 'src/app/Models/PersonalProposal/sort';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { GproposalComponent } from '../../Guarantor/gproposal/gproposal.component';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrls: ['./guarantor.component.css']
})
export class GuarantorComponent implements OnInit {
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() data: Proposal
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  pageIndex = 1;
  @Input() LOAN_KEY: Number;

  guarantorData: GuarantorMain = new GuarantorMain()

  openGuarantor: GuarantorMain = new GuarantorMain()

  allGuarantors: GuarantorMain[] = []
  isButtonSpinning2 = false
  roleId = sessionStorage.getItem("roleId")

  pageSize = 100;
  totalRecords = 1;
  dataList: any[] = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  isButtonSpinning = false;
  isSpinning = false;
  NAME: string = "";
  MOBILE_NUMBER: string = "";
  coborrowerData: GuarantorPersonal = new GuarantorPersonal;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning = false
  i = 2;
  index1 = -1

  ID = 0
  bankLoanType = Number(sessionStorage.getItem("bankLoanId"))
  mode = "I"
  isAddSpinning = false
  drawerGuarantorProposalVisible = false
  drawerGuarantorProposalTitle: string = ""
  gurantorData = []


  @Input() CURRENT_STAGE_ID: number;

  @ViewChild(GproposalComponent) personalProposal: GproposalComponent;
  // @ViewChild(GpersonalComponent) guarantorPersonalInfo: GpersonalComponent;

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit() {

    this.getdata();
    this.loadInfo();

  }

  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID= 15 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0)
        this.extraApplicantInformation = data['data'][0]
      console.log(this.extraApplicantInformation + "Aniruddha Here")
    }, err => {
      //console.log(err);
    });
  }

  changeGuarantorName(event) {
    this.api.updateGuarantorInformation1(event).subscribe(res => {
      if (res['code'] == 200) {
        this.getdata;
      }
    })
  }

  getdata() {
    this.allGuarantors = [];
    let sortKey: Sort = new Sort(this.PROPOSAL_ID);
    this.api.getGuarantorInformation1(sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.allGuarantors = res['data'];
        this.dataList = res['data'];
      }
    });
  }


  addData() {

    console.log("guarantor data", this.guarantorData);

    if (this.guarantorData.GUARANTOR_NAME != undefined && this.guarantorData.GUARANTOR_NAME != "" &&
      this.guarantorData.GUARANTOR_MOBILE_NUMBER != undefined && this.guarantorData.GUARANTOR_MOBILE_NUMBER != "") {

      this.guarantorData.PROPOSAL_ID = this.PROPOSAL_ID;
      this.guarantorData.VISIBILITY = 1
      this.api.createGuarantorInformation1(this.guarantorData).subscribe((res) => {
        console.log("guarantor res", res);
        if (res['code'] == 200) {
          this.getdata();
          this.guarantorData = new GuarantorMain();
        }
        this.isAddSpinning = false;

        var LOG_ACTION = 'User saved Guarantor Info  tab information'
        var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Guarantor Info  for the proposal ' + this.LOAN_KEY
        var LOG_TYPE = 'I'
        this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
            }
          });
      })
    }
    else {
      this.message.error(this.api.translate.instant('guarantor-info.error_message'), "");
    }

  }

  deleteRow(data) {

    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorInformation1(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getdata();
      }
    });
  }

  // getGuarantorData(){
  //   this.api.getGuarantorInformation1(this.PROPOSAL_ID).subscribe(
  //     (res)=>{
  //       if(res['code']== 200 && res['data'].length > 0){
  //         this.allGuarantors = res['data'];
  //         this.guarantorData = new GuarantorMain()
  //       } 
  //     }
  //   )
  // }

  viewInfo(data: GuarantorMain) {
    this.drawerGuarantorProposalTitle = this.api.translate.instant('coborrowerinfo.drawerPersonalProposalTitle1')

    console.log("Guarantor data-:", data)
    this.openGuarantor = Object.assign({}, data);
    this.personalProposal.G_ID = data.ID

    this.personalProposal.getTabs();
    this.drawerGuarantorProposalVisible = true
    this.personalProposal.getAll();

    // this.personalProposal.loadAllExtraInformationMapped(data, this.data)

    // this.guarantorPersonalInfo.getGuarantorPersonalData()


  }

  get closeCallbackGuarantorProposal() {
    return this.drawerGuarantorProposalClose.bind(this);
  }
  drawerGuarantorProposalClose(): void {
    this.drawerGuarantorProposalVisible = false;
  }
  cancel(): void {

  }

  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {
      this.isButtonSpinning2 = true
      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonSpinning2 = false
            this.oldIndex++;
            this.indexChanged.emit(this.oldIndex)
            this.demo.emit(false)
            var LOG_ACTION = ''
            var DESCRIPTION = ''
            if (this.extraApplicantInformation.IS_APPROVED == true) {
              LOG_ACTION = 'Guarantors Tab information Verified'

              DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Guarantors for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
            } else {
              LOG_ACTION = 'Guarantors Tab information Rejected'
              DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Guarantors for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

            }
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning2 = false

          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
  }
  // deleteRow(data) {
  //   const index = this.dataList.indexOf(data);
  //   this.dataList.splice(index, 1);
  // }

  // edit(data, i1: number): void {
  //   this.index1 = i1
  //   this.NAME = data.NAME
  //   this.MOBILE_NUMBER = data.MOBILE_NUMBER
  // }

  save(): void {
    

    if (this.dataList.length >= 2) {

      this.extraApplicantInformation.IS_PROVIDED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('common.message.error.success'), "");
            this.isButtonSpinning = false;
            this.oldIndex++;
            this.indexChanged.emit(this.oldIndex)
            this.demo.emit(false)
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
            this.isButtonSpinning = false;
          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('guarantor-info.at_least_two_guarantors'), "");
    }

  }



  confirm2(): void {
    this.extraApplicantInformation.IS_APPROVED = false;
    if (this.extraApplicantInformation.REMARK == undefined || this.extraApplicantInformation.REMARK.trim() == "") {

      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {

      this.VerifyUpdate();
    }

  }

  confirm(): void {
    this.extraApplicantInformation.REMARK = " "
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }

}
