import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { ApiService } from 'src/app/Service/api.service';
import { AgriInfo } from 'src/app/Models/PersonalProposal/agri-info';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { DatePipe } from '@angular/common';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { conformToMask } from 'angular2-text-mask';
// import { FTermDeposit } from 'src/app/Models/PersonalProposal/Ftermdeposit';



@Component({
  selector: 'app-financialtermdeposit',
  templateUrl: './financialtermdeposit.component.html',
  styleUrls: ['./financialtermdeposit.component.css'],
  providers: [DatePipe]
})
export class FinancialtermdepositComponent implements OnInit {
  @Input() drawerClose3: Function;
  @Input() data3: FRecurringDeposit;

  @Input() FINANCIAL_INFORMATION_ID

  @Input() PROPOSAL_ID
  @Input() DEPOSIT_TYPE

  saveCount: number = 0;

  @Input() addressinfoCurrent: Addressinfo;
  @Output() demo : EventEmitter<boolean> =
  new EventEmitter<boolean>();
  pageIndex = 1;
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  pageSize = 100;
  converted: any;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  drawerData5: Financialinformation = new Financialinformation();
  bagayat: any;
  jirayat: any;
  logtext: string = ""
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  // pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  constructor(private api: ApiService, private message: NzNotificationService, private datePipe:DatePipe ) {
  }

  ngOnInit(): void { }

  close(): void {
    this.drawerClose3();

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
    this.data3.ACC_AMOUNT = this.data3.ACC_AMOUNT;
    this.data3.ACC_NO = this.data3.ACC_NO;
    this.data3.MATURITY_DUE = this.data3.MATURITY_DUE;
    // this.data.END_DATE = '';
  }


  save(): void {

    this.data3.PROPOSAL_ID = this.PROPOSAL_ID
    if (this.data3.ID) {
      this.data3.DEPOSIT_TYPE = 'T'
      this.api.updateDepositInformation(this.data3).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getTermDeposit();
            this.drawerClose3();
            // this.demo.emit(false);
            // this.setValues();
            this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          }
        },
        error => {
          this.saveCount = 0;
        }
      )
    }
    else {
      this.saveCount++;
      if (this.saveCount == 1) {
        this.data3.DEPOSIT_TYPE = 'T'
        this.api.createDepositInformation(this.data3).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getTermDeposit();
              this.drawerClose3();
              this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
            }
          },
          error => {
            this.saveCount = 0;
          }
        );
      }
    }


  }

  getTermDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data3 = successCode['data'][0]
        }
      }
    )
  }
   
  // save(addNew: boolean): void {

  //   // this.data45.MATURITY_DUE = this.datePipe.transform(this.data45.MATURITY_DUE, 'yyyy-MM-dd');
  //   this.data3.DEPOSIT_TYPE = "T"
  //   if (this.data3.ACC_AMOUNT != undefined && this.data3.ACC_NO != undefined && this.data3.MATURITY_DUE != undefined
  //     ) {
  //       // if (this.data3.MATURITY_DUE == undefined || this.data3.MATURITY_DUE == '') {
  //       //   this.data3.MATURITY_DUE = null
  //       // } else
  //       //   if (this.data3.MATURITY_DUE[0] >= 0 && this.data3.MATURITY_DUE[0] <= 9
  //       //     && this.data3.MATURITY_DUE[1] >= 0 && this.data3.MATURITY_DUE[1] <= 9
  //       //     && this.data3.MATURITY_DUE[3] >= 0 && this.data3.MATURITY_DUE[3] <= 9 &&
  //       //     this.data3.MATURITY_DUE[4] >= 0 && this.data3.MATURITY_DUE[4] <= 9 &&
  //       //     this.data3.MATURITY_DUE[9] >= 0 && this.data3.MATURITY_DUE[9] <= 9 &&
  //       //     this.data3.MATURITY_DUE[8] >= 0 && this.data3.MATURITY_DUE[8] <= 9 &&
  //       //     this.data3.MATURITY_DUE[7] >= 0 && this.data3.MATURITY_DUE[7] <= 9 &&
  //       //     this.data3.MATURITY_DUE[6] >= 0 && this.data3.MATURITY_DUE[6] <= 9) {
  
  //       //     var conformedPhoneNumber = conformToMask(
  //       //       this.data3.MATURITY_DUE,
  //       //       this.mask,
  //       //       { guide: false }
  //       //     )
  //       //     const str = conformedPhoneNumber.conformedValue.split('/');
  
  //       //     const year = Number(str[2]);
  //       //     const month = Number(str[1]) - 1;
  //       //     const dates = Number(str[0]);
  
  //       //     this.converted = new Date(year, month, dates)
  
  //       //     this.data3.MATURITY_DUE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //       //   } else {
  //       //     // oks = false
  //       //     this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //       //   }
  //     if (this.data3.ACC_AMOUNT == 0 || this.data3.ACC_AMOUNT.toString().trim() == "") {
  //       this.message.error("Not Ok",'');
  //     } else {
  //       if (this.data3.ACC_NO.toString().trim() == "") {
  //         this.message.error('Not Ok', "");
  //       } else {
  //         if (this.data3.MATURITY_DUE) {
          
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
}

