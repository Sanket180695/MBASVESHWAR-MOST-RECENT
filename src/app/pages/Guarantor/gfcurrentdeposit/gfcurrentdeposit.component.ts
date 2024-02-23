import { Component, Input, OnInit } from '@angular/core';
import { GuarantorAllDeposits } from 'src/app/Models/PersonalProposal/guarantor-all-deposits';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { conformToMask } from 'angular2-text-mask';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-gfcurrentdeposit',
  templateUrl: './gfcurrentdeposit.component.html',
  styleUrls: ['./gfcurrentdeposit.component.css']
})
export class GfcurrentdepositComponent implements OnInit {
  @Input() cdrawerClose: Function;
  @Input() data45: GuarantorAllDeposits;
  @Input() G_ID;
  @Input() CURRENT_STAGE_ID: number;

  c_drawerVisible: boolean;
  c_drawerData : GuarantorAllDeposits = new GuarantorAllDeposits();

  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];


  constructor(private api: ApiService) {}

  ngOnInit(): void {
  }

  close(){
    this.cdrawerClose()
  }

  getCurrentDeposit(){
    this.api.getGuarantorCurrentInformation(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data45 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data45.G_ID = this.G_ID
    if(this.data45.ID){
      this.api.updateGuarantorCurrentInformation(this.data45).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getCurrentDeposit();
            this.cdrawerClose();
          }
        }
      )
    }
    else{
      this.api.createGuarantorCurrentInformation(this.data45).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getCurrentDeposit();
            this.cdrawerClose();
          }
        }
      )
    }
  }


}
