import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-send-to-legal-opinion',
  templateUrl: './send-to-legal-opinion.component.html',
  styleUrls: ['./send-to-legal-opinion.component.css']
})
export class SendToLegalOpinionComponent implements OnInit {

  @Input() data: Proposal;
  @Input() drawerCloseLegalOpinion: Function;
  @Output() fsubmit = new EventEmitter<string>();

  isButtonSpinning2 = false
  logtext = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  isButtonSpinning = false
  userId = sessionStorage.getItem("userId")



  constructor(public sanitizer: DomSanitizer, private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  save(status) {
    var st = true;

    if (this.data.REMARK_LEGAL_OPINION != "") {
    }
    else {
      st = false;
      this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
    }

    if (this.data.SANCTION_AMOUNT1 == undefined) {
      this.data.SANCTION_AMOUNT1 = 0;
    }

    if (this.data.REMARK_LEGAL_OPINION != "" && this.data.SANCTION_AMOUNT1 != undefined) {
    }
    else {
      st = false;
      this.message.error(this.api.translate.instant('cibilchecking.message1'), "");
    }


    if (status == 'V') {
      let nextStageId = 18
      // //console.log(nextStageId, this.data.ID)
      this.api.updateLegalOpinion(this.data.SANCTION_AMOUNT1, this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK_LEGAL_OPINION, this.data.ID, 0)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning2 = false

          if (successCode['code'] == "200") {
            var LOG_ACTION = 'Sent to Legal Opinion'
            var DESCRIPTION = sessionStorage.getItem('userName') + ' uploaded sanction amount  ' + this.data['LOAN_KEY'] + ' and send proposal to legal opinion stage'
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 18, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            this.drawerCloseLegalOpinion()
            this.logtext = 'Update Status - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - Sanction Amount ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " LegalOpinion -   Sanction Amount Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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

            this.logtext = ' Legal Opinion -   Sanction Amount Upload - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - LegalOpinion ]";
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
            this.userActivityLogData.ACTIVITY_DETAILS = " LegalOpinion -   Sanction Amount Upload" + "Stage Id" + nextStageId + JSON.stringify(this.data)
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
      this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK_LEGAL_OPINION, this.data.ID, 0)
        .subscribe(successCode => {
          // //console.log(successCode)
          this.isButtonSpinning = false

          if (successCode['code'] == "200") {


            // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

            // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
            var LOG_ACTION = 'Proposal resent to refill infomration'

            var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.data.REMARK_LEGAL_OPINION
            var LOG_TYPE = 'I'
            this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 16, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                }
              });

            this.drawerCloseLegalOpinion()
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

  reject() {
    this.isButtonSpinning = true;
    var nextStageId = 6;

    if (this.data.REMARK_LEGAL_OPINION != undefined && this.data.REMARK_LEGAL_OPINION.trim() != '') {

      this.isButtonSpinning = true
      // //console.log(nextStageId, this.data.ID)
      this.api.updateStatus2(this.data.CURRENT_STAGE_ID, nextStageId, this.data.REMARK_LEGAL_OPINION, this.data.ID, 0, this.data.PROPOSAL_REPORT)
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
            this.drawerCloseLegalOpinion();

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
