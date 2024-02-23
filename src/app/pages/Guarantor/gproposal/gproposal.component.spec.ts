import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GproposalComponent } from './gproposal.component';

describe('GproposalComponent', () => {
  let component: GproposalComponent;
  let fixture: ComponentFixture<GproposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GproposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
