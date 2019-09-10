import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileprofileComponent } from './mobileprofile.component';

describe('MobileprofileComponent', () => {
  let component: MobileprofileComponent;
  let fixture: ComponentFixture<MobileprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
