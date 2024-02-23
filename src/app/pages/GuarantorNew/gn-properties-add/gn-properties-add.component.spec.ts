import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnPropertiesAddComponent } from './gn-properties-add.component';

describe('GnPropertiesAddComponent', () => {
  let component: GnPropertiesAddComponent;
  let fixture: ComponentFixture<GnPropertiesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnPropertiesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnPropertiesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
