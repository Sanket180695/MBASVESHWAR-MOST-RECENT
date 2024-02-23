import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnProposalInfoComponent } from './gn-proposal-info.component';

describe('GnProposalInfoComponent', () => {
  let component: GnProposalInfoComponent;
  let fixture: ComponentFixture<GnProposalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnProposalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnProposalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
