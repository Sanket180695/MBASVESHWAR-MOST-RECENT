import { Component, Input, OnInit } from '@angular/core';
import { GcLoanGuarantee } from 'src/app/Models/PersonalProposal/gc-loan-guarantee';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { conformToMask } from 'angular2-text-mask';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-credit-loan-guarantee',
  templateUrl: './credit-loan-guarantee.component.html',
  styleUrls: ['./credit-loan-guarantee.component.css']
})
export class CreditLoanGuaranteeComponent implements OnInit {

  @Input() drawerCloseLoanGuarantee: Function;
  @Input() data2: GcLoanGuarantee;
  @Input() G_ID
  @Input() CURRENT_STAGE_ID: number;
  @Input() loans: any;

  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()

  drawerVisible_LoanGuarantee : boolean;
  drawer_LoanGuarantee  : GcLoanGuarantee = new GcLoanGuarantee();

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  browserLang = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');

  }

  close(){
    this.drawerCloseLoanGuarantee()
  }

  getLoanGuarantee(){
    this.api.getGuarantorCreditLoanGuarantee(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data2 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data2.G_ID = this.G_ID
    if(this.data2.ID){
      this.api.updateGuarantorCreditLoanGuarantee(this.data2).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getLoanGuarantee();
            this.drawerCloseLoanGuarantee();
          }
        }
      )
    }
    else{
      this.api.createGuarantorCreditLoanGuarantee(this.data2).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getLoanGuarantee();
            this.drawerCloseLoanGuarantee();
          }
        }
      )
    }
  }

}
