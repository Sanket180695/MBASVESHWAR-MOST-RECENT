import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';



@Component({
  selector: 'app-savingaccdetails',
  templateUrl: './savingaccdetails.component.html',
  styleUrls: ['./savingaccdetails.component.css']
})
export class SavingaccdetailsComponent implements OnInit {
  @Input() drawerClose2: Function;
  @Input() data4: FRecurringDeposit;
  @Input() addressinfoCurrent: Addressinfo;
  pageIndex = 1;

  @Input() PROPOSAL_ID


  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  @Output() demo : EventEmitter<boolean> =
  new EventEmitter<boolean>();

  saveCount: number = 0;

  pageSize = 100;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  bagayat: any;
  jirayat: any;
  logtext: string = ""
  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit(): void { }

  close(): void {
    this.drawerClose2();

    this.logtext = 'CLOSED - Extra Info form';
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
 
  setValues() {
    this.data4.ACC_AMOUNT = this.data4.ACC_AMOUNT;
    this.data4.ACC_NO = this.data4.ACC_NO;
    // this.data4.MATURITY_DUE = this.data4.MATURITY_DUE;
    // this.data.END_DATE = '';
  }

  save(): void {


    if (this.data4.ID) {
      this.data4.DEPOSIT_TYPE = 'S'
      this.api.updateDepositInformation(this.data4).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getSavingAcc();
            this.drawerClose2();
          }
        },
        error => {
          this.saveCount = 0;
        }
      );
    }
    else {
      this.saveCount++;
      if (this.saveCount == 1) {
        this.data4.DEPOSIT_TYPE = 'S'
        this.api.createDepositInformation(this.data4).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getSavingAcc();
              this.drawerClose2();
            }
          },
          error => {
            this.saveCount = 0;
          });
      }
    }



 

    // if (this.data4.ACC_AMOUNT != undefined && this.data4.ACC_NO != undefined) {
    //   if (this.data4.ACC_AMOUNT == 0 || this.data4.ACC_AMOUNT.toString().trim() == "") {
    //     this.message.error("Not Ok", '');
    //   } else {
    //     if (this.data4.ACC_NO.toString().trim() == "") {
    //       this.message.error('Not Ok', "");
    //     } else {
    //       if (this.data4.ACC_NO) {

    //         this.demo.emit(false);
    //         this.setValues();
    //         //console.log(this.setValues)
    //         if (!addNew)
    //           this.close();

    //       } else {
    //         this.message.error(this.api.translate.instant('workorders.message3'), "");
    //       }
    //     }
    //   }
    // }
    // else {
    //   this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    // }
  }


  getSavingAcc() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'S').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data4 = successCode['data'][0]
        }
      }
    )
  }

   
    // save(addNew: boolean): void {
    //   if (this.data4.ACC_AMOUNT != undefined && this.data4.ACC_NO != undefined ){   
    //     if (this.data4.ACC_AMOUNT == 0 || this.data4.ACC_AMOUNT.toString().trim() == "") {
    //       this.message.error("Not Ok",'');
    //     } else {
    //       if (this.data4.ACC_NO.toString().trim() == "") {
    //         this.message.error('Not Ok', "");
    //       } else {
    //         if (this.data4.ACC_NO) {
            
    //           this.demo.emit(false);
    //           this.setValues();
    //           console.log(this.setValues)
    //           if (!addNew)
    //           this.close();
  
    //         } else {
    //           this.message.error(this.api.translate.instant('workorders.message3'), "");
    //         }
    //       }
    //     }
    //   }
    //   else {
    //     this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    //   }
    // }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }
  

  setValues2() {
    this.addressinfoCurrent.BUILDING = '';
    this.addressinfoCurrent.DISTRICT = '';
    this.addressinfoCurrent.HOUSE_NO = '';
    this.addressinfoCurrent.LANDMARK = '';
    this.addressinfoCurrent.VILLAGE = '';
    this.addressinfoCurrent.STATE = '';
    this.addressinfoCurrent.TALUKA = '';
    this.addressinfoCurrent.PINCODE = "";
  }
}

