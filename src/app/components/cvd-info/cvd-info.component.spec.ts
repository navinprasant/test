import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvdInfoComponent } from './cvd-info.component';

describe('CvdInfoComponent', () => {
  let component: CvdInfoComponent;
  let fixture: ComponentFixture<CvdInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvdInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvdInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
