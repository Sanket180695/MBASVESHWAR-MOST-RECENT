import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnPropertyInfoComponent } from './gn-property-info.component';

describe('GnPropertyInfoComponent', () => {
  let component: GnPropertyInfoComponent;
  let fixture: ComponentFixture<GnPropertyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnPropertyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnPropertyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
