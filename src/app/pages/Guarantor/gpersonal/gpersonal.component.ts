import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';

import { GuarantorMain } from 'src/app/Models/PersonalProposal/guarantor-main';
import { GuarantorPersonal } from 'src/app/Models/PersonalProposal/guarantor-personal';
import { ApiService } from 'src/app/Service/api.service';

import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

@Component({
  selector: 'app-gpersonal',
  templateUrl: './gpersonal.component.html',
  styleUrls: ['./gpersonal.component.css']
})
export class GpersonalComponent implements OnInit {

  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() G_ID: number
  @Input() PROPOSAL_ID: number
  @Input() GuarantorData: GuarantorMain;
  @Input() LOAN_KEY: Number;
  @Input() addressinfoCurrent: Addressinfo;
  @Input() addressinfoPermanent: Addressinfo;

  @Input() CURRENT_STAGE_ID: number;
  @Input() data: GuarantorPersonal;

  @Input() APPLICANT_ID


  @Input() oldIndex: number
  @Input() familyDeatils
  @Input() personalInformationId

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy')


  @Output() indexChanged: EventEmitter<number> = new EventEmitter();


  roleId = sessionStorage.getItem("roleId")

  isButtonSpinning = false;
  isButtonSpinning2 = false;

  isButtonVerifySpinning = false

  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()

  // personalInfo: GuarantorPersonal = new GuarantorPersonal();
  talukas = []
  districts = []
  states = []
  pincodes = []
  options = []

  NAME: string = ""
  RELATION: string
  OCCUPATION: string
  YEARLY_INCOME: number



  datePipe: any;
  IsSubmit = false
  IndivisualInfotabs: any;


  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.getData();
    this.loadInfo(this.PROPOSAL_ID, this.APPLICANT_ID)
  }

  getData() {
    this.getGuarantorPersonalData()

  }
  loadInfo(proposalId, applicantId) {
    let filter = " AND EXTRA_INFORMATION_ID=1 AND PROPOSAL_ID=" + proposalId + " AND APPLICANT_ID=" + this.G_ID + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      if (data['code'] == 200) {

        this.extraApplicantInformation = data['data'][0]
        console.log('extraApplicantInformation', this.extraApplicantInformation)
      }
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
    });
  }


  loadInfo2(proposalId, applicantId) {
    this.api.getAddressInfo(proposalId, "B", applicantId).subscribe(data => {
      //console.log(data)
      if (data['code'] == 200 && data['data'].length > 0) {
        this.data = Object.assign({}, data['data'][0]);
        console.log("data on load", this.data);
        this.personalInformationId = this.data.ID
        this.addressinfoCurrent = Object.assign({}, data['data'][0]['CURRENT_ADDRESS'][0]);
        this.addressinfoPermanent = Object.assign({}, data['data'][0]['PERMANENT_ADDRESS'][0]);
        this.familyDeatils = []
        // var d = new Date(this.data.DATE_OF_MEMBERSHIP)
        // this.data.DATE_OF_MEMBERSHIP = this.datePipe.transform(d, 'dd/MM/yyyy');

      }
    }, err => {
      //console.log(err);
    });

  }
  onChange(date) {
    const darray = date.split('/');
    let bdate = new Date(darray[2], darray[1], darray[0]);
    let timeDiff = Math.abs(Date.now() - bdate.getTime());
    this.data.AGE = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  onChanges2(value: string): void {
    this.pincodes = [];
    this.talukas.filter(option => {
      if (option.PINCODE.toLowerCase().includes(value.toLowerCase())) {
        this.pincodes.push(option.PINCODE);
      }
    });

  }

  save() {


    var oks = true;
    if (oks) {
      this.data.G_ID = this.G_ID
      this.data.PROPOSAL_ID = this.PROPOSAL_ID
      this.familyDeatils = []

      console.log(this.data.G_ID + "but")
      console.log(this.data.PROPOSAL_ID + "hut")

      this.extraApplicantInformation.IS_PROVIDED = true;

      if (this.data.ID) {
        this.api.updateGuarantorPersonal(this.data).subscribe(
          (res) => {
            if (res['code'] == 200) {

              this.getGuarantorPersonalData();

              var LOG_ACTION = 'User saved Personal Info  tab information'
              var DESCRIPTION = sessionStorage.getItem('userName') + 'has saved the Personal Info  for the proposal ' + this.LOAN_KEY
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    this.demo.emit(false)
                  }
                  else {
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                    this.isButtonSpinning = false;
                  }

                });



            }
          }
        )
      }
      else {
        this.api.createGuarantorPersonal(this.data).subscribe(
          (res) => {
            if (res['code'] == 200) {
              this.getGuarantorPersonalData();
              this.extraApplicantInformation.IS_PROVIDED = true;

              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              
              this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    this.demo.emit(false)
                  }
                  else {
                    this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
                    this.isButtonSpinning = false;
                  }

                });
                
            }
          }
        )
      }
    }
  }

  getGuarantorPersonalData() {
    this.api.getGuarantorPersonal(this.G_ID).subscribe(
      (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.data = res['data'][0]
        }
      }
    )
  }




  copyClick() {
    this.data.P_STATE = this.data.STATE,
      this.data.P_DISTRICT = this.data.DISTRICT,
      this.data.P_VILLAGE = this.data.VILLAGE,
      this.data.P_TALUKA = this.data.TALUKA,
      this.data.P_PINCODE = this.data.PINCODE,
      this.data.P_LANDMARK = this.data.LANDMARK,
      this.data.P_BUILDING = this.data.BUILDING,
      this.data.P_HOUSE_NO = this.data.HOUSE_NO
  }






  checkStatus() {
    throw new Error('Method not implemented.');
  }





  VerifyUpdate() {

    if (this.extraApplicantInformation.REMARK != "") {
      this.isButtonVerifySpinning = true
      this.extraApplicantInformation.IS_VERIFIED = true
      this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.isButtonVerifySpinning = false
            this.demo.emit(false)
            this.isButtonVerifySpinning = false
            this.demo.emit(false)
            var LOG_ACTION = ''
            var DESCRIPTION = ''
            if (this.extraApplicantInformation.IS_APPROVED == true) {
              LOG_ACTION = 'Guarantor personal Tab information Verified'
              LOG_ACTION = 'Guarantor personal Tab information Verified'

              DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Guarantor personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Guarantor personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
            } else {
              LOG_ACTION = 'Guarantor personal Tab information Rejected'
              DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Guarantor personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              LOG_ACTION = 'Guarantor personal Tab information Rejected'
              DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Guarantor personal for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

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
            this.isButtonVerifySpinning = false

          }
        });
    }
    else {
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
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
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }






}
