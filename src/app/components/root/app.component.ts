import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  private user: SocialUser;
  private loggedIn: boolean;
  constructor
    (
      private commonService: CommonService,
      private authService: AuthService
    ) { }
  title = 'submit-kyc-test';

  ngOnInit() {
    this.commonService.startLoader();
    console.log('loader start');
    //  this.signInWithFB();
    //  this.authService.authState.subscribe((user) => {
    //    console.log('test', user);
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //  }, error => {
    //    console.log(error);
    //  }
    // );
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   console.log('this.signInWithFB');
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
  //     console.log(x);
  //   }, error => {
  //     console.log("error", error);
  //   });
  // }

  // signOut(): void {
  //   this.authService.signOut();
  // }

}
