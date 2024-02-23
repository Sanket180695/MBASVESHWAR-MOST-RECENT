import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpropertyComponent } from './gproperty.component';

describe('GpropertyComponent', () => {
  let component: GpropertyComponent;
  let fixture: ComponentFixture<GpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
