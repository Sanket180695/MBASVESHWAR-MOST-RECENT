import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { ProposaldocumentComponent } from '../../Proposals/proposaldocument/proposaldocument.component';

@Component({
  selector: 'app-send-to-valuation-stage',
  templateUrl: './send-to-valuation-stage.component.html',
  styleUrls: ['./send-to-valuation-stage.component.css']
})
export class SendToValuationStageComponent implements OnInit {

  @Input() data: Proposal;
  @Input() drawerCloseValuationStage: Function;
  @Output() fsubmit = new EventEmitter<string>();
  @ViewChild(ProposaldocumentComponent) proposalDocument: ProposaldocumentComponent;

  fileData_REPORT_URL: File = null
  valuationReportUrl: string = ""
  fkey = this.api.valuationFkey

  isButtonSpinning2 = false
  logtext = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  isButtonSpinning = false
  userId = sessionStorage.getItem("userId")

  url: string = ""
  urlSafe: SafeResourceUrl;

  drawerVisibleValuationStage: boolean;
  drawerTitleValuationStage: string;
  drawerDataValuationStage: Proposal = new Proposal();

  public mask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe("dd/mm/yyyy HH:MM");

  isSpinning = false
  isSpinning1 = false
  isSpinning2 = false
  isSpinning3 = false

  constructor(public sanitizer: DomSanitizer, private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  save(status) {
    var st = true;

    if (this.data.REMARK_VALUATION_STAGE != "") {
    }
    else {
      st = false;
      this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
    }

    if (status == 'V') {
      let nextStageId = 18
      // //console.log(nextStageId, this.data.ID)
      this.api.updateSendToValuation(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK_VALUATION_STAGE, this.data.ID, 0)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning2 = false

          if (st == true) {
            this.isButtonSpinning2 = true;
            if (this.fileData_REPORT_URL) {
              var fileExt = this.fileData_REPORT_URL.name.split('.').pop();
              var lkey = ""
              this.api.onUploadNewMethod(this.fileData_REPORT_URL, fileExt, this.fkey)
                .subscribe(successCode => {
                  if (successCode['code'] == 200) {
                    lkey = successCode['data'][0]['L_KEY']
                    this.valuationReportUrl = lkey
                    this.updateData(status)
                  }
                  else {
                  }
                });
            } else {
              this.valuationReportUrl = " ";
              this.updateData(status)
            }
          }

          if (successCode['code'] == "200") {
            var LOG_ACTION = 'Sent to HO'
            var DESCRIPTION = sessionStorage.getItem('userName') + ' uploaded valuation note  ' + this.data['LOAN_KEY'] + ' and send proposal to legal opinion stage'
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 3, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            this.drawerCloseValuationStage()
            this.logtext = 'Update Status - Valuation Note - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ValuationNote ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);
                  this.isButtonSpinning2 = false


                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " ValuationNote -   Valuation Note Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
            this.userActivityLogData.ACTIVITY_TIME = new Date()
            this.api.createUserActivityLog(this.userActivityLogData)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);
                  this.isButtonSpinning = false

                }
              });


          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' ValuationStage -   Valuation Note Upload - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - ValuationStage ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " ValuationStage -   Valuation Note Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
    else {
      let nextStageId = 8
      // //console.log(nextStageId, this.data.ID)
      this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK_VALUATION_STAGE, this.data.ID, 0)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {


            // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

            // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
            var LOG_ACTION = 'Proposal resent to refill infomration'

            var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.data.REMARK_VALUATION_STAGE
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 15, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            this.drawerCloseValuationStage()
            this.logtext = 'ValuationStage  - Submit For Refill  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ValuationStage ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " ValuationStage  -   Submit For Refill  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
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

            this.logtext = ' ValuationStage  -  Submit For Refill  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - LegalOpinion ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " ValuationStage  -  Submit For Refill  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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


  }

  onFileSelectedVALUATION_NOTE(event) {
    this.fileData_REPORT_URL = <File>event.target.files[0];
  }

  reset() {
    this.data.REMARK_VALUATION_STAGE = null;
    this.fileData_REPORT_URL = null;
  }

  updateData(val) {
    this.api.updateValuationNote(this.valuationReportUrl, this.data.ID, this.data.CURRENT_STAGE_ID, 17, this.data.REMARK_VALUATION_STAGE, 1)
      .subscribe(successCode => {


        if (successCode['code'] == "200") {

          if (val == "V" || val == "H" || val == "R") {
            this.drawerCloseValuationStage()
            this.reset();
            this.isSpinning = false
            this.isSpinning1 = false
            this.isSpinning2 = false
            this.isSpinning3 = false
          }
          else {
            this.drawerCloseValuationStage()
            // this.drawerTitleLocalBoard = this.api.translate.instant('cibilchecking.lebel12')
            this.drawerVisibleValuationStage = true
            this.drawerDataValuationStage = Object.assign({}, this.data);
            this.proposalDocument.getAllProposalDocuments(this.data)
            //this.proposalDocument.getLinkUrl("http://117.204.250.156:1470/userresponses/"+this.data.BOT_REPLY_ID)
            // this.proposalDocument.getLinkUrl("http://bot.tecpool.in/userresponses/"+this.data.BOT_REPLY_ID)
            this.proposalDocument.getLinkUrl(this.api.chatbotUrl + "userresponses/" + this.data.BOT_REPLY_ID)


            this.proposalDocument.REMARKS = ""
            this.proposalDocument.AMT_INFORMATION = ""
            this.proposalDocument.AMOUNT = undefined
            this.proposalDocument.TIME = undefined
            this.isSpinning = false
            this.isSpinning1 = false
            this.isSpinning2 = false
            this.isSpinning3 = false
          }

          this.logtext = 'Update Status - Valuation Note - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
                this.isSpinning = false
                this.isSpinning1 = false
                this.isSpinning2 = false
                this.isSpinning3 = false
              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = "Valuation Checking -  Valuation Note Clicked" + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
                this.isSpinning = false
                this.isSpinning1 = false
                this.isSpinning2 = false
                this.isSpinning3 = false
              }
            });


        }
        else {
          this.isSpinning = false
          this.isSpinning1 = false
          this.isSpinning2 = false
          this.isSpinning3 = false
          this.logtext = 'Valuation Checking - Valuation Note - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
              }
            });
          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = "Valuation Checking - Valuation uploading Failed" + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode);
              }
              else {
                //console.log(successCode);
              }
            });
          this.message.error(this.api.translate.instant('common.message.error.failed'), "");
          this.isSpinning = false
          this.isSpinning1 = false
          this.isSpinning2 = false
          this.isSpinning3 = false
        }
      });
  }

  reject() {
    this.isButtonSpinning = true;
    var nextStageId = 6;

    if (this.data.REMARK_VALUATION_STAGE != undefined && this.data.REMARK_VALUATION_STAGE.trim() != '') {

      this.isButtonSpinning = true
      // //console.log(nextStageId, this.data.ID)
      this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK_VALUATION_STAGE, this.data.ID, 0, this.data.PROPOSAL_REPORT)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {


            // this.drawerClose()
            this.logtext = 'LoanDisbursment  - Loan reject  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
            this.api.addLog('R', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  // //console.log(successCode);
                }
                else {
                  // //console.log(successCode);

                }
              });

            this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
            this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -   Loan Reject  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
            this.drawerCloseValuationStage();

          }
          else {

            this.isButtonSpinning = false

            this.logtext = ' LoanDisbursment  -  Loan Reject  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " LoanDisbursment  -  Loan Disbursment  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }
    // } else {
    //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
    // }

  }


}
