import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { GuarantorOtherInfo } from 'src/app/Models/PersonalProposal/guarantor-other-info';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-income-other',
  templateUrl: './income-other.component.html',
  styleUrls: ['./income-other.component.css']
})
export class IncomeOtherComponent implements OnInit {

  @Input() odrawerClose: Function;
  @Input() data4: GuarantorOtherInfo;
  @Input() GUARANTOR_INCOME_INFORMATION_ID 


  o_drawerVisible: boolean;
  o_drawerData : GuarantorOtherInfo = new GuarantorOtherInfo();

  

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  
  getOther(){
    this.api.getGuarantorOtherInformation(this.GUARANTOR_INCOME_INFORMATION_ID).subscribe(
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
      this.api.updateGuarantorOtherInformation(this.data4).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getOther();
            this.odrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
    else{
      this.api.createGuarantorOtherInformation(this.data4).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getOther();
            this.odrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
  }

}
