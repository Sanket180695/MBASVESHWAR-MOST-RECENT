import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Propertyinformation } from 'src/app/Models/PersonalProposal/propertyinformation';
import { PrimesecurityinfoComponent } from '../../PersonalProposal/primesecurityinfo/primesecurityinfo.component';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';

@Component({
  selector: 'app-cpropertyinfo',
  templateUrl: './cpropertyinfo.component.html',
  styleUrls: ['./cpropertyinfo.component.css']
})
export class CpropertyinfoComponent implements OnInit {
  @Input() LOAN_KEY: number
  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: number;
  @Output() demo : EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  propertyInfo: Propertyinformation = new Propertyinformation();
  index = 0
  IS_PROPERTY_INFO: boolean = false
  isButtonSpinning = false
  proposalId: number
  type = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
  @ViewChild(PrimesecurityinfoComponent, { static: false }) prime: PrimesecurityinfoComponent;

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    //console.log(this.PROPOSAL_ID)
    this.loadInfo()
  }

  loadInfo(num?) {
    if (num == 1) {
      if (this.type == 1) {
        this.prime.getSessionValues()
      }
    }

  }

  onIndexChange(event) {
    this.index = event
  }

  demos() {

    this.demo.emit(false)

  }
}
