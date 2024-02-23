import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { GIDSort } from 'src/app/Models/PersonalProposal/G_ID_sort';
import { GuarantorMain } from 'src/app/Models/PersonalProposal/guarantor-main';
import { GuarantorProperty } from 'src/app/Models/PersonalProposal/guarantor-property';
import { GuarantorSubproperty } from 'src/app/Models/PersonalProposal/guarantor-subproperty';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';


@Component({
  selector: 'app-gproperty',
  templateUrl: './gproperty.component.html',
  styleUrls: ['./gproperty.component.css']
})
export class GpropertyComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
  new EventEmitter<boolean>();
  // @Input() data: GuarantorProperty;
  @Input() data1: GuarantorProperty = new GuarantorProperty();
  @Input() PROPOSAL_ID: number
  @Input() G_ID 
  @Input() CURRENT_STAGE_ID: number;

  roleId = sessionStorage.getItem("roleId")

  GuarantorInfo: GuarantorMain = new GuarantorMain();
  formTitle = this.api.translate.instant('propertiesinfo.formTitle');
  searchText: string = "";

  columns: string[][] = [['G_PROPERTY_DETAILS', this.api.translate.instant('propertiesinfoadd.propertydetails1_title')],['G_TOTAL_AREA', this.api.translate.instant('propertiesinfoadd.totalarea1_title')], ['G_VALUATION_AMOUNT', this.api.translate.instant('propertiesinfoadd.valuation_amount_title')], ['G_AKAR_RS', this.api.translate.instant('agri_info.AKAR_title')]]
  columns1: string[][] = [['G_VEHICLE_NAME', 'Vehicle Name'], ['G_VEHICLE_NO', 'Vehicle No.'], ['G_VALUATION_AMOUNT', this.api.translate.instant('propertiesinfoadd.valuation_amount_title')], ['G_VALUATION_DATE', 'Valuation Date']]
  
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  drawerData_ToAddProperties : GuarantorSubproperty = new GuarantorSubproperty()
  drawerTitle_ToAddProperties:string;
  drawerVisible_ToAddProperties : boolean;

  propertiesData : GuarantorSubproperty[] = [];
  browserLang: string;

  userActivityLogData: Useractivitylog = new Useractivitylog();
  logtext: string = "";

  constructor( private api: ApiService,private modal: NzModalService,private message: NzNotificationService) { }
  extraApplicantInformation:Extraapplicantinfo = new Extraapplicantinfo()
  loadInfo() {
    this.browserLang = localStorage.getItem('locale');
    let filter = " AND EXTRA_INFORMATION_ID=6 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.G_ID + " AND TYPE='G'"
    this.api.getAllApplicantExtraInformation(0, 0, "SEQ_NO", "asc", filter).subscribe(data => {
      if (data['code'] == 200 && data['data'].length > 0) {

        this.extraApplicantInformation = data['data'][0]
        console.log('extraApplicantInformation', this.extraApplicantInformation)
      }
      //console.log(this.extraApplicantInformation)
    }, err => {
      //console.log(err);
    });
  }
  ngOnInit(): void {
    this.getProperty();
    this.loadInfo();
  }

  addProperties(){
    this.drawerTitle_ToAddProperties = this.api.translate.instant('gincomeinfo.drawerTitle11')
    this.drawerData_ToAddProperties = new GuarantorSubproperty();
    this.drawerData_ToAddProperties.G_ID = this.data1.ID;
    this.drawerVisible_ToAddProperties = true;
  }

  get closeCallback() {
    return this.drawerCloseProperties.bind(this);
  }

  drawerCloseProperties(): void {
    this.getProperties()
    this.drawerVisible_ToAddProperties = false;
  }


  getProperty() {
    this.api.getGuarantorProperty(this.G_ID).subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data1 = successCode['data'][0]
        }
      }
    )

    this.api.getGuarantorPropertiesToAdd(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.propertiesData = successCode['data']
        }
      }
    )


  }

  // getAllGproperties() {

  //   this.propertiesData = []
  //   let sortKey: GIDSort = {
  //     G_ID: this.GuarantorInfo.ID

  //   }
  //   this.api.getGuarantorProperty(sortKey).subscribe(res => {
  //     if (res['code'] == 200 && res['data'].length > 0) {
  //       this.propertiesData = res['data']
  //     }
  //   })
  // }


  save() {
    this.data1.G_ID = this.G_ID
    this.data1.PROPOSAL_ID = this.PROPOSAL_ID

    if(this.data1.ID){
      this.api.updateGuarantorProperty(this.data1).subscribe(
        successCode => {
          if(successCode['code']== 200){
            this.getProperty();
            this.extraApplicantInformation.IS_PROVIDED = true;

            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.demo.emit(false);
                this.loadInfo();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              }
            });
          }
        }
      )
    }
    else{
      this.api.createGuarantorProperty(this.data1).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getProperty();
            this.extraApplicantInformation.IS_PROVIDED = true;

            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");

            this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                this.demo.emit(false);
                this.loadInfo();
              }
              else {
                this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              }
            });
          }
        }
      )
    }

  }

  getProperties(){
    this.api.getGuarantorPropertiesToAdd(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.propertiesData = successCode['data']
        }
      }
    )
  }

  edit(data :GuarantorSubproperty){
    
    this.drawerTitle_ToAddProperties = this.api.translate.instant('propertiesinfo.drawerTitle2');
    this.drawerData_ToAddProperties = Object.assign({}, data);
    this.drawerVisible_ToAddProperties  = true;


    this.logtext = "EDIT - Propertyinformation form KEYWORD [E - Propertyinformation] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Property Information - Edit Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });


  }


  delete(data:GuarantorSubproperty){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorPropertiesToAdd(data).subscribe(res=>{
      if(res['code']==200){
        this.message.success("Property deleted Successfully","");
        this.getProperties();
      }
      else{
        this.message.error("Failed to Delete Property","");
      }
    })
  }

 

}
