import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoidentityComponent } from './photoidentity.component';

describe('PhotoidentityComponent', () => {
  let component: PhotoidentityComponent;
  let fixture: ComponentFixture<PhotoidentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoidentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoidentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
