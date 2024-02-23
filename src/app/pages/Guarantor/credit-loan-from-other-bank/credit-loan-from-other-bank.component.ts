import { Component, Input, OnInit } from '@angular/core';
import { GcLoanFromOthersBank } from 'src/app/Models/PersonalProposal/gc-loan-from-others-bank';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-credit-loan-from-other-bank',
  templateUrl: './credit-loan-from-other-bank.component.html',
  styleUrls: ['./credit-loan-from-other-bank.component.css']
})
export class CreditLoanFromOtherBankComponent implements OnInit {

  @Input() drawerCloseOthersBank: Function;
  @Input() data4: GcLoanFromOthersBank;
  @Input() G_ID
  @Input() CURRENT_STAGE_ID: number;

  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()

  drawerVisible_OtherBank : boolean;
  drawer_OtherBank : GcLoanFromOthersBank = new GcLoanFromOthersBank();

  browserLang = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');

  }

  close(){
    this.drawerCloseOthersBank()
  }

  getLoanFromOtherBank(){
    this.api.getGuarantorCreditLoanFromOtherBank(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data4 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data4.G_ID = this.G_ID
    if(this.data4.ID){
      this.api.updateGuarantorCreditLoanFromOtherBank(this.data4).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getLoanFromOtherBank();
            this.drawerCloseOthersBank();
          }
        }
      )
    }
    else{
      this.api.createGuarantorCreditLoanFromOtherBank(this.data4).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getLoanFromOtherBank();
            this.drawerCloseOthersBank();
          }
        }
      )
    }
  }

}
