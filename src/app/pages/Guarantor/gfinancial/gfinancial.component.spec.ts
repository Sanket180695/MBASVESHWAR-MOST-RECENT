import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfinancialComponent } from './gfinancial.component';

describe('GfinancialComponent', () => {
  let component: GfinancialComponent;
  let fixture: ComponentFixture<GfinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
