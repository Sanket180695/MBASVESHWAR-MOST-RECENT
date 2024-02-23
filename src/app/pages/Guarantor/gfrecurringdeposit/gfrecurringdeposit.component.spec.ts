import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfrecurringdepositComponent } from './gfrecurringdeposit.component';

describe('GfrecurringdepositComponent', () => {
  let component: GfrecurringdepositComponent;
  let fixture: ComponentFixture<GfrecurringdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfrecurringdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfrecurringdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
