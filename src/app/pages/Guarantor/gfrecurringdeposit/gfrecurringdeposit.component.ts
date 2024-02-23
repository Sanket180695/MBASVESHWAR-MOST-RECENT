import { Component, Input, OnInit } from '@angular/core';
import { GuarantorAllDeposits } from 'src/app/Models/PersonalProposal/guarantor-all-deposits';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { conformToMask } from 'angular2-text-mask';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-gfrecurringdeposit',
  templateUrl: './gfrecurringdeposit.component.html',
  styleUrls: ['./gfrecurringdeposit.component.css']
})
export class GfrecurringdepositComponent implements OnInit {

  @Input() rdrawerClose: Function;
  @Input() data: GuarantorAllDeposits;
  @Input() G_ID;
  @Input() CURRENT_STAGE_ID: number;

  r_drawerVisible: boolean;
  r_drawerData : GuarantorAllDeposits = new GuarantorAllDeposits();

  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  close(){
    this.rdrawerClose()
  }

  getRecurringDeposit(){
    this.api.getGuarantorRecurringInformation(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data.G_ID = this.G_ID
    if(this.data.ID){
      this.api.updateGuarantorRecurringInformation(this.data).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getRecurringDeposit();
            this.rdrawerClose();
          }
        }
      )
    }
    else{
      this.api.createGuarantorRecurringInformation(this.data).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getRecurringDeposit();
            this.rdrawerClose();
          }
        }
      )
    }
  }



}
