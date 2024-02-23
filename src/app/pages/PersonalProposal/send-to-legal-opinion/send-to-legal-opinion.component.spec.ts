import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToLegalOpinionComponent } from './send-to-legal-opinion.component';

describe('SendToLegalOpinionComponent', () => {
  let component: SendToLegalOpinionComponent;
  let fixture: ComponentFixture<SendToLegalOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToLegalOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToLegalOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
