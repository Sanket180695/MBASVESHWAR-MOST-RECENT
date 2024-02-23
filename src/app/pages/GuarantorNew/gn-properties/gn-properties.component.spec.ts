import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnPropertiesComponent } from './gn-properties.component';

describe('GnPropertiesComponent', () => {
  let component: GnPropertiesComponent;
  let fixture: ComponentFixture<GnPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
