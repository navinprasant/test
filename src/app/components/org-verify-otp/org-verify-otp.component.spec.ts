import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgVerifyOtpComponent } from './org-verify-otp.component';

describe('OrgVerifyOtpComponent', () => {
  let component: OrgVerifyOtpComponent;
  let fixture: ComponentFixture<OrgVerifyOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgVerifyOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
