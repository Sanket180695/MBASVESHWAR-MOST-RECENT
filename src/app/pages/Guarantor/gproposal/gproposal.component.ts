import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { GuarantorMain } from 'src/app/Models/PersonalProposal/guarantor-main';
import { GuarantorPersonal } from 'src/app/Models/PersonalProposal/guarantor-personal';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { GcreditComponent } from '../gcredit/gcredit.component';
import { GfinancialComponent } from '../gfinancial/gfinancial.component';
import { GincomeComponent } from '../gincome/gincome.component';
import { GpersonalComponent } from '../gpersonal/gpersonal.component';
import { GpropertyComponent } from '../gproperty/gproperty.component';

@Component({
  selector: 'app-gproposal',
  templateUrl: './gproposal.component.html',
  styleUrls: ['./gproposal.component.css'],
  providers: [DatePipe]

})
export class GproposalComponent implements OnInit {
  @Input() G_ID: number
  @Input() LOAN_KEY: Number;
  IsSubmit = false

  @Input() PROPOSAL_ID: number
  @Input() data: GuarantorMain;
  @Input() data2: Proposal;
  @Input() CURRENT_STAGE_ID: number;

  @Input() APPLICANT_ID

  @Input() proposalData: Proposal

  @ViewChild(GpersonalComponent) guarantorPersonalInfo: GpersonalComponent;
  @ViewChild(GincomeComponent) guarantorIncomeInfo: GincomeComponent;
  @ViewChild(GfinancialComponent) guarantorFinancialInfo: GfinancialComponent;
  @ViewChild(GcreditComponent) guarantorCreditInfo: GcreditComponent;
  @ViewChild(GpropertyComponent) guarantorProperty: GpropertyComponent;
  @ViewChild(GpersonalComponent, { static: false }) personalinfo1: GpersonalComponent;

  IndivisualInfotabs = []

  //extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo();
  isSpinningTabs = false;
  selectedIndex: number;
  textVisible: boolean;
  PROPOSAL_TYPE: string;
  index: number;
  applicantId: number
  familyDeatails = []

  personalInfo: GuarantorPersonal = new GuarantorPersonal();
  addressinfoCurrent: Addressinfo = new Addressinfo();
  addressinfoPermanent: Addressinfo = new Addressinfo();
  @Input() extraApplicantInformation: Extraapplicantinfo


  personalInformationId: number
  datePipe: any;


  constructor(private api: ApiService, private message: NzNotificationService) { }
  browserLang = localStorage.getItem('locale')
  ngOnInit(): void {


  }


  // loadInfo(){
  //   this.personalinfo1.GuarantorData = this.data;
  //   this.personalinfo1.getData(); 
  //   this.personalinfo1.personalInfo.APPLICANT_NAME = this.data.GUARANTOR_NAME;
  //   this.personalinfo1.personalInfo.MOBILE_NO1 = this.data.GUARANTOR_MOBILE_NUMBER;
  //   this.property.GuarantorInfo = this.data;
  //   this.property.getAllGproperties();
  // }



  getAll() {

    this.guarantorPersonalInfo.G_ID = this.G_ID
    this.guarantorIncomeInfo.G_ID = this.G_ID
    this.guarantorFinancialInfo.G_ID = this.G_ID
    this.guarantorCreditInfo.G_ID = this.G_ID
    this.guarantorProperty.G_ID = this.G_ID
    this.guarantorPersonalInfo.getGuarantorPersonalData();
    this.guarantorIncomeInfo.getIncome();
    this.guarantorFinancialInfo.getFinancial();
    this.guarantorCreditInfo.getCredit();
    this.guarantorProperty.getProperty();

  }

  getTabs() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.G_ID + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      if (data['count'] > 0) {
        this.IndivisualInfotabs = data['data'];
        if (this.PROPOSAL_TYPE = "1")
          this.personalinfo1.loadInfo2(this.PROPOSAL_ID, this.APPLICANT_ID)
        this.checkStatus();
      }
      else {
        this.IndivisualInfotabs = [];
        this.checkStatus();
      }

    }, err => {
      //console.log(err);
    });
  }

  checkStatus() {
    this.IsSubmit = true;
    var data = []
    data = this.IndivisualInfotabs.filter(object => {
      return (object['IS_PROVIDED'] == 1);
    });


    if (data.length == this.IndivisualInfotabs.length) {
      this.extraApplicantInformation.IS_PROVIDED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            // this.message.success(this.api.translate.instant('common.message.error.success'), "");
          }
          else {
            // this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");

          }
        });
    }
  }


  loadAllExtraInformationMapped(data: GuarantorMain, data1: Proposal) {
    //console.log(data)
    //console.log(data1)
    this.applicantId = data.APPLICANT_ID
    this.isSpinningTabs = true
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + data.APPLICANT_ID + " AND TYPE='G'"
    //console.log(filter)
    this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
      //console.log("gurantor Info")
      if (data['count'] > 0) {
        this.selectedIndex = 0
        this.IndivisualInfotabs = data['data'];

        this.api.getAllIncomeInformation(0, 0, 'ID', 'ASC', filter).subscribe(data => {
          if (data['code'] == 200) {
            sessionStorage.setItem("G_IS_SAVED", data['data'][0]['IS_SAVED'])
          }
        }, err => {
          //console.log(err);
        });



        if (data1.PRAPOSAL_TYPE == 'वैयक्तिक') {
          this.PROPOSAL_TYPE = "1"
          sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)


          this.api.getAddressInfo(this.PROPOSAL_ID, "G", this.applicantId).subscribe(data => {

            if (data['code'] == 200) {

              this.personalInfo = Object.assign({}, data['data'][0]);
              console.log("personalInfo", this.personalInfo)
              if (this.personalInfo.DOB != undefined && this.personalInfo.DOB != '') {
                let dArray = this.personalInfo.DOB.split('-');
                this.personalInfo.DOB = `${dArray[2]}/${dArray[1]}/${dArray[0]}`
              }
              else {
                console.log("DOB is not Defined");

              }
              // this.personalInfo.MOBILE_NO1=data1.MOBILE_NUMBER
              sessionStorage.setItem("personalMobile", this.personalInfo.MOBILE_NO1)
              this.personalInformationId = this.personalInfo.ID
              this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              this.addressinfoPermanent = new Addressinfo();
              this.familyDeatails = []
              this.personalInfo.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.personalInfo.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
              // if (this.personalInfo.DOB != "") {
              // this.personalinfo1.onChange(this.personalInfo.DOB)
              // }
              this.personalinfo1.loadInfo(this.PROPOSAL_ID, this.applicantId)
            }
          }, err => {
            //console.log(err);
          });
        }
        else {

          this.api.getAddressInfo(this.PROPOSAL_ID, "G", this.applicantId).subscribe(data => {
            //console.log("data proposal")
            //console.log(data)
            if (data['code'] == 200) {
              this.personalInfo = Object.assign({}, data['data'][0]);
              this.personalInformationId = this.personalInfo.ID
              this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
              this.addressinfoPermanent = new Addressinfo();
              this.familyDeatails = []
              // this.personalinfo1.onChange(this.personalInfo.DOB)
              this.personalInfo.DATE_OF_MEMBERSHIP = this.datePipe.transform(this.personalInfo.DATE_OF_MEMBERSHIP, 'dd/MM/yyyy');
              this.personalinfo1.loadInfo(this.PROPOSAL_ID, this.applicantId)


            }
          }, err => {
            //console.log(err);
          });
          this.PROPOSAL_TYPE = "2"
          sessionStorage.setItem("PRAPOSAL_TYPE", this.PROPOSAL_TYPE)
          // this.index=0
        }
      }
      else {
        this.IndivisualInfotabs = []
        sessionStorage.setItem("PRAPOSAL_TYPE", "0")
      }
      this.isSpinningTabs = false
    }, err => {
      //console.log(err);
    });
  }
  indexChanged(value) {
    this.index = value;
    //console.log(this.index)
    //this.loadAllExtraInformationMapped(this.PROPOSAL_ID)
  }
  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {

      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {

            // this.oldIndex++;
            // this.indexChanged.emit(this.oldIndex)
          }
          else {
            this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");


          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
  }



}
