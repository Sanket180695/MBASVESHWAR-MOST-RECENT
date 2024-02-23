import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { GuarantorSalariedInfo } from 'src/app/Models/PersonalProposal/guarantor-salaried-info';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-income-salary',
  templateUrl: './income-salary.component.html',
  styleUrls: ['./income-salary.component.css']
})
export class IncomeSalaryComponent implements OnInit {
  @Input() sdrawerClose: Function;
  @Input() data1: GuarantorSalariedInfo;
  @Input() GUARANTOR_INCOME_INFORMATION_ID 
  s_drawer: GuarantorSalariedInfo = new GuarantorSalariedInfo();
  

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  getSalary(){
    this.api.getAllGuarantorSalariedInformation(this.GUARANTOR_INCOME_INFORMATION_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data1 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data1.GUARANTOR_INCOME_INFORMATION_ID = this.GUARANTOR_INCOME_INFORMATION_ID
    if(this.data1.ID){
      this.api.updateGuarantorSalariedInformation(this.data1).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getSalary();
            this.sdrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
    else{
      this.api.createGuarantorSalariedInformation(this.data1).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getSalary();
            this.sdrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
  }

}
