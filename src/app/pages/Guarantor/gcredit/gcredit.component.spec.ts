import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcreditComponent } from './gcredit.component';

describe('GcreditComponent', () => {
  let component: GcreditComponent;
  let fixture: ComponentFixture<GcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
