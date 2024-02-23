import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GftermdepositComponent } from './gftermdeposit.component';

describe('GftermdepositComponent', () => {
  let component: GftermdepositComponent;
  let fixture: ComponentFixture<GftermdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GftermdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GftermdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
