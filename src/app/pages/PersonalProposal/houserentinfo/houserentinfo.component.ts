import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { HouseShopRentInfo } from 'src/app/Models/PersonalProposal/Houseshoprentinfo';
import { Incomeinformation } from 'src/app/Models/PersonalProposal/incomeinformation';
import { ApiService } from 'src/app/Service/api.service';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';


@Component({
  selector: 'app-houserentinfo',
  templateUrl: './houserentinfo.component.html',
  styleUrls: ['./houserentinfo.component.css']
})
export class HouserentinfoComponent implements OnInit {
  @Input() drawerClose25: Function;
  @Input() CURRENT_STAGE_ID: number;
  @Input() data25: HouseShopRentInfo;
  @Input() PROPOSAL_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  addressinfo: Addressinfo = new Addressinfo();
  isButtonSpinning = false
  @Input() drawerData25: HouseShopRentInfo = new HouseShopRentInfo()
  logtext: string = ""
  isSpinning = false;
  constructor(public message: NzMessageService, public api: ApiService) { }

  ngOnInit(): void {
    this.getdata();
  }
  close(): void {
    this.drawerClose25();

    // this.logtext = 'CLOSED - Extra Info form';
    // this.api.addLog('A', this.logtext, this.api.emailId)
    // .subscribe(successCode => {
    //   if (successCode['code'] == "200") {
    //     //console.log(successCode);
    //   }
    //   else {
    //     //console.log(successCode);
    //   }
    // });

  }

  getdata() {
    this.isSpinning = true

    this.api.getAllHouseRentInfo(0, 0, 'ID', "asc", "AND INCOME_INFORMATION_ID=" + this.PROPOSAL_ID).subscribe(data => {
      this.isSpinning = false

      if (data['code'] == '200' && data['count'] > 0) {
        this.data25 = data['data'][0];
        if (this.data25.ADDRESS_ID > 0)
          this.getaddressData(this.data25.ADDRESS_ID);
      }
    }, err => {
      //console.log(err);
    });
  }

  getaddressData(ID) {
    if(ID){
      this.api.getAllAddressInformation(0, 0, "ID", "asc", "AND ID =" + ID)
        .subscribe(data => {
          this.addressinfo = new Addressinfo();
          if (data['code'] == "200" && data['data'].length > 0) {
            this.addressinfo = data['data'][0];
          }
        }, err => {
          //console.log(err);
        });
    }
  }


  save(addNew: boolean) {

    var isOk = true;
    // this.data25.RENT_DETAILS = ""
    // this.data25.INCOME_FROM_RENT = 0



    if (this.data25.RENT_DETAILS == undefined || this.data25.RENT_DETAILS == null) {
      isOk = false;
      this.message.error('Please Enter Rent Details');
    }

    if (this.data25.AMOUNT == undefined || this.data25.AMOUNT.toString().trim() == "") {
      isOk = false;
      this.message.error('Please Enter Income From Rent');
    }

    if (this.data25.YEARLY_INCOME == undefined || this.data25.toString().trim() == "") {
      isOk = false;
      this.message.error('Please Enter Yearly Income');
    }

    // if (isOk) {

    //   this.nextstep(addNew);


    // }

    if (
      
      this.addressinfo.BUILDING != undefined &&
      this.addressinfo.DISTRICT != undefined &&
      
      this.addressinfo.PINCODE != undefined &&
      this.addressinfo.TALUKA != undefined &&
      this.addressinfo.STATE != undefined &&
      this.addressinfo.VILLAGE != undefined
    ) {
      if (
        
        this.addressinfo.BUILDING.trim() != '' &&
        this.addressinfo.DISTRICT.trim() != '' &&
        
        this.addressinfo.TALUKA.trim() != '' &&
        this.addressinfo.STATE.trim() != '' &&
        this.addressinfo.VILLAGE.trim() != ''
      ) { } else {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.address'));
      }
      if ((/^[1-9]{1}[0-9]{5}$/).test(this.addressinfo.PINCODE.toString()) == false) {
        isOk = false;
        this.message.error(this.api.translate.instant('common.message.error.pincode3'));
      }
    } else {
      isOk = false;
      this.message.error(this.api.translate.instant('common.message.error.address'));
    }

    if (isOk) {
      this.data25.PROPOSAL_ID = this.PROPOSAL_ID;
      console.log(this.data25.PROPOSAL_ID+"-----------------" )
      console.log(this.data25.ADDRESS_ID+"-----------------" )

      this.isButtonSpinning = true;
      if (this.data25.ADDRESS_ID && this.addressinfo.ID ) {
        this.api.updateAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.nextstep(addNew);
              this.message.success(this.api.translate.instant('common.message.error.success'));
            } else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'));
              this.isButtonSpinning = false;
            }
          });
      } else {
        this.api.createAddressInformation(this.addressinfo)
          .subscribe(successCode => {
            if (successCode['code'] == "200") {
              this.data25.ADDRESS_ID = successCode['data'][0].ID;
              this.nextstep(addNew);
              this.message.success(this.api.translate.instant('common.message.error.success'));
            } else {
              this.message.error(this.api.translate.instant('common.message.error.updatefailed'));
              this.isButtonSpinning = false;
            }
          });
      }

    }
  }
  nextstep(addNew) {
    // this.data25.INCOME_INFORMATION_ID = 0
    // this.data25.AMOUNT = 1

    if (this.data25.ID) {
  
      this.api.updateHouseRentInfo(this.data25).subscribe(successCode => {
        if (successCode['code'] == "200") {
          sessionStorage.setItem('house', this.data25.ID.toString())
          // this.extraApplicantInformation.IS_PROVIDED = true
          // this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
          //   .subscribe(successCode => {
          //     if (successCode['code'] == "200") {
          //     }
          //     else {
          //       this.message.error(this.api.translate.instant('common.message.error.addfailed'));
          //     }
          //   });
          this.message.success(this.api.translate.instant('common.message.error.success'));
          if (!addNew) {


            this.logtext = 'Save & Close - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data25) + " KEYWORD [C - OtherIncomeInfo ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
          }
          else {
            this.data25 = new HouseShopRentInfo();
            // this.addressinfoCurrent = new Addressinfo();
            this.setValues();
            // this.setValues2();
            this.logtext = 'Save & New - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data25) + " KEYWORD [C - OtherIncomeInfo ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });
          }
          this.isSpinning = false;
          this.drawerClose25();
        }

      })


    } else {
      // this.data25.INCOME_INFORMATION_ID = this.drawerData25.ID
      this.api.createHouseRentInfo(this.data25)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            sessionStorage.setItem('house', this.data25.ID.toString())
            // this.extraApplicantInformation.IS_PROVIDED = true
            // this.api.updateApplicantExtraInformation(this.extraApplicantInformation)
            //   .subscribe(successCode => {
            //     if (successCode['code'] == "200") {
            //     }
            //     else {
            //       this.message.error(this.api.translate.instant('common.message.error.addfailed'));
            //     }
            //   });
            this.message.success(this.api.translate.instant('common.message.error.success'));
            if (!addNew) {


              this.logtext = 'Save & Close - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data25) + " KEYWORD [C - OtherIncomeInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
            }
            else {
              this.data25 = new HouseShopRentInfo();
              // this.addressinfoCurrent = new Addressinfo();
              this.setValues();
              // this.setValues2();
              this.logtext = 'Save & New - OtherIncomeInfo form - SUCCESS - ' + JSON.stringify(this.data25) + " KEYWORD [C - OtherIncomeInfo ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    //console.log(successCode);
                  }
                  else {
                    //console.log(successCode);
                  }
                });
            }
            this.isSpinning = false;
            this.drawerClose25();
          }
          else {

            this.logtext = 'Update & Close - OtherIncomeInfo form - ERROR - ' + JSON.stringify(this.data25) + " KEYWORD [U - OtherIncomeInfo ]";
            this.api.addLog('A', this.logtext, this.api.emailId)
              .subscribe(successCode => {
                if (successCode['code'] == "200") {
                  //console.log(successCode);
                }
                else {
                  //console.log(successCode);
                }
              });

            this.message.error(this.api.translate.instant('common.message.error.addfailed'));
            this.isSpinning = false;
          }
        });


    }
  }
  setValues() {
    this.data25.RENT_DETAILS = this.data25.RENT_DETAILS
    this.data25.INCOME_FROM_RENT = this.data25.INCOME_FROM_RENT
  }

  // setValues2() {
  //   this.addressinfoCurrent.BUILDING = '';
  //   this.addressinfoCurrent.DISTRICT = '';
  //   this.addressinfoCurrent.HOUSE_NO = '';
  //   this.addressinfoCurrent.LANDMARK = '';
  //   this.addressinfoCurrent.VILLAGE = '';
  //   this.addressinfoCurrent.STATE = '';
  //   this.addressinfoCurrent.TALUKA = '';
  //   this.addressinfoCurrent.PINCODE = "";
  // }
}
