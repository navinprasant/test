import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSelfInviteComponent } from './org-self-invite.component';

describe('OrgSelfInviteComponent', () => {
  let component: OrgSelfInviteComponent;
  let fixture: ComponentFixture<OrgSelfInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgSelfInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSelfInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
