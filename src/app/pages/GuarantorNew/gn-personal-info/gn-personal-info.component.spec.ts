import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnPersonalInfoComponent } from './gn-personal-info.component';

describe('GnPersonalInfoComponent', () => {
  let component: GnPersonalInfoComponent;
  let fixture: ComponentFixture<GnPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
