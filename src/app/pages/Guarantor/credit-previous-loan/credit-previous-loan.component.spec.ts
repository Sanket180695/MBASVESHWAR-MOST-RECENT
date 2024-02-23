import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPreviousLoanComponent } from './credit-previous-loan.component';

describe('CreditPreviousLoanComponent', () => {
  let component: CreditPreviousLoanComponent;
  let fixture: ComponentFixture<CreditPreviousLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditPreviousLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPreviousLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
