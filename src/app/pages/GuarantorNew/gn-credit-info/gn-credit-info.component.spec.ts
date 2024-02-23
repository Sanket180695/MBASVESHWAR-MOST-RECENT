import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnCreditInfoComponent } from './gn-credit-info.component';

describe('GnCreditInfoComponent', () => {
  let component: GnCreditInfoComponent;
  let fixture: ComponentFixture<GnCreditInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnCreditInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnCreditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
