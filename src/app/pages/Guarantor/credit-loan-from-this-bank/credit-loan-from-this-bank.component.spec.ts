import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLoanFromThisBankComponent } from './credit-loan-from-this-bank.component';

describe('CreditLoanFromThisBankComponent', () => {
  let component: CreditLoanFromThisBankComponent;
  let fixture: ComponentFixture<CreditLoanFromThisBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLoanFromThisBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditLoanFromThisBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
