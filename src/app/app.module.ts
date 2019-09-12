import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SigninComponent } from './components/signin/signin.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {BsDropdownModule } from 'ngx-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { KycFormComponent } from './components/kyc-form/kyc-form.component';
import { AddressVerifierComponent } from './components/address-verifier/address-verifier.component';
import { ConsentManagementComponent } from './components/consent-management/consent-management.component';
import { CountryDocLinkComponent } from './components/country-doc-link/country-doc-link.component';
import { CountrylistComponent } from './components/countrylist/countrylist.component';
import { CvdInfoComponent } from './components/cvd-info/cvd-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocLinksComponent } from './components/doc-links/doc-links.component';
import { DocTypeComponent } from './components/doc-type/doc-type.component';
import { EPassportComponent } from './components/e-passport/e-passport.component';
import { ExchangeformComponent } from './components/exchangeform/exchangeform.component';
import { MobilemenuComponent } from './components/mobilemenu/mobilemenu.component';
import { MobileprofileComponent } from './components/mobileprofile/mobileprofile.component';
import { MysubmissionComponent } from './components/mysubmission/mysubmission.component';
import { OrgSelfInviteComponent } from './components/org-self-invite/org-self-invite.component';
import { OrgVerifyOtpComponent } from './components/org-verify-otp/org-verify-otp.component';
import { PhotoidentityComponent } from './components/photoidentity/photoidentity.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RedirectAndroidComponent } from './components/redirect-android/redirect-android.component';
import { ReqAndAppComponent } from './components/req-and-app/req-and-app.component';
import { StatusInfoComponent } from './components/status-info/status-info.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { WalletDashboardComponent } from './components/wallet-dashboard/wallet-dashboard.component';
import { WalletDetailsComponent } from './components/wallet-details/wallet-details.component';
import { WalletEntryComponent } from './components/wallet-entry/wallet-entry.component';
import { TestComponent } from './components/test/test.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialModule } from './material/material.module';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { SuccessComponent } from './dialogs/success/success.component';
import { ProfilecardComponent } from './components/profilecard/profilecard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("413435482503936")
  }
]);
 
export function provideConfig() {
  return config;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    PageNotFoundComponent,
    KycFormComponent,
    AddressVerifierComponent,
    ConsentManagementComponent,
    CountryDocLinkComponent,
    CountrylistComponent,
    CvdInfoComponent,
    DashboardComponent,
    DocLinksComponent,
    DocTypeComponent,
    EPassportComponent,
    ExchangeformComponent,
    MobilemenuComponent,
    MobileprofileComponent,
    MysubmissionComponent,
    OrgSelfInviteComponent,
    OrgVerifyOtpComponent,
    PhotoidentityComponent,
    PricingComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
    RedirectAndroidComponent,
    ReqAndAppComponent,
    StatusInfoComponent,
    TermsOfServiceComponent,
    VerifyOtpComponent,
    WalletDashboardComponent,
    WalletDetailsComponent,
    WalletEntryComponent,
    TestComponent,
    SuccessComponent,
    ProfilecardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    InternationalPhoneNumberModule,
    Ng2TelInputModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxUiLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
    NgxMatSelectSearchModule,
    MaterialModule,
    SocialLoginModule
  ],
  entryComponents: [
    SuccessComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
