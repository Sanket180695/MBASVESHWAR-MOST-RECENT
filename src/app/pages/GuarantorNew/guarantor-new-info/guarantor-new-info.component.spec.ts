import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorNewInfoComponent } from './guarantor-new-info.component';

describe('GuarantorNewInfoComponent', () => {
  let component: GuarantorNewInfoComponent;
  let fixture: ComponentFixture<GuarantorNewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantorNewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorNewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
