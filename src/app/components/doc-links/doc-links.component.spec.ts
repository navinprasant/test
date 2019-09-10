import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLinksComponent } from './doc-links.component';

describe('DocLinksComponent', () => {
  let component: DocLinksComponent;
  let fixture: ComponentFixture<DocLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
