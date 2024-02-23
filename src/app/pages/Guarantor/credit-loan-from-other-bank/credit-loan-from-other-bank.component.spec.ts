import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLoanFromOtherBankComponent } from './credit-loan-from-other-bank.component';

describe('CreditLoanFromOtherBankComponent', () => {
  let component: CreditLoanFromOtherBankComponent;
  let fixture: ComponentFixture<CreditLoanFromOtherBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLoanFromOtherBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditLoanFromOtherBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
