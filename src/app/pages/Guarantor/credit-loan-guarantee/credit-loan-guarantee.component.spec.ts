import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLoanGuaranteeComponent } from './credit-loan-guarantee.component';

describe('CreditLoanGuaranteeComponent', () => {
  let component: CreditLoanGuaranteeComponent;
  let fixture: ComponentFixture<CreditLoanGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLoanGuaranteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditLoanGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
