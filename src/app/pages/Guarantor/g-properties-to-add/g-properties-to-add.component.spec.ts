import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GPropertiesToAddComponent } from './g-properties-to-add.component';

describe('GPropertiesToAddComponent', () => {
  let component: GPropertiesToAddComponent;
  let fixture: ComponentFixture<GPropertiesToAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GPropertiesToAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GPropertiesToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
