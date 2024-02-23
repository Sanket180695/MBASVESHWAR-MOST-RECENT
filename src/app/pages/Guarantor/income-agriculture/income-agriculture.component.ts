import { Component, Input, OnInit } from '@angular/core';
import { GuarantorAgriInfo } from 'src/app/Models/PersonalProposal/guarantor-agri-info';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-income-agriculture',
  templateUrl: './income-agriculture.component.html',
  styleUrls: ['./income-agriculture.component.css']
})
export class IncomeAgricultureComponent implements OnInit {

  @Input() adrawerClose: Function;
  @Input() data26: GuarantorAgriInfo;
  @Input() GUARANTOR_INCOME_INFORMATION_ID 


  a_drawerVisible: boolean;
  a_drawerData : GuarantorAgriInfo = new GuarantorAgriInfo();


  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
  }


  bag1event(event1: any) {
    this.data26.SUGAR_CANE = event1;
    this.calculate();
  }
  bag2event(event1: any) {
    this.data26.MAIZE = event1;
    this.calculate();
  }
  bag3event(event1: any) {
    this.data26.TAMBACCO = event1;
    this.calculate();
  }
  bag4event(event1: any) {
    this.data26.GRAINS = event1;
    this.calculate();
  }
  bag5event(event1: any) {
    this.data26.OTHER = event1;
    this.calculate();
  }

  calculate() {
    // console.log(this.data);
    this.data26.TOTAL = ( Number(this.data26.SUGAR_CANE =undefined||this.data26.SUGAR_CANE ==null?0:this.data26.SUGAR_CANE ) 
     + Number(this.data26.MAIZE==undefined||this.data26.MAIZE==null?0:this.data26.MAIZE) 
     + Number(this.data26.TAMBACCO==undefined||this.data26.TAMBACCO==null?0:this.data26.TAMBACCO) 
     + Number( this.data26.GRAINS ==undefined|| this.data26.GRAINS==null?0: this.data26.GRAINS)  
     + Number(this.data26.OTHER ==undefined||this.data26.OTHER==null?0:this.data26.OTHER)                    
    );
  }



  getAgriculture(){
    this.api.getGuarantorAgricultureInformation(this.GUARANTOR_INCOME_INFORMATION_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data26 = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data26.GUARANTOR_INCOME_INFORMATION_ID = this.GUARANTOR_INCOME_INFORMATION_ID
    if(this.data26.ID){
      this.api.updateGuarantorAgricultureInformation(this.data26).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getAgriculture();
            this.adrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
    else{
      this.api.createGuarantorAgricultureInformation(this.data26).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getAgriculture();
            this.adrawerClose();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        }
      )
    }
  }

}
