import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { GuarantorHouseInfo } from 'src/app/Models/PersonalProposal/guarantor-house-info';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-income-house',
  templateUrl: './income-house.component.html',
  styleUrls: ['./income-house.component.css']
})
export class IncomeHouseComponent implements OnInit {

  @Input() hdrawerClose: Function;
  @Input() data25: GuarantorHouseInfo;
  @Input() GUARANTOR_INCOME_INFORMATION_ID 


  h_drawerVisible: boolean;
  h_drawerData : GuarantorHouseInfo = new GuarantorHouseInfo();

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  getHouse(){
    this.api.getGuarantorHouseInformation(this.data25.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data25 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data25.GUARANTOR_INCOME_INFORMATION_ID = this.GUARANTOR_INCOME_INFORMATION_ID
    if(this.data25.ID){
      this.api.updateGuarantorHouseInformation(this.data25).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getHouse();
            this.hdrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
    else{
      this.api.createGuarantorHouseInformation(this.data25).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getHouse();
            this.hdrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
  }

}
