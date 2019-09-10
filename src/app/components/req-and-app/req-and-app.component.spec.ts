import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqAndAppComponent } from './req-and-app.component';

describe('ReqAndAppComponent', () => {
  let component: ReqAndAppComponent;
  let fixture: ComponentFixture<ReqAndAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqAndAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqAndAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
