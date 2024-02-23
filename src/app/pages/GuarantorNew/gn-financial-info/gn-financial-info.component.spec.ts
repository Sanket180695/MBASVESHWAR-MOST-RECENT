import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnFinancialInfoComponent } from './gn-financial-info.component';

describe('GnFinancialInfoComponent', () => {
  let component: GnFinancialInfoComponent;
  let fixture: ComponentFixture<GnFinancialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnFinancialInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnFinancialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
