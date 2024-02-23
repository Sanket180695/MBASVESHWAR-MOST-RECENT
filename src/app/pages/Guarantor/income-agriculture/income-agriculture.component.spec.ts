import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAgricultureComponent } from './income-agriculture.component';

describe('IncomeAgricultureComponent', () => {
  let component: IncomeAgricultureComponent;
  let fixture: ComponentFixture<IncomeAgricultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeAgricultureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeAgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
