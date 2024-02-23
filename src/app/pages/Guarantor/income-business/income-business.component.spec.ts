import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeBusinessComponent } from './income-business.component';

describe('IncomeBusinessComponent', () => {
  let component: IncomeBusinessComponent;
  let fixture: ComponentFixture<IncomeBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
