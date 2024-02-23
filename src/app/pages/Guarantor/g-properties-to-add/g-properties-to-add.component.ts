import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { GuarantorProperty } from 'src/app/Models/PersonalProposal/guarantor-property';
import { GuarantorSubproperty } from 'src/app/Models/PersonalProposal/guarantor-subproperty';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
  selector: 'app-g-properties-to-add',
  templateUrl: './g-properties-to-add.component.html',
  styleUrls: ['./g-properties-to-add.component.css']
})
export class GPropertiesToAddComponent implements OnInit {

  @Input() drawerCloseProperties : Function;
  @Input() data: GuarantorSubproperty;
  @Input() PROPOSAL_ID: number
  @Input() G_ID


  drawerVisible_ToAddProperties : boolean;
  drawer_ToAddProperties : GuarantorProperty = new GuarantorProperty();

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  talukas = []
  districts = []
  states = []
  pincodes = []
  options = []

  numberOfCharacters1 = 0;


  constructor(private api: ApiService,private message: NzNotificationService) { }

  ngOnInit(): void {
  }

  getProperties(){
    this.api.getGuarantorPropertiesToAdd(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.data = successCode['data'][0]
        }
      }
    )
  }

  save(){
    this.data.G_ID = this.G_ID
    this.data.PROPOSAL_ID = this.PROPOSAL_ID
    if(this.data.ID){
      this.api.updateGuarantorPropertiesToAdd(this.data).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getProperties();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.drawerCloseProperties();
          }
        }
      )
    }
    else{
      this.api.createGuarantorPropertiesToAdd(this.data).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getProperties();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            this.drawerCloseProperties();
          }
        }
      )
    }
  }

  wordCounter(textValue: string): void {
    this.numberOfCharacters1 = textValue.length;
  }

  vehicel = [
    {Id : 1,name :  "2 Wheeler"},
    {Id : 2,name :  "3 Wheeler"},
    {Id : 3,name :  "4 Wheeler"},
    {Id : 4,name :  "6 Wheeler"},
    {Id : 5,name :  "8 Wheeler"},
    {Id : 6,name :  "10 Wheeler"},
    {Id : 7,name :  "12 Wheeler"},
  ]


}
