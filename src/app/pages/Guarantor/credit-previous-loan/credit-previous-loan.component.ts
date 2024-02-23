import { Component, Input, OnInit } from '@angular/core';
import { GcPreviousLoan } from 'src/app/Models/PersonalProposal/gc-previous-loan';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { conformToMask } from 'angular2-text-mask';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-credit-previous-loan',
  templateUrl: './credit-previous-loan.component.html',
  styleUrls: ['./credit-previous-loan.component.css']
})
export class CreditPreviousLoanComponent implements OnInit {

  @Input() drawerClosePreviousLoan: Function;
  @Input() data3: GcPreviousLoan;
  @Input() G_ID
  @Input() loans: any;
  @Input() CURRENT_STAGE_ID: number;
 
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  
  drawerVisible_PreviousLoan : boolean;
  drawer_PreviousLoan : GcPreviousLoan = new GcPreviousLoan();

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  browserLang='';


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
  }

  close(){
    this.drawerClosePreviousLoan()
  }

  getPreviousLoan(){
    this.api.getGuarantorCreditPreviousLoan(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data3 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data3.G_ID = this.G_ID
    if(this.data3.ID){
      this.api.updateGuarantorCreditPreviousLoan(this.data3).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getPreviousLoan();
            this.drawerClosePreviousLoan();
          }
        }
      )
    }
    else{
      this.api.createGuarantorCreditPreviousLoan(this.data3).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getPreviousLoan();
            this.drawerClosePreviousLoan();
          }
        }
      )
    }
  }

}
