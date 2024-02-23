import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { GnGuarantor } from 'src/app/Models/PersonalProposal/gn-guarantor';
import { Sort } from 'src/app/Models/PersonalProposal/sort'
import { GnCoborrower } from 'src/app/Models/PersonalProposal/gn-coborrower';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { GnProposalInfoComponent } from '../gn-proposal-info/gn-proposal-info.component';


@Component({
  selector: 'app-guarantor-new-info',
  templateUrl: './guarantor-new-info.component.html',
  styleUrls: ['./guarantor-new-info.component.css']
})
export class GuarantorNewInfoComponent implements OnInit {

  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() data: Proposal
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();
  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  pageIndex = 1;
  @Input() LOAN_KEY: Number;
  gid: number;
  pageSize = 100;
  totalRecords = 1;
  dataList = [];
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
  coborrowerData: GnCoborrower = new GnCoborrower;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  isButtonVerifySpinning = false
  i = 2;
  index1 = -1
  roleId = sessionStorage.getItem("roleId")
  g_info: GnGuarantor = new GnGuarantor();
  drawerData: GnGuarantor = new GnGuarantor();
  ID = 0
  bankLoanType = Number(sessionStorage.getItem("bankLoanId"))
  mode = "I"
  isAddSpinning = false
  drawerPersonalProposalVisible = false
  drawerPersonalProposalTitle: string = ""
  guarantorData: GnGuarantor[] = []

  @Input() CURRENT_STAGE_ID: number;
  @ViewChild(GnProposalInfoComponent) personalProposal: GnProposalInfoComponent;

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.loadInfo();
    this.getdata();
  }

  loadInfo() {
    let filter = " AND EXTRA_INFORMATION_ID=15 AND PROPOSAL_ID=" + this.PROPOSAL_ID
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      if (data['code'] == 200){
        this.extraApplicantInformation = data['data'][0]
      }
    }, err => {
      //console.log(err);
    });
  }


  changeGuarantorName(event) {
    this.api.UpdateGuarantorInfo_Amulya(event).subscribe(res => {
      if (res['code'] == 200) {
        this.getdata;
      }
    })
  }

  getdata() {
    this.guarantorData = [];
    let sortKey: Sort = new Sort(this.PROPOSAL_ID);
    this.api.getAllGuarantorInfo_Amulya(sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.guarantorData = res['data'];
      }
    });
  }


  addData() {
    console.log("guarantor data", this.g_info);
    this.g_info.PROPOSAL_ID = this.PROPOSAL_ID;
    this.api.addGuarantorInfo_Amulya(this.g_info).subscribe((res) => {
      console.log("guarantor res", res);
      if (res['code'] == 200) {
        this.getdata();
        this.g_info = new GnGuarantor();
      }
      this.isAddSpinning = false;
    })
  }

  deleteRow(data) {

    data.ARCHIVE_FLAG = 'T';
    this.api.UpdateGuarantorInfo_Amulya(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getdata();
      }
    });
  }



  save(): void {

    if (this.guarantorData.length >= 1) {
      this.isButtonSpinning = true;

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

  }

  callMethod() {
    this.isButtonSpinning = true
    this.extraApplicantInformation.IS_PROVIDED = false
    this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.message.success(this.api.translate.instant('common.message.error.success'), "");
          this.isButtonSpinning = false;

        }
        else {
          this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
          this.isButtonSpinning = false;
        }
      });


  }



  viewInfo(data: GnGuarantor) {
    
    this.drawerPersonalProposalTitle = this.api.translate.instant('coborrowerinfo.drawerPersonalProposalTitle1')
    this.drawerPersonalProposalVisible = true;
    this.personalProposal.data = data;
    this.personalProposal.loadInfo();
    


  }



  cancel(): void {

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
    console.log();

    this.extraApplicantInformation.IS_APPROVED = true;
    console.log(this.extraApplicantInformation.IS_APPROVED, 'ok');

    this.VerifyUpdate();

    console.log(this.VerifyUpdate(), "verify");

  }
  VerifyUpdate() {

    if (this.extraApplicantInformation.IS_PROVIDED) {

      if (this.extraApplicantInformation.REMARK != "") {
        this.isButtonVerifySpinning = true
        this.extraApplicantInformation.IS_VERIFIED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.isButtonVerifySpinning = false;
              // this.oldIndex++;
              // this.indexChanged.emit(this.oldIndex)
              this.demo.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Coborrower info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Coborrower info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Coborrower info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Coborrower info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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
              this.isButtonVerifySpinning = false;
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    }
  }

  get closeCallbackPersonalProposal() {
    return this.drawerPersonalProposalClose.bind(this);
  }
  drawerPersonalProposalClose(): void {
    this.drawerPersonalProposalVisible = false;
  }



}
