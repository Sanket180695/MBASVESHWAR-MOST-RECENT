import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFromLocalBoardToHoComponent } from './send-from-local-board-to-ho.component';

describe('SendFromLocalBoardToHoComponent', () => {
  let component: SendFromLocalBoardToHoComponent;
  let fixture: ComponentFixture<SendFromLocalBoardToHoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendFromLocalBoardToHoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFromLocalBoardToHoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
