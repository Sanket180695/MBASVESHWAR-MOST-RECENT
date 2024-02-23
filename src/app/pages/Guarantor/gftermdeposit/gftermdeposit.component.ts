import { Component, Input, OnInit } from '@angular/core';
import { GuarantorAllDeposits } from 'src/app/Models/PersonalProposal/guarantor-all-deposits';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { conformToMask } from 'angular2-text-mask';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-gftermdeposit',
  templateUrl: './gftermdeposit.component.html',
  styleUrls: ['./gftermdeposit.component.css']
})
export class GftermdepositComponent implements OnInit {

  @Input() tdrawerClose: Function;
  @Input() data3: GuarantorAllDeposits;
  @Input() G_ID;
  @Input() CURRENT_STAGE_ID: number;

  t_drawerVisible: boolean;
  t_drawerData : GuarantorAllDeposits = new GuarantorAllDeposits();

  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  close(){
    this.tdrawerClose()
  }

  getTermDeposit(){
    this.api.getGuarantorTermInformation(this.G_ID).subscribe(
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
      this.api.updateGuarantorTermInformation(this.data3).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getTermDeposit();
            this.tdrawerClose();
          }
        }
      )
    }
    else{
      this.api.createGuarantorTermInformation(this.data3).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getTermDeposit();
            this.tdrawerClose();
          }
        }
      )
    }
  }

 

}
