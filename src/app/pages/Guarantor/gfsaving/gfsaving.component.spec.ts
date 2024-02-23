import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfsavingComponent } from './gfsaving.component';

describe('GfsavingComponent', () => {
  let component: GfsavingComponent;
  let fixture: ComponentFixture<GfsavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfsavingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfsavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
