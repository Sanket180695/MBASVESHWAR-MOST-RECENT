import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeOtherComponent } from './income-other.component';

describe('IncomeOtherComponent', () => {
  let component: IncomeOtherComponent;
  let fixture: ComponentFixture<IncomeOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
