import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDocLinkComponent } from './country-doc-link.component';

describe('CountryDocLinkComponent', () => {
  let component: CountryDocLinkComponent;
  let fixture: ComponentFixture<CountryDocLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDocLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDocLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
