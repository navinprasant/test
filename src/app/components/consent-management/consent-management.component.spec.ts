import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentManagementComponent } from './consent-management.component';

describe('ConsentManagementComponent', () => {
  let component: ConsentManagementComponent;
  let fixture: ComponentFixture<ConsentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
