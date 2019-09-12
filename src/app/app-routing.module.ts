import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { KycFormComponent } from './components/kyc-form/kyc-form.component';
import { DocTypeComponent } from './components/doc-type/doc-type.component';
import { CvdInfoComponent } from './components/cvd-info/cvd-info.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConsentManagementComponent } from './components/consent-management/consent-management.component';;

const appRoutes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'form', component: KycFormComponent },
  { path: 'appstore', component: KycFormComponent },
  { path: 'mobilemenu', component: KycFormComponent },
  { path: 'mprofile', component: KycFormComponent },
  { path: 'verify', component: VerifyOtpComponent },
  { path: 'mysubmission', component: KycFormComponent },
  { path: 'addressVerifier', component: KycFormComponent },
  { path: 'reqAndApp', component: KycFormComponent },
  { path: 'walletDash', component: KycFormComponent },
  { path: 'walletAdd', component: KycFormComponent },
  { path: 'walletDetails', component: KycFormComponent },
  { path: 'consentManagement', component: ConsentManagementComponent },
  { path: 'exchangeform', component: KycFormComponent },
  { path: 'selfinvite/:apikey', component: KycFormComponent },
  { path: 'docType', component:DocTypeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/walletStatus', component: KycFormComponent },
  { path: 'statusinfo', component: KycFormComponent },
  { path: 'cvdInfo', component: CvdInfoComponent },
  { path: 'docklinks', component: KycFormComponent },
  { path: 'photoIdentity/:typeDoc?/:redirectId?', component: KycFormComponent },
  { path: 'epassport', component: KycFormComponent },
  { path: 'termsOfService', component: KycFormComponent },
  { path: 'privacyPolicy', component: KycFormComponent },
  { path: 'pricing', component: KycFormComponent },
  { path: 'createaccount', component: KycFormComponent },
  { path: 'countrylist', component: KycFormComponent },
  { path: 'redirectad', component: KycFormComponent },
  { path: 'boards/:token/:btnid', component: KycFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
