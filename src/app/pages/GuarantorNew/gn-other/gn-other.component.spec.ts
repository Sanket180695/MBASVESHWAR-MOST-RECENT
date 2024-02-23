import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnOtherComponent } from './gn-other.component';

describe('GnOtherComponent', () => {
  let component: GnOtherComponent;
  let fixture: ComponentFixture<GnOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
