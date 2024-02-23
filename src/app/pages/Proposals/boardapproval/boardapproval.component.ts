import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { conformToMask } from 'angular2-text-mask';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { ToWords } from 'to-words';


const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});
@Component({
  selector: 'app-boardapproval',
  templateUrl: './boardapproval.component.html',
  styleUrls: ['./boardapproval.component.css']
})
export class BoardapprovalComponent implements OnInit {

  optionList = [

    {
      label: 'CEO',
      value: 'A',
    },
    // {
    //   label: 'Ravindra C. Chougala (General Manager)',
    //   value: 'B',
    // },
    // {
    //   label: 'Mahadev K. Mangavate (Deputy G.M.)',
    //   value: 'C',
    // },
    // {
    //   label: 'Ramesh G. Kumbhar (Deputy G.M.)',
    //   value: 'D',
    // },
    // {
    //   label: 'Suresh K. Mane (Deputy G.M.)',
    //   value: 'E',
    // },
    // {
    //   label: 'Bahaddur A. Gurav (Deputy G.M.)',
    //   value: 'F',
    // },
    // {
    //   label: 'Shivaputra M. Dabb (Deputy G.M.)',
    //   value: 'G',
    // },


  ];

  selectedValue = { label: '', value: '' };



  isButtonSpinning = false
  @Input() drawerClose: Function;
  @Input() data: Proposal;
  @Output() fsubmit = new EventEmitter<string>();
  @Input() CURRENT_STAGE_ID: number;
  REMARKS: string = ""
  STATUS = 'A'
  installmentFrequencyData: any;
  termdata: any
  isSpinning = false
  fileDataFile1: File = null
  fileDataFile2: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = ""
  fkey2 = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  pipe = new DatePipe('en-US');
  converted: any;
  loadingLoanTypes = false
  isSpinning1 = false
  browserLang = 'kn';
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fkey1 = this.api.sanctionFkey
    this.fkey2 = this.api.sanctionFkey2
    this.browserLang = localStorage.getItem('locale');
    this.api.getAllInstallmentFrequency(0, 0, 'ID', "asc", "AND IS_ACTIVE = '1'").subscribe(data => {
      if (data['code'] == "200") {
        this.installmentFrequencyData = data['data'];
        this.isSpinning1 = false
      }
    }, err => {
      //console.log(err);
    });
    this.api.getAllTermofLoan(1, 20, 'ID', "asc", "").subscribe(data => {
      if (data['code'] == "200") {
        this.termdata = data['data'];
        this.isSpinning1 = false;
        // this.calcYear(this.data.TENURE_OF_LOAN)

      }
    }, err => {
      //console.log(err);
    });
  }
  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.fileDataFile1 = null
    this.fileDataFile2 = null
  }

  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
  }

  onFileSelectedFile2(event) {
    this.fileDataFile2 = <File>event.target.files[0];
  }


  calcInstallments(event) {
    this.data.TYPE_OF_INSTALLMENT = event;
    // if(this.data.TERM_ID)


    if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != 0) {
      var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
      var name = terdata[0]['NAME']
      var d = name.split('(')
      var year = Number(d[1].substr(0, 1))
      console.log(year);
      if (this.data.TYPE_OF_INSTALLMENT == 2)
        this.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 3)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 4)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 5)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 6)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 10)
        this.INSTALLMENT_COUNT = 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 7)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 8)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 11)
        this.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 12)
        this.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
      this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
      // console.log(this.INSTALLMENT_COUNT);
      console.log(this.data.EMI_AMOUNT);

    } else {
      this.INSTALLMENT_COUNT = 0
    }


  }
  INSTALLMENT_COUNT = 0
  calcInstallments2(event) {
    this.data.TERM_OF_LOAN = event;


    if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != null) {
      var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
      var name = terdata[0]['NAME']
      var d = name.split('(')
      var year = Number(d[1].substr(0, 1))
      console.log(year);

      if (this.data.TYPE_OF_INSTALLMENT == 2)
        this.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 3)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 4)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 5)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 6)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 10)
        this.INSTALLMENT_COUNT = 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 7)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 8)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 11)
        this.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 12)
        this.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
      this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
      // console.log(this.INSTALLMENT_COUNT);
      console.log(this.data.EMI_AMOUNT);

    } else {
      this.INSTALLMENT_COUNT = 0
    }


  }
  calcInstallments1(event) {
    this.data.SANCTION_AMOUNT = event;


    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.SANCTION_AMOUNT == null || this.data.SANCTION_AMOUNT == 0) {
      this.data.AMOUNT_IN_WORDS = ""

    }
    else {
      this.data.AMOUNT_IN_WORDS = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });

    }
    if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != null) {
      var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
      var name = terdata[0]['NAME']
      var d = name.split('(')
      var year = Number(d[1].substr(0, 1))
      console.log(year);

      if (this.data.TYPE_OF_INSTALLMENT == 2)
        this.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 3)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 4)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 5)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 6)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 10)
        this.INSTALLMENT_COUNT = 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 7)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 8)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 11)
        this.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 12)
        this.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
      this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
      // console.log(this.INSTALLMENT_COUNT);
      console.log(this.data.EMI_AMOUNT);

    } else {
      this.INSTALLMENT_COUNT = 0
    }

  }

  // save() {
  //   console.log("signature : ", this.data.SIGNATURE);
  //   if (this.STATUS == 'F' || this.STATUS == 'R') {
  //     this.data.SANCTION_FILE = ''
  //     this.data.SCRUTINY_FILE = ''
  //     console.log("Remark : ", this.REMARKS);

  //     if (this.STATUS == 'R') {
  //       var nextStageId = 6
  //     } else {
  //       var nextStageId = 12
  //     }
  //     if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

  //       this.isButtonSpinning = true
  //       // //console.log(nextStageId, this.data.ID)
  //       this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0)
  //         .subscribe(successCode => {
  //           // //console.log(successCode)
  //           this.isButtonSpinning = false

  //           if (successCode['code'] == "200") {
  //             if (this.STATUS == 'R') {
  //               var LOG_ACTION = 'Proposal has rejected by Board '

  //               var DESCRIPTION = sessionStorage.getItem('userName') + ' has marked proposal' + this.data['LOAN_KEY'] + ' as rejected on behalf of board and given remark -' + this.REMARKS
  //               var LOG_TYPE = 'I'
  //               this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 6, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
  //                 .subscribe(successCode => {
  //                   if (successCode['code'] == "200") {
  //                   }
  //                 });
  //             }
  //             if (this.STATUS == 'F') {
  //               var LOG_ACTION = 'Proposal resent to refill infomration'

  //               var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
  //               var LOG_TYPE = 'I'
  //               this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
  //                 .subscribe(successCode => {
  //                   if (successCode['code'] == "200") {
  //                   }
  //                 });
  //             }
  //             this.drawerClose()
  //             this.logtext = 'FinalApproval  - Proposal Rejected  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);

  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -   Proposal Rejected  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);


  //                 }
  //               });


  //           }
  //           else {

  //             this.isButtonSpinning = false

  //             this.logtext = ' FinalApproval  -  Proposal Rejected  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);


  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -  Proposal Rejected  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //             this.isButtonSpinning = false

  //           }
  //         });
  //     } else {
  //     } this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //   } else {
  //     if (this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != '' &&
  //       this.data.RESOLUTION_NO != undefined && this.data.RESOLUTION_NO != 0 &&
  //       this.data.RATE_OF_INTEREST != undefined &&
  //       this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0 &&
  //       this.data.SIGNATURE != undefined && this.data.SIGNATURE != ''
  //     ) {
  //       if (this.data.SANCTION_DATE) {

  //         var conformedPhoneNumber = conformToMask(
  //           this.data.SANCTION_DATE,
  //           this.mask,
  //           { guide: false }
  //         )
  //         const str = conformedPhoneNumber.conformedValue.split('/');

  //         const year = Number(str[2]);
  //         const month = Number(str[1]) - 1;
  //         const dates = Number(str[0]);

  //         this.converted = new Date(year, month, dates)


  //         // if (this.converted <= new Date()) {
  //         this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //         this.REMARKS = ''
  //         if (this.fileDataFile1 && this.fileDataFile1) {
  //           this.isSpinning = true
  //           var fileExt = this.fileDataFile1.name.split('.').pop();
  //           var fileExt2 = this.fileDataFile2.name.split('.').pop();

  //           this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.fkey1)
  //             .subscribe(successCode => {
  //               //console.log(successCode)
  //               if (successCode['code'] == 200) {
  //                 let lkey = successCode['data'][0]['L_KEY']

  //                 this.api.onUploadNewMethod(this.fileDataFile2, fileExt2, this.fkey2)
  //                   .subscribe(successCode => {
  //                     //console.log(successCode)
  //                     if (successCode['code'] == 200) {
  //                       let lkey1 = successCode['data'][0]['L_KEY']

  //                       this.data.SANCTION_FILE = lkey;
  //                       this.data.SCRUTINY_FILE = lkey1
  //                       this.saveData();

  //                       //console.log(lkey, lkey1, this.REMARK)
  //                     }
  //                     else {
  //                       //console.log(successCode)
  //                     }
  //                   });
  //               }
  //               else {
  //                 //console.log(successCode)
  //               }
  //             });
  //         }
  //         else {
  //           if (this.fileDataFile1 == null && this.fileDataFile2 == null)
  //             this.message.error(this.api.translate.instant('basicinfo.m19'), "");
  //         }
  //         // } else {

  //         //   this.message.error('Sanction Date cannot be in the future', '');
  //         // }
  //       }
  //       else {
  //         this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //       }
  //     } else {
  //       this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  //     }


  //   }

  // }


  
  save() {
    console.log("signature : ", this.data.SIGNATURE);
    if (this.STATUS == 'F' || this.STATUS == 'R') {
      this.data.SANCTION_FILE = ''
      this.data.SCRUTINY_FILE = ''
      console.log("Remark : ", this.REMARKS);

      if (this.STATUS == 'R') {
        var nextStageId = 6
      } else {
        var nextStageId = 12
      }
      if (this.REMARKS != undefined && this.REMARKS.trim() != '') {

        this.isButtonSpinning = true
        // //console.log(nextStageId, this.data.ID)
        this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0)
          .subscribe(successCode => {
            // //console.log(successCode)
            this.isButtonSpinning = false

            if (successCode['code'] == "200") {
              if (this.STATUS == 'R') {
                var LOG_ACTION = 'Proposal has rejected by Board '

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has marked proposal' + this.data['LOAN_KEY'] + ' as rejected on behalf of board and given remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 6, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
              }
              if (this.STATUS == 'F') {
                var LOG_ACTION = 'Proposal resent to refill infomration'

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
              }
              this.drawerClose()
              this.logtext = 'FinalApproval  - Proposal Rejected  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);

                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -   Proposal Rejected  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);


                  }
                });


            }
            else {

              this.isButtonSpinning = false

              this.logtext = ' FinalApproval  -  Proposal Rejected  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);


                  }
                });
              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -  Proposal Rejected  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // //console.log(successCode);
                  }
                  else {
                    // //console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");

              this.isButtonSpinning = false

            }
          });
      } else {
      } this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {
      if (this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != '' &&
        this.data.RESOLUTION_NO != undefined && this.data.RESOLUTION_NO != 0 &&
        this.data.RATE_OF_INTEREST != undefined &&
        this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0 &&
        this.data.SIGNATURE != undefined && this.data.SIGNATURE != ''
      ) {
        if (this.data.SANCTION_DATE) {

          var conformedPhoneNumber = conformToMask(
            this.data.SANCTION_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)


          // if (this.converted <= new Date()) {
          this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'dd-MM-yyyy');
          this.REMARKS = ''
          if (this.fileDataFile1 && this.fileDataFile1) {
            this.isSpinning = true
            var fileExt = this.fileDataFile1.name.split('.').pop();
            var fileExt2 = this.fileDataFile2.name.split('.').pop();

            this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.fkey1)
              .subscribe(successCode => {
                //console.log(successCode)
                if (successCode['code'] == 200) {
                  let lkey = successCode['data'][0]['L_KEY']

                  this.api.onUploadNewMethod(this.fileDataFile2, fileExt2, this.fkey2)
                    .subscribe(successCode => {
                      //console.log(successCode)
                      if (successCode['code'] == 200) {
                        let lkey1 = successCode['data'][0]['L_KEY']

                        this.data.SANCTION_FILE = lkey;
                        this.data.SCRUTINY_FILE = lkey1

                        console.log(lkey, lkey1 ,"lkeyyyyyy")
                        this.saveData();

                        // console.log(lkey, lkey1 ,"lkeyyyyyy")
                      }
                      else {
                        //console.log(successCode)
                      }
                    });
                }
                else {
                  //console.log(successCode)
                }
              });
          }
          else {
            if (this.fileDataFile1 == null && this.fileDataFile2 == null)
              this.message.error(this.api.translate.instant('basicinfo.m19'), "");
          }
          // } else {

          //   this.message.error('Sanction Date cannot be in the future', '');
          // }
        }
        else {
          this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
        }
      } else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }


    }

  }

  saveRefill() {
    let nextStageId = 8
    let BRANCH_OPINION_TEXT = ''
    // //console.log(nextStageId, this.data.ID)
    this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, BRANCH_OPINION_TEXT, this.data.ID, 0)
      .subscribe(successCode => {
        // //console.log(successCode)
        this.isButtonSpinning = false

        if (successCode['code'] == "200") {

          this.close()
          // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

          // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
          var LOG_ACTION = 'Proposal resent to refill infomration'

          var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
          var LOG_TYPE = 'I'
          this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 17, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
              }
            });

          // this.drawerClose()
          this.logtext = 'SubmitForScrutiny  - Submit For Refill  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                console.log(successCode, "hieee");
              }
              else {
                // //console.log(successCode);

              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -   Submit For Refill  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);


              }
            });
          this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          this.fsubmit.emit()

        }
        else {

          this.isButtonSpinning = false

          this.logtext = ' SubmitForScrutiny  -  Submit For Refill  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);


              }
            });
          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -  Submit For Refill  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // //console.log(successCode);
              }
              else {
                // //console.log(successCode);
              }
            });
          this.message.error(this.api.translate.instant('common.message.error.failed'), "");

          this.isButtonSpinning = false

        }
      });
  }

  // saveData() {
  //   console.log(this.data.SANCTION_FILE, "hieee");
  //   console.log(this.data.SCRUTINY_FILE, "vfgdf");
  //   if (this.data.SANCTION_FILE.trim() != '' && this.data.SCRUTINY_FILE.trim() != '') {
  //     this.isButtonSpinning = true
  //     let nextStageId = 12
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
  //       this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
  //       this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
  //       nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.SCRUTINY_FILE,this.data.HAND_WRITTEN_AMT_IN_WORDS1)
  //       .subscribe(successCode => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false
  //         if (successCode['code'] == "200") {
  //           // this.drawerClose()
  //           this.logtext = 'SubmitProposal - Submit Proposal form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -   Submit Proposal " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //           this.close()
  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' SubmitProposal -  Submit Proposal form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -  Submit Proposal Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   }
  // }


  saveData() {
    if (this.data.SANCTION_FILE.trim() != '' && this.data.SCRUTINY_FILE.trim() != '') {
      this.isButtonSpinning = true
      let nextStageId = 12
      // //console.log(nextStageId, this.data.ID)
      this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
        this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
        this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
        nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.SCRUTINY_FILE,this.data.HAND_WRITTEN_AMT_IN_WORDS1)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning = false
          if (successCode['code'] == "200") {
            // this.drawerClose()
            this.logtext = 'SubmitProposal - Submit Proposal form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -   Submit Proposal " + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);


                }
              });
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.close()
          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' SubmitProposal -  Submit Proposal form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);


                }
              });
            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -  Submit Proposal Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);
                }
              });
            this.message.error(this.api.translate.instant('common.message.error.failed'), "");

            this.isButtonSpinning = false

          }
        });
    } else {
      this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
    }
  }


  close() {
    this.drawerClose()
  }
}

