import { Component, Input, OnInit } from '@angular/core';
import { GcLoanFromThisBank } from 'src/app/Models/PersonalProposal/gc-loan-from-this-bank';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { conformToMask } from 'angular2-text-mask';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';



@Component({
  selector: 'app-credit-loan-from-this-bank',
  templateUrl: './credit-loan-from-this-bank.component.html',
  styleUrls: ['./credit-loan-from-this-bank.component.css']
})
export class CreditLoanFromThisBankComponent implements OnInit {

  @Input() drawerCloseThisBank: Function;
  @Input() data1: GcLoanFromThisBank;
  @Input() G_ID
  @Input() loans: any;
  @Input() CURRENT_STAGE_ID: number;
  @Input() LOAN_KEY: Number;
  

  drawerVisible_ThisBank : boolean;
  drawer_ThisBank : GcLoanFromThisBank = new GcLoanFromThisBank();

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  browserLang= '';

  logtext: string = "";
  userId = sessionStorage.getItem('userId');

  branchData: any;
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.branchData = successCode['data'];
        }
      });
  }

  getLoanFromThisBank(){
    this.api.getGuarantorCreditLoanFromThisBank(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data1 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data1.G_ID = this.G_ID
    if(this.data1.ID){
      this.api.updateGuarantorCreditLoanFromThisBank(this.data1).subscribe(
        successCode => {
          if(successCode['code']== 200){

            this.logtext = 'Save & Close - Bank Loan form - SUCCESS ' + JSON.stringify(this.data1) + " KEYWORD [U - BankLoan ]";
              this.api.addLog('A', this.logtext, this.userId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });

            this.getLoanFromThisBank();
            this.drawerCloseThisBank();
          }
        }
      )
    }
    else{
      this.api.createGuarantorCreditLoanFromThisBank(this.data1).subscribe(
        successCode => {
          if(successCode['code'] == 200){

            this.logtext = 'Save & Close - BankLoan form - SUCCESS - ' + JSON.stringify(this.data1) + " KEYWORD [C - BankLoan ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.getLoanFromThisBank();
            this.drawerCloseThisBank();
          }
        }
      )
    }
  }

  close(){
    this.drawerCloseThisBank()
  }


}
