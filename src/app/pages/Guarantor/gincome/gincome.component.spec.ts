import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GincomeComponent } from './gincome.component';

describe('GincomeComponent', () => {
  let component: GincomeComponent;
  let fixture: ComponentFixture<GincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GincomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
