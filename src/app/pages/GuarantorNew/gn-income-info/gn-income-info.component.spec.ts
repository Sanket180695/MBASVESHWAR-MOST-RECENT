import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnIncomeInfoComponent } from './gn-income-info.component';

describe('GnIncomeInfoComponent', () => {
  let component: GnIncomeInfoComponent;
  let fixture: ComponentFixture<GnIncomeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnIncomeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnIncomeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
