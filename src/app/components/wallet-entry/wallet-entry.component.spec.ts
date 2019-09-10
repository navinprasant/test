import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletEntryComponent } from './wallet-entry.component';

describe('WalletEntryComponent', () => {
  let component: WalletEntryComponent;
  let fixture: ComponentFixture<WalletEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
