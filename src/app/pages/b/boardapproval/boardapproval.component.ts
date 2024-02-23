import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
@Component({
  selector: 'app-boardapproval',
  templateUrl: './boardapproval.component.html',
  styleUrls: ['./boardapproval.component.css']
})
export class BoardapprovalComponent implements OnInit {
  isButtonSpinning = false
  @Input() drawerClose: Function;
  @Input() data: Proposal;
  REMARKS: string = ""
  STATUS = 'A'
  isSpinning = false
  fileDataFile1: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  pipe = new DatePipe('en-US');
  converted: any;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.fkey1 = this.api.documentFkey
  }

  //for date 

  getdata() {
    this.data.SANCTION_DATE = this.datePipe.transform(this.data.SANCTION_DATE, 'dd/MM/yyyy');
  }
  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.fileDataFile1 = null
  }

  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
  }


  save() {
    if (this.STATUS == 'F' || this.STATUS == 'R') {
      this.data.SANCTION_FILE = ''
      if (this.STATUS == 'R') {
        var nextStageId = 6
      } else {
        var nextStageId = 8
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
              // this.drawerClose()
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
        this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0
      ) {
        if (this.data.SANCTION_DATE[0] >= 0 && this.data.SANCTION_DATE[0] <= 9 && this.data.SANCTION_DATE[1] >= 0 && this.data.SANCTION_DATE[1] <= 9 && this.data.SANCTION_DATE[3] >= 0 && this.data.SANCTION_DATE[3] <= 9 && this.data.SANCTION_DATE[4] >= 0 && this.data.SANCTION_DATE[4] <= 9 && this.data.SANCTION_DATE[9] >= 0 && this.data.SANCTION_DATE[9] <= 9 && this.data.SANCTION_DATE[8] >= 0 && this.data.SANCTION_DATE[8] <= 9 && this.data.SANCTION_DATE[7] >= 0 && this.data.SANCTION_DATE[7] <= 9 && this.data.SANCTION_DATE[6] >= 0 && this.data.SANCTION_DATE[6] <= 9) {

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
            this.data.SANCTION_DATE = this.datePipe.transform(this.converted,'dd-MM-yyyy');
            this.REMARKS = ''
            if (this.fileDataFile1) {
              var fileExt = this.fileDataFile1.name.split('.').pop();
              this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.documentFkey)
                .subscribe(successCode => {
                  if (successCode['code'] == 200) {
                    let lkey = successCode['data'][0]['L_KEY']
                    this.data.SANCTION_FILE = lkey;
                    this.saveData();
                  }
                  else {
                    //console.log(successCode)
                  }
                });
            }
            else {
              if (this.fileDataFile1 == null)
                this.message.error(this.api.translate.instant('basicinfo.m19'), "");
            }
          // } else {

          //   this.message.error('Sanction Date cannot be in the future', '');
          // }
        }
        else {
          this.message.error('Invalid Sanction Date ', '')
        }
      } else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }


    }

  }
  saveData() {
    if (this.data.SANCTION_FILE.trim() != '') {
      this.isButtonSpinning = true
      let nextStageId = 12
      // //console.log(nextStageId, this.data.ID)
      this.api.passToMainBranch2(this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST, this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID, nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE)
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

