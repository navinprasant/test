import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectAndroidComponent } from './redirect-android.component';

describe('RedirectAndroidComponent', () => {
  let component: RedirectAndroidComponent;
  let fixture: ComponentFixture<RedirectAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
