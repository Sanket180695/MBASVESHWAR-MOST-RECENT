import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { GuarantorExpenditureInfo } from 'src/app/Models/PersonalProposal/guarantor-expenditure-info';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-income-expenditure',
  templateUrl: './income-expenditure.component.html',
  styleUrls: ['./income-expenditure.component.css']
})
export class IncomeExpenditureComponent implements OnInit {

  @Input() edrawerClose: Function;
  @Input() data30: GuarantorExpenditureInfo;
  @Input() GUARANTOR_INCOME_INFORMATION_ID 


  e_drawerVisible: boolean;
  e_drawerData : GuarantorExpenditureInfo = new GuarantorExpenditureInfo();

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  getExpenditure(){
    this.api.getGuarantorExpenditureInformation(this.GUARANTOR_INCOME_INFORMATION_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data30 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data30.GUARANTOR_INCOME_INFORMATION_ID = this.GUARANTOR_INCOME_INFORMATION_ID
    if(this.data30.ID){
      this.api.updateGuarantorExpenditureInformation(this.data30).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getExpenditure();
            this.edrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
    else{
      this.api.createGuarantorExpenditureInformation(this.data30).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getExpenditure();
            this.edrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
  }


  calculate() {
    // console.log(this.data);
    this.data30.TOTAL = ( Number(this.data30.TRADE==undefined||this.data30.TRADE==null?0:this.data30.TRADE) 
    + Number(this.data30.HOUSE==undefined||this.data30.HOUSE==null?0:this.data30.HOUSE) 
    + Number(this.data30.AGRICULTURE==undefined||this.data30.AGRICULTURE==null?0:this.data30.AGRICULTURE) 
    + Number(this.data30.EDUCATION ==undefined||this.data30.EDUCATION==null?0:this.data30.EDUCATION)  
    + Number(this.data30.INSURANCE ==undefined||this.data30.INSURANCE==null?0:this.data30.INSURANCE) 
    + Number(this.data30.MISCELLANEOUS ==undefined||this.data30.MISCELLANEOUS==null?0:this.data30.MISCELLANEOUS) 
    + Number(this.data30.OTHER ==undefined||this.data30.OTHER==null?0:this.data30.OTHER) );
  }


  bag1event(event1: any) {
    this.data30.TRADE = event1==undefined?0:event1;
    this.calculate();
  }
  bag2event(event1: any) {
    this.data30.HOUSE = event1==undefined?0:event1;
    this.calculate();
  }
  bag3event(event1: any) {
    this.data30.AGRICULTURE = event1==undefined?0:event1;
    this.calculate();
  }
  bag4event(event1: any) {
    this.data30.EDUCATION = event1==undefined?0:event1;
    this.calculate();
  }
  bag5event(event1: any) {
    this.data30.INSURANCE = event1==undefined?0:event1;
    this.calculate();
  }
  bag6event(event1: any) {
    this.data30.MISCELLANEOUS =event1==undefined?0:event1;
    this.calculate();
  }
  bag7event(event1: any) {
    this.data30.OTHER = event1==undefined?0:event1;
    this.calculate();
  }

}
