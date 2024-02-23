import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpersonalComponent } from './gpersonal.component';

describe('GpersonalComponent', () => {
  let component: GpersonalComponent;
  let fixture: ComponentFixture<GpersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
