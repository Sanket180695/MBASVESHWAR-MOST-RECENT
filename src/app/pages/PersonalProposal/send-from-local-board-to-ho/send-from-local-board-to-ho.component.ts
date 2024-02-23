import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { ProposaldocumentComponent } from '../../Proposals/proposaldocument/proposaldocument.component';


@Component({
  selector: 'app-send-from-local-board-to-ho',
  templateUrl: './send-from-local-board-to-ho.component.html',
  styleUrls: ['./send-from-local-board-to-ho.component.css']
})
export class SendFromLocalBoardToHoComponent implements OnInit {

  @Input() data: Proposal;
  @Input() drawerCloseLocalBoard: Function;
  @Output() fsubmit = new EventEmitter<string>();
  @ViewChild(ProposaldocumentComponent) proposalDocument: ProposaldocumentComponent;

  fileData_REPORT_URL: File = null
  reportUrl: string = ""
  fkey = this.api.localBoardFkey

  url: string = ""
  urlSafe: SafeResourceUrl;

  public mask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe("dd/mm/yyyy HH:MM");

  isSpinning = false
  isSpinning1 = false
  isSpinning2 = false
  isSpinning3 = false

  isButtonSpinning2 = false
  logtext = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  isButtonSpinning = false
  userId = sessionStorage.getItem("userId")


  DOCUMENT_TEXT = ''
  REMARKS = ''
  AMOUNT: number = 0;
  BRANCH_OPINION_TEXT = ''
  IS_IDENTITY_CARD_OBTAINED: boolean
  IS_CHECK_OBTAINED: boolean

  drawerVisibleLocalBoard: boolean;
  drawerTitleLocalBoard: string;
  drawerDataLocalBoard: Proposal = new Proposal();



  constructor(public sanitizer: DomSanitizer, private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  getUrl(url) {
    this.url = url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


  // sendToValuationStage(data: Proposal): void {
  //   this.drawerDataValuationStage = Object.assign({}, data);
  //   this.drawerVisibleValuationStage = true;
  //   this.drawerTitleValuationStage = this.api.translate.instant('cibilchecking.send_to_valuation_stage');
  // }

  // get closeCallBack12() {
  //   return this.drawerCloseValuationStage.bind(this);
  // }

  // drawerCloseValuationStage(): void {
  //   this.drawerVisibleValuationStage = false;
  // }



  save(status) {
    var st = true;

    if (this.data.REMARK != "") {
    }
    else {
      st = false;
      this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
    }

    if (this.data.RECOMMENDED_AMOUNT == undefined) {
      this.data.RECOMMENDED_AMOUNT = 0;
    }

    if (this.data.REMARK != "" && this.data.RECOMMENDED_AMOUNT != undefined) {
    }
    else {
      st = false;
      this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
    }



    if (status == 'V') {
      // this.DOCUMENT_TEXT = ""
      // this.REMARKS = ""
      if (this.data.REMARK != undefined && this.data.REMARK.trim() != '') {
        // if (  this.AMOUNT != 0 && this.AMOUNT != undefined) {
        let nextStageId = 16
        // //console.log(nextStageId, this.data.ID) 
        this.api.updateSendToHo(this.data.RECOMMENDED_AMOUNT, this.data.RESOLUTION_DATE, this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK, this.data.ID, 0)
          .subscribe(successCode => {
            // this.api.updateFillAmount2(this.data.CURRENT_STAGE_ID, ' ', 0,this.data.ID,"B",this.REMARKS )
            //   .subscribe(successCode => {
            // //console.log(successCode)
            this.isButtonSpinning = false


            if (st == true) {
              this.isSpinning3 = true;
              if (this.fileData_REPORT_URL) {
                var fileExt = this.fileData_REPORT_URL.name.split('.').pop();
                var lkey = ""
                this.api.onUploadNewMethod(this.fileData_REPORT_URL, fileExt, this.fkey)
                  .subscribe(successCode => {
                    if (successCode['code'] == 200) {
                      lkey = successCode['data'][0]['L_KEY']
                      this.reportUrl = lkey
                      this.updateData(status)
                    }
                    else {
                    }
                  });
              } else {
                this.reportUrl = " ";
                this.updateData(status)
              }
            }

            this.isButtonSpinning2 = false

            if (successCode['code'] == "200") {
              var LOG_ACTION = 'Sent to HO'
              var DESCRIPTION = sessionStorage.getItem('userName') + ' uploaded local board note  ' + this.data['LOAN_KEY'] + ' and send proposal to valuation stage'
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 16, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });

              this.drawerCloseLocalBoard()
              this.logtext = 'Update Status - Local Board Note - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = " LocalBoard -   Local Board Note Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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

              this.logtext = ' LocalBoard -   Local Board Note Upload - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - LocalBoard ]";
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
              this.userActivityLogData.ACTIVITY_DETAILS = " LocalBoard -   Local Board Note Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }
    } else {
      let nextStageId = 8
      // //console.log(nextStageId, this.data.ID)
      this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK, this.data.ID, 0)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {


            // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

            // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
            var LOG_ACTION = 'Proposal resent to refill infomration'

            var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 9, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            this.drawerCloseLocalBoard()
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





  }

  onFileSelectedLOCAL_BOARD_NOTE(event) {
    this.fileData_REPORT_URL = <File>event.target.files[0];
  }

  reset() {
    this.data.RECOMMENDED_AMOUNT = null;
    this.data.REMARK = null;
    this.fileData_REPORT_URL = null;
    this.data.RESOLUTION_DATE = null;
  }

  updateData(val) {

    // let isCompleted
    // let nextStageId: 16

    this.api.updateNote(this.reportUrl, this.data.ID, this.data.CURRENT_STAGE_ID, 16, this.data.REMARK, 1)
      .subscribe(successCode => {


        if (successCode['code'] == "200") {

          if (val == "V" || val == "H" || val == "R") {
            this.drawerCloseLocalBoard()
            this.reset();
            this.isSpinning = false
            this.isSpinning1 = false
            this.isSpinning2 = false
            this.isSpinning3 = false
          }
          else {
            this.drawerCloseLocalBoard()
            // this.drawerTitleLocalBoard = this.api.translate.instant('cibilchecking.lebel12')
            this.drawerVisibleLocalBoard = true
            this.drawerDataLocalBoard = Object.assign({}, this.data);
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

          this.logtext = 'Update Status - Local Board Note - SUCCESS ' + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
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
          this.userActivityLogData.ACTIVITY_DETAILS = "Local Board Checking -  Local Board Note Clicked" + JSON.stringify(this.data)
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
          this.logtext = 'Local Board Checking - Local Board Note - ERROR - ' + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
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
          this.userActivityLogData.ACTIVITY_DETAILS = "Local Board Checking - Local Board uploading Failed" + JSON.stringify(this.data)
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

    if (this.data.REMARK != undefined && this.data.REMARK.trim() != '') {

      this.isButtonSpinning = true
      // //console.log(nextStageId, this.data.ID)
      this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK, this.data.ID, 0, this.data.PROPOSAL_REPORT)
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
            this.drawerCloseLocalBoard();

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
