import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToValuationStageComponent } from './send-to-valuation-stage.component';

describe('SendToValuationStageComponent', () => {
  let component: SendToValuationStageComponent;
  let fixture: ComponentFixture<SendToValuationStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToValuationStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToValuationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
