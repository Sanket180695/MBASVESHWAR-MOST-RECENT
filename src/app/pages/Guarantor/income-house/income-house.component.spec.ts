import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeHouseComponent } from './income-house.component';

describe('IncomeHouseComponent', () => {
  let component: IncomeHouseComponent;
  let fixture: ComponentFixture<IncomeHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
