import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfcurrentdepositComponent } from './gfcurrentdeposit.component';

describe('GfcurrentdepositComponent', () => {
  let component: GfcurrentdepositComponent;
  let fixture: ComponentFixture<GfcurrentdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfcurrentdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfcurrentdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
