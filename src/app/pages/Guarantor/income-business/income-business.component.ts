import { Component, Input, OnInit } from '@angular/core';
import { GuarantorBusinessInfo } from 'src/app/Models/PersonalProposal/guarantor-business-info';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService} from 'ng-zorro-antd';


@Component({
  selector: 'app-income-business',
  templateUrl: './income-business.component.html',
  styleUrls: ['./income-business.component.css']
})
export class IncomeBusinessComponent implements OnInit {
  @Input() bdrawerClose: Function;
  @Input() data4: GuarantorBusinessInfo;
  @Input() PROPOSAL_ID: number
  @Input() GUARANTOR_INCOME_INFORMATION_ID 


  b_drawerVisible: boolean;
  b_drawerData : GuarantorBusinessInfo = new GuarantorBusinessInfo();

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  getBusiness(){
    this.api.getGuarantorBusinessInformation(this.GUARANTOR_INCOME_INFORMATION_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data4 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data4.GUARANTOR_INCOME_INFORMATION_ID = this.GUARANTOR_INCOME_INFORMATION_ID
    if(this.data4.ID){
      this.api.updateGuarantorBusinessInformation(this.data4).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getBusiness();
            this.bdrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
    else{
      this.api.createGuarantorBusinessInformation(this.data4).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getBusiness();
            this.bdrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
  }

}

