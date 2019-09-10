import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrgDetailService } from '../../services/org-detail.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  user = JSON.parse(localStorage.getItem("saveUserData"));
  invalidOTP = false;
  userMobile = this.user.mcc + " " + this.user.mobile;
  rawmx: any;
  orgName: any;
  orgPic: any;
  timeLeft: any;
  resendCodeDisable: boolean = true;
  resendButtonColor: string = 'rgba(0, 0, 0, 0.38)';
  getUserData: any;
  invalidOtp = false;
  reqotp: any;
  otpCode: any;
  timer: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private orgService: OrgDetailService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    if (this.defaultLangArray.indexOf(this.defaultLang) != 1) {
      this.commonService.setTranslationLanguage(this.defaultLang);
    }
    else {
      this.commonService.setTranslationLanguage('en');
    }
    this.commonService.stopLoader();
    this.setOrgNameAndOrgPic();
    this.getTimeLeft();
  }

  setOrgNameAndOrgPic() {
    if (localStorage.getItem("rawmx") != undefined && localStorage.getItem("rawmx") != null && localStorage.getItem("rawmx") != "") {
      this.rawmx = JSON.parse(localStorage.getItem("rawmx"));
      this.orgName = this.rawmx.orgname;
      this.orgPic = this.rawmx.orglogo;
    }
  }

  getTimeLeft() {
    this.timeLeft = 15;
    this.timer = setInterval(() => {
      this.timeLeft = this.timeLeft - 1;
      if (this.timeLeft == 0) {
        this.resendCodeDisable = false;
        this.resendButtonColor = '#00bcd4';
        this.stopTimer(this.timer);
      }
    },
      1000
    );
  }
  stopTimer(timer: any) {
    clearInterval(timer);
  }

  enableVerify() {
    console.log("enable verify method", this.otpCode);
    if (this.otpCode != null && this.otpCode != "" && this.otpCode.length == 4) {
      document.body.style.opacity = "0.5";
      this.commonService.startLoader();
      this.getUserData = JSON.parse(localStorage.getItem("saveUserData"));
      this.getUserData.otp = this.otpCode;
      let jsonData = JSON.stringify(this.getUserData);
      console.log(jsonData);
      this.userService.verifyUserOTP(jsonData).subscribe(response => {
        console.log(response);
        console.log('response verifyuserotp');

        if (response.error == false || response.error == "false") {
          if (response.mxid == undefined || response.mxid == "undefined") {
            console.log("undefined kycDoc");
            document.body.style.opacity = "1";
            this.commonService.stopLoader();
            this.router.navigate(["/form"]);
            localStorage.setItem("saveRawMX", JSON.stringify(response.rawmx));
          }
          else {
            console.log('localStorage.setItem("saveAllUserData",JSON.stringify(response))');
            localStorage.setItem("saveAllUserData", JSON.stringify(response));
            localStorage.setItem("saveFileData", JSON.stringify(response.kycDoc));
            if (response.token == undefined || response.token == null || response.token == "") {
              console.log('authorization');
              localStorage.setItem("saveToken", response.headers('Authorization'));
            }
            else {
              console.log('data.token');
              localStorage.setItem("saveToken", response.token);
            }
            this.orgService.orgDetail().subscribe(response => {
              document.body.style.opacity = "1";
              this.commonService.stopLoader();
              if (response.data.pendingrequest.length > 0) {
                console.log('pending request');
                this.router.navigate(['/consentManagement']);
              }
              else {
                console.log('doctype');
                this.router.navigate(['docType']);
              }
            },
              error => {
                console.log('error doctype');
                this.router.navigate(['/docType']);
              })
          }
        }
        else {
          console.log('invalid otp');
          this.invalidOTP = true;
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          this.router.navigate(["/verify"]);
        }
      }, error => {
        console.log('try again********************');
        console.log(error);
        console.log("error: " + JSON.stringify(error));
        alert("Please Try Again");
      })
    }
  }

  resendOtp() {
    document.body.style.opacity = "0.5";
    this.commonService.startLoader();
    let getUserData = JSON.parse(localStorage.getItem("saveUserData"));
    let j = JSON.stringify(getUserData);
    this.userService.verifyUserOTP(j).subscribe(response => {
      document.body.style.opacity = "1";
      this.commonService.stopLoader();
      this.invalidOTP = false;
      this.reqotp = "";
      this.router.navigate(['/verify']);
      this.getTimeLeft();
      this.resendCodeDisable = true;
      this.resendButtonColor = "rgba(0, 0, 0, 0.38)";
    }, error => {
      console.log("error: " + JSON.stringify(error));
      alert("Please Try Again");
    });
  }
  callRequest() {
    document.body.style.opacity = "0.5";
    this.commonService.startLoader();
    let getUserData = JSON.parse(localStorage.getItem("saveUserData"));
    getUserData.call = "true";
    var j = JSON.stringify(getUserData);
    this.userService.verifyUserOTP(j).subscribe(response => {
      document.body.style.opacity = "1";
      this.commonService.stopLoader();
      this.invalidOTP = false;
      console.log(response);
      this.reqotp = "";
      this.router.navigate(['verify']);
      if (this.timer) {
        this.stopTimer(this.timer);
      }
      this.getTimeLeft();
      this.resendCodeDisable = true;
      this.resendButtonColor = "rgba(0, 0, 0, 0.38)";

    }, error => {
      document.body.style.opacity = "1";
      this.commonService.stopLoader();
      this.invalidOTP = false;
      console.log("error in call request: ");
      console.log(error);
      alert("Please Try Again");
    })
  }
  verifyOTP(reqotp: any) {
    document.body.style.opacity = "0.5";
    this.commonService.startLoader();
    var getUserData = JSON.parse(localStorage.getItem("saveUserData"));
    getUserData.otp = reqotp;
    let jsonData = JSON.stringify(getUserData);
    this.userService.verifyUserOTP(jsonData).
      subscribe(response => {
        if (response.message == "demo") {
          if (response.mxid == undefined || response.mxid == "undefined") {
            document.body.style.opacity = "1";
            this.commonService.startLoader();
            this.router.navigate(['/form']);
            localStorage.setItem("saveRawMX", JSON.stringify(response.rawmx));
          }
          else {
            localStorage.setItem("saveAllUserData", JSON.stringify(response));
            localStorage.setItem("saveFileData", JSON.stringify(response.data.kycDoc));
            if (response.data.token == undefined || response.data.token == null || response.data.token == "") {
              localStorage.setItem("saveToken", response.headers('Authorization'));
            }
            else {
              localStorage.setItem("saveToken", response.data.token);
            }
            this.orgService.orgDetail().subscribe(response => {
              document.body.style.opacity = "1";
              this.commonService.stopLoader();
              if (response.data.pendingrequest.length > 0) {
                this.router.navigate(['/consentManagement']);
              }
              else {
                this.router.navigate(['docType']);
              }
            },
              error => {
                this.router.navigate(['/docType']);
              })
          }
        }
        else {
          this.invalidOTP = true;
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          this.router.navigate(['/verify']);
        }
      },
        error => {
          console.log("error: " + JSON.stringify(error));
          alert("Please Try Again");
          console.log("sendotp error response");
          console.log(error);
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          alert("Please Try Again");
        })
  }
}
