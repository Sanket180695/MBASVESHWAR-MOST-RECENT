import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSalaryComponent } from './income-salary.component';

describe('IncomeSalaryComponent', () => {
  let component: IncomeSalaryComponent;
  let fixture: ComponentFixture<IncomeSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
