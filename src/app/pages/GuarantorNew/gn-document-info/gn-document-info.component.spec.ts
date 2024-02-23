import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnDocumentInfoComponent } from './gn-document-info.component';

describe('GnDocumentInfoComponent', () => {
  let component: GnDocumentInfoComponent;
  let fixture: ComponentFixture<GnDocumentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnDocumentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnDocumentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
