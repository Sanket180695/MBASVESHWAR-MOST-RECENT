import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { GnGuarantor } from 'src/app/Models/PersonalProposal/gn-guarantor';
import { GnProperty } from 'src/app/Models/PersonalProposal/gn-property';
import { GIDSort } from 'src/app/Models/PersonalProposal/G_ID_sort';
import { GnSubProperty } from 'src/app/Models/PersonalProposal/gn-sub-property';
import { GnPropertiesAddComponent } from '../gn-properties-add/gn-properties-add.component';
import { ApiService } from 'src/app/Service/api.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';





@Component({
  selector: 'app-gn-property-info',
  templateUrl: './gn-property-info.component.html',
  styleUrls: ['./gn-property-info.component.css']
})
export class GnPropertyInfoComponent implements OnInit {

  @Output() demos: EventEmitter<boolean> =
    new EventEmitter<boolean>();
    GuarantorInfo: GnGuarantor = new GnGuarantor();
  @Input() data1: GnSubProperty;
  @Input() PROPOSAL_ID: number
  @Input() APPLICANT_ID: number
  @Input() TYPE: string;
  @Input() CURRENT_STAGE_ID: number;
  @Input() LOAN_KEY: Number;
  @Input() loanType: number;
  @Input() IS_APPROVED:number;
  @ViewChild(GnPropertiesAddComponent) property: GnPropertiesAddComponent;
  PropertyTableData: GnProperty[] = []

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  formTitle = this.api.translate.instant('propertiesinfo.formTitle');
  pageIndex = 1;
  isSpinning1 = false
  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];
  dataList12 = [];
  loadingRecords = true;
  sortValue: string = "desc";
  roleId = sessionStorage.getItem("roleId")
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  columns: string[][] = [['PROPERTY_DETAILS', this.api.translate.instant('propertiesinfoadd.propertydetails1_title')], ['TOTAL_AREA', this.api.translate.instant('propertiesinfoadd.totalarea1_title')], ['ESTIMATED_PRICE', this.api.translate.instant('propertiesinfoadd.valuation_amount_title')], ['AKAR_RS', this.api.translate.instant('agri_info.AKAR_title')]]
  columns1: string[][] = [['VEHICLE_NAME', 'Vehicle Name'], ['VEHICLE_NO', 'Vehicle No.'], ['VALUATION', this.api.translate.instant('propertiesinfoadd.valuation_amount_title')], ['VALUATION_DATE', 'Valuation Date']]
  isButtonVerifySpinning = false;
  //drawer Variables
  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: Propertyinformation = new Propertyinformation();
  userActivityLogData: Useractivitylog = new Useractivitylog();
  addressId: number
  isButtonSpinning = false;




  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }


  getAllGproperties() {

    this.PropertyTableData = []
    let sortKey: GIDSort = {
      G_ID: this.GuarantorInfo.ID

    }
    this.api.getAllGuarantorProperty_Amulya(sortKey).subscribe(res => {
      if (res['code'] == 200 && res['data'].length > 0) {
        this.PropertyTableData = res['data']
      }
    })
  }


  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;


  }

search(reset:boolean = false){

}


  //Drawer Methods
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  add(): void {

    this.property.GuarantorData = this.GuarantorInfo;
    this.property.propertyInfo = new GnProperty();
    this.drawerTitle = this.api.translate.instant('propertiesinfo.drawerTitle1');
    this.drawerVisible = true;

  }

  edit(data:GnProperty): void {
    this.property.propertyInfo = new GnProperty();
    this.drawerTitle = this.api.translate.instant('propertiesinfo.drawerTitle2');
    this.property.propertyInfo = data;
    this.drawerVisible = true;
  }

  delete(data:GnProperty):void{
    data.ARCHIVE_FLAG = 'T';
    this.api.UpdateGuarantorProperty_Amulya(data).subscribe(res=>{
      if(res['code']==200){
        this.getAllGproperties();
      }
    })
   
  }

  drawerClose(): void {
    this.getAllGproperties();
    this.drawerVisible = false;
  }

  getData1(data1, data) {
    if (data1 == "M") {
      if (data == "M")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option1_title');
      else if (data == "O")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option2_title');
      else if (data == "S")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option3_title');
      else if (data == "V")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option4_title');
      else if (data == "W")
        return this.api.translate.instant('propertiesinfoadd.propertytype3_option5_title');

    }
  }

  getData(data1, data) {
    if (data1 == "I") {
      if (data == "A")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option1_title');
      else if (data == "H")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option2_title');
      else if (data == "F")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option3_title');
      else if (data == "C")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option4_title');
      else if (data == "P")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option5_title');
      else if (data == "O")
        return this.api.translate.instant('propertiesinfoadd.IS_AGRICULTURE_LAND_OR_OTHER_option6_title');
    }


  }

  cancel(): void {

  }

  confirm2(): void {
    this.extraApplicantInformation.IS_APPROVED = false;
    if (this.extraApplicantInformation.REMARK == undefined || this.extraApplicantInformation.REMARK.trim() == "") {

      this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {

      this.VerifyUpdate();
    }

  }

  confirm(): void {
    this.extraApplicantInformation.REMARK = " "
    this.extraApplicantInformation.IS_APPROVED = true;
    this.VerifyUpdate();
  }
  VerifyUpdate() {

    if (this.extraApplicantInformation.IS_PROVIDED) {

      if (this.extraApplicantInformation.REMARK != "") {
        this.isButtonVerifySpinning = true
        this.extraApplicantInformation.IS_VERIFIED = true
        this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.isButtonVerifySpinning = false;
              // this.oldIndex++;
              // this.indexChanged.emit(this.oldIndex)
              this.demos.emit(false)
              var LOG_ACTION = ''
              var DESCRIPTION = ''
              if (this.extraApplicantInformation.IS_APPROVED == true) {
                LOG_ACTION = 'Property Info Tab information Verified'

                DESCRIPTION = sessionStorage.getItem('userName') + ' has checked and approved the Property Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK
              } else {
                LOG_ACTION = 'Property Info Tab information Rejected'
                DESCRIPTION = sessionStorage.getItem('userName') + 'has checked and rejected the Property Info for the proposal ' + this.LOAN_KEY + ' and given the remark -' + this.extraApplicantInformation.REMARK

              }
              var LOG_TYPE = 'I'
              this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                  }
                });
            }
            else {
              this.message.error(this.api.translate.instant('common.message.error.addfailed'), "");
              this.isButtonVerifySpinning = false;
            }
          });
      }
      else {
        this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
      }
    }
  }

  demos2() {
    this.demos.emit(false)
    var LOG_ACTION = 'User saved Property Info  tab information'
    var DESCRIPTION = sessionStorage.getItem('userName') + ' has saved the Property Info  for the proposal ' + this.LOAN_KEY
    var LOG_TYPE = 'I'
    this.api.proposalLogInformation(this.extraApplicantInformation.PROPOSAL_ID, this.extraApplicantInformation.CURRENT_STAGE_ID, 0, LOG_ACTION, Number(sessionStorage.getItem("userId")), DESCRIPTION, LOG_TYPE)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
        }
      });

  }
  BDateToF(date: string): string {
    let darray = date.split('-');
    console.log(darray);
    let newdate = `${darray[2]}/${darray[1]}/${darray[0]}`
    console.log(newdate);
    return newdate;
  }
  verificationDate: string = '';
  count: number = 0;

  save() {
    this.isButtonSpinning = true;
    this.api.UpdateGuarantorInfo_Amulya(this.GuarantorInfo).subscribe(res=>{
      if(res['code']==200){
        this.message.success("Information updated successfully",'');
        this.isButtonSpinning = false;
      }
      else{
        this.message.success("Failed to updated Information",'');
        this.isButtonSpinning = false;
      }
    })

  }



}
