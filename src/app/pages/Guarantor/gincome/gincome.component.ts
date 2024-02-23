import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { GuarantorSalariedInfo } from 'src/app/Models/PersonalProposal/guarantor-salaried-info';
import { GuarantorIncome } from 'src/app/Models/PersonalProposal/guarantor-income';
import { GuarantorBusinessInfo } from 'src/app/Models/PersonalProposal/guarantor-business-info';
import { GuarantorAgriInfo } from 'src/app/Models/PersonalProposal/guarantor-agri-info';
import { GuarantorHouseInfo } from 'src/app/Models/PersonalProposal/guarantor-house-info';
import { GuarantorOtherInfo } from 'src/app/Models/PersonalProposal/guarantor-other-info';
import { GuarantorExpenditureInfo } from 'src/app/Models/PersonalProposal/guarantor-expenditure-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-gincome',
  templateUrl: './gincome.component.html',
  styleUrls: ['./gincome.component.css'],
  providers: [DatePipe]
})
export class GincomeComponent implements OnInit {
  @Output() demo: EventEmitter<boolean> =
  new EventEmitter<boolean>();
  @Input() PROPOSAL_ID: number
  @Input() G_ID : number
 
  @Input() CURRENT_STAGE_ID: number;

  @Input() GUARANTOR_INCOME_INFORMATION_ID 
  data1: GuarantorIncome = new GuarantorIncome();

  dataList = [];

  browserLang = '';

  roleId = sessionStorage.getItem("roleId")

  sdata: GuarantorSalariedInfo[] = [];
  bdata: GuarantorBusinessInfo[] = [];
  adata: GuarantorAgriInfo[] = [];
  hdata: GuarantorHouseInfo[] = [];
  odata: GuarantorOtherInfo[] = [];
  edata: GuarantorExpenditureInfo[] = [];

  salaryData: GuarantorSalariedInfo = new GuarantorSalariedInfo();
  businessData: GuarantorBusinessInfo = new GuarantorBusinessInfo();
  agriData: GuarantorAgriInfo = new GuarantorAgriInfo();
  houseData: GuarantorHouseInfo = new GuarantorHouseInfo();
  otherData: GuarantorOtherInfo = new GuarantorOtherInfo();

  incomeTypeData = [];
  incomeTypeData2 = [];
  incomeTypeData3 = [];


  s_drawer: GuarantorSalariedInfo = new GuarantorSalariedInfo();
  s_drawerVisible: boolean;
  s_drawerTitle:string;

  b_drawerData: GuarantorBusinessInfo = new GuarantorBusinessInfo();
  b_drawerVisible: boolean;
  b_drawerTitle: string;

  a_drawerData: GuarantorAgriInfo = new GuarantorAgriInfo();
  a_drawerVisible: boolean;
  a_drawerTitle: string;

  h_drawerData: GuarantorHouseInfo = new GuarantorHouseInfo();
  h_drawerVisible: boolean;
  h_drawerTitle: string;

  o_drawerData: GuarantorOtherInfo = new GuarantorOtherInfo();
  o_drawerVisible: boolean;
  o_drawerTitle: string;

  e_drawerData: GuarantorExpenditureInfo = new GuarantorExpenditureInfo();
  e_drawerVisible: boolean;
  e_drawerTitle: string;

  extraApplicantInformation:Extraapplicantinfo = new Extraapplicantinfo()


  constructor(
      private api: ApiService, private modal: NzModalService, private datePipe: DatePipe, private message: NzNotificationService,
    ) { }

  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    this.getIncome();
    this.loadInfo();
  }

  loadInfo() {
    this.browserLang = localStorage.getItem('locale');
    let filter = " AND EXTRA_INFORMATION_ID=2 AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND APPLICANT_ID=" + this.G_ID + " AND TYPE='G'"
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

  onChanges(value: string): void {
    
  }
  onChanges2(value: string): void {
   
  }



  addSalary(){
    this.s_drawerTitle = this.api.translate.instant('gincomeinfo.drawerTitle10')
    this.s_drawer = new GuarantorSalariedInfo();
    this.s_drawer.GUARANTOR_INCOME_INFORMATION_ID = this.data1.ID;
    this.s_drawerVisible = true;
  }
  
  get CloseCallback() {
    return this.sdrawerClose.bind(this);
  }
  sdrawerClose(): void {
    this.s_drawerVisible = false;
    this.getSalary();
  }

  editSalary(data : GuarantorSalariedInfo){
    this.s_drawer = Object.assign({}, data);
    this.s_drawerVisible = true;
  }

  deleteSalary(data){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorSalariedInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getSalary();
      }
    });
  }






  addBusiness(){
    this.b_drawerTitle = this.api.translate.instant('gincomeinfo.drawerTitle1')
    this.b_drawerData = new GuarantorBusinessInfo();
    this.b_drawerData.GUARANTOR_INCOME_INFORMATION_ID = this.data1.ID;
    this.b_drawerVisible = true;
  }

  get closeCallback1() {
    return this.bdrawerClose.bind(this);
  }

  bdrawerClose(): void {
    this.b_drawerVisible = false;
    this.getBusiness();
  }

  editBusiness(data :GuarantorBusinessInfo){
    this.b_drawerData = Object.assign({}, data);
    this.b_drawerVisible = true;
  }

  deleteBusiness(data){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorBusinessInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getBusiness();
      }
    });
  }




  addAgriculture() {
    this.a_drawerTitle = this.api.translate.instant('gincomeinfo.drawerTitle5')
    this.a_drawerData = new GuarantorAgriInfo();
    this.a_drawerData.GUARANTOR_INCOME_INFORMATION_ID = this.data1.ID;
    this.a_drawerVisible = true;
  }

  get closeCallback26() {
    return this.adrawerClose.bind(this);
  }

  adrawerClose(): void {
    this.a_drawerVisible = false;
    this.getAgriculture();
  }

  editAgriculture(data: GuarantorAgriInfo){
    this.a_drawerData = Object.assign({}, data);
    this.a_drawerVisible = true;
  }

  deleteAgriculture(data){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorAgricultureInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getAgriculture();
      }
    });
  }


  addHouse() {
    this.h_drawerTitle = this.api.translate.instant(' ')
    this.h_drawerData = new GuarantorHouseInfo();
    this.h_drawerData.GUARANTOR_INCOME_INFORMATION_ID = this.data1.ID;
    this.h_drawerVisible = true;
  }

  get closeCallback25() {
    return this.hdrawerClose.bind(this);
  }
  
  hdrawerClose(): void {
    this.h_drawerVisible = false;
    this.getHouse();
  }

  editHouse(data: GuarantorHouseInfo){
    this.h_drawerData = Object.assign({}, data);
    this.h_drawerVisible = true;
  }

  deleteHouse(data){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorHouseInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getHouse();
      }
    });
  }




  addOther() {
    this.o_drawerTitle = this.api.translate.instant(' ')
    this.o_drawerData = new GuarantorOtherInfo();
    this.o_drawerData.GUARANTOR_INCOME_INFORMATION_ID = this.data1.ID;
    this.o_drawerVisible = true;
  }

  get closeCallback2() {
    return this.odrawerClose.bind(this);
  }

  odrawerClose(): void {
    this.o_drawerVisible = false;
    this.getOther();
  }

  editOther(data: GuarantorOtherInfo){
    this.o_drawerData = Object.assign({}, data);
    this.o_drawerVisible = true;
  }

  deleteOther(data){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorOtherInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getOther();
      }
    });
  }





  addExpenditure() {
    this.e_drawerTitle = "Add Expenditure Information"
    this.e_drawerData = new GuarantorExpenditureInfo();
    this.e_drawerData.GUARANTOR_INCOME_INFORMATION_ID = this.data1.ID;
    this.e_drawerVisible = true;
  }

  get closeCallback9() {
    return this.edrawerClose.bind(this);
  }
  edrawerClose(): void {
    this.e_drawerVisible = false;
    this.getExpenditure();
  }

  editExpenditure(data1){
    this.e_drawerData = Object.assign({}, data1);
    this.e_drawerVisible = true;
  }

  deleteExpenditure(data){
    data.ARCHIVE_FLAG = 'T';
    this.api.updateGuarantorExpenditureInformation(data).subscribe(res => {
      if (res['code'] == 200) {
        this.getExpenditure();
      }
    });
  }



  checkOptionsOne = [
    { label: 'Salary', value: 'IS_SALARY', checked: this.data1.IS_SALARY },
    { label: 'Business', value: 'IS_BUSINESS', checked: this.data1.IS_BUSINESS },
    { label: 'Agriculture', value: 'IS_AGRICULTURE', checked: this.data1.IS_AGRICULTURE },
    { label: 'House/Shop Rent', value: 'IS_HOUSE', checked: this.data1.IS_HOUSE },
    { label: 'Other', value: 'IS_OTHER', checked: this.data1.IS_OTHER },
    { label: 'No Income', value: 'IS_NO_INCOME', checked: this.data1.IS_NO_INCOME },
  
  ];

  changeOption(){

    for(let option of this.checkOptionsOne){
      this.data1[option.value] = option.checked;
    }

  }

  getIncome(){
    this.api.getgIncomeInformation(this.G_ID).subscribe(
      successCode => {
        if(successCode['code'] == 200 && successCode['data'].length > 0 ){
          this.data1 = successCode['data'][0]
          this.dataList = successCode['data'];

          this.data1.IS_SALARY = this.dataList[0]['IS_SALARY'] ? true : false
          this.data1.IS_BUSINESS = this.dataList[0]['IS_BUSINESS'] ? true : false 
          this.data1.IS_AGRICULTURE = this.dataList[0]['IS_AGRICULTURE'] ? true : false 
          this.data1.IS_HOUSE = this.dataList[0]['IS_HOUSE'] ? true : false 
          this.data1.IS_OTHER = this.dataList[0]['IS_OTHER'] ? true : false 
          this.data1.IS_NO_INCOME = this.dataList[0]['IS_NO_INCOME'] ? true : false 

          this.checkOptionsOne = [
            { label: 'Salary', value: 'IS_SALARY', checked: this.data1.IS_SALARY },
            { label: 'Business', value: 'IS_BUSINESS', checked: this.data1.IS_BUSINESS },
            { label: 'Agriculture', value: 'IS_AGRICULTURE', checked: this.data1.IS_AGRICULTURE },
            { label: 'House/Shop Rent', value: 'IS_HOUSE', checked: this.data1.IS_HOUSE },
            { label: 'Other', value: 'IS_OTHER', checked: this.data1.IS_OTHER },
            { label: 'No Income', value: 'IS_NO_INCOME', checked: this.data1.IS_NO_INCOME },
          
          ];
          console.log('Salary',this.data1.IS_SALARY,
          'Business',this.data1.IS_BUSINESS,
          'Agri',this.data1.IS_AGRICULTURE,
          'House',this.data1.IS_HOUSE,
          'Other',this.data1.IS_OTHER,
          'No Income',this.data1.IS_NO_INCOME
        )

          this.api.getAllGuarantorSalariedInformation(this.data1.ID).subscribe(
            successCode => {
              if(successCode['code'] == 200){
                this.sdata = successCode['data']
              }
            }
          )

          this.api.getGuarantorBusinessInformation(this.data1.ID).subscribe(
            successCode => {
              if(successCode['code'] == 200){
                this.bdata = successCode['data']
              }
            }
          )

          this.api.getGuarantorHouseInformation(this.data1.ID).subscribe(
            successCode => {
              if(successCode['code'] == 200){
                this.hdata = successCode['data']
              }
            }
          )

          this.api.getGuarantorAgricultureInformation(this.data1.ID).subscribe(
            successCode => {
              if(successCode['code'] == 200){
                this.adata = successCode['data']
              }
            }
          )

          this.api.getGuarantorOtherInformation(this.data1.ID).subscribe(
            successCode => {
              if(successCode['code'] == 200){
                this.odata = successCode['data']
              }
            }
          )

          this.getExpenditure()

        }
      }
    )
    

  }

  save() {
    this.data1.G_ID = this.G_ID
    this.data1.PROPOSAL_ID = this.PROPOSAL_ID

    if(this.data1.ID){
      this.api.updategIncomeInformation(this.data1).subscribe(
        successCode => {
          if(successCode['code']== 200){

            this.getIncome();

           

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
      this.api.creategIncomeInformation(this.data1).subscribe(
        successCode => {
          if(successCode['code'] == 200){
            this.getIncome();
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


  update() {
    this.data1.G_ID = this.G_ID
    this.data1.PROPOSAL_ID = this.PROPOSAL_ID

    if(this.data1.IS_SALARY || this.data1.IS_BUSINESS || this.data1.IS_AGRICULTURE|| this.data1.IS_HOUSE || this.data1.IS_OTHER ){
      this.data1.IS_EXPENDITURE = true
      if(this.data1.ID){
        this.api.updategIncomeInformation(this.data1).subscribe(
          successCode => {
            if(successCode['code']== 200){

              this.getIncome()
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            }
          }
        )
      }
      else{
        this.api.creategIncomeInformation(this.data1).subscribe(
          successCode => {
            if(successCode['code'] == 200){
              this.getIncome()
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            }
          }
        )
      }
      
    }
    else{
      this.data1.IS_EXPENDITURE = false
      if(this.data1.ID){
        this.api.updategIncomeInformation(this.data1).subscribe(
          successCode => {
            if(successCode['code']== 200){
              this.getIncome()
            }
          }
        )
      }
      else{
        this.api.creategIncomeInformation(this.data1).subscribe(
          successCode => {
            if(successCode['code'] == 200){
              this.getIncome()
            }
          }
        )
      }
    }

  }

  getSalary(){
    this.api.getAllGuarantorSalariedInformation(this.data1.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.sdata = successCode['data']
        }
      }
    )
  }

  getBusiness(){
    this.api.getGuarantorBusinessInformation(this.data1.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.bdata = successCode['data']
        }
      }
    )
  }

  getHouse(){
    this.api.getGuarantorHouseInformation(this.data1.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.hdata = successCode['data']
        }
      }
    )
  }

  getAgriculture(){
    this.api.getGuarantorAgricultureInformation(this.data1.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.adata = successCode['data']
        }
      }
    )
  }

  getOther(){
    this.api.getGuarantorOtherInformation(this.data1.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.odata = successCode['data']
        }
      }
    )
  }

  getExpenditure(){
    this.api.getGuarantorExpenditureInformation(this.data1.ID).subscribe(
      successCode => {
        if(successCode['code'] == 200){
          this.edata = successCode['data']
        }
      }
    )
  }

}
