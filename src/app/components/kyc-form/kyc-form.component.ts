import { Component, OnInit } from '@angular/core';
import { CountryDataService } from '../../services/country-data.service';
import { UserService } from '../../services/user.service';
import { OrgDetailService } from '../../services/org-detail.service';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.component.html',
  styleUrls: ['./kyc-form.component.css']
})
export class KycFormComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  maxDateOfYear = new Date(new Date().setDate(new Date().getDate() - 1));
  blueBody = true;
  formBgPosition = {};
  saveProfiledisabled = true;
  firstName: any;
  lastName: any;
  email: any;
  dateOfBirth: any;
  url: any;
  statusInfo = false;
  nextBtnBgColor: string = "#C2C2C2";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryDataService,
    private userService: UserService,
    private orgService: OrgDetailService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    if(this.defaultLangArray.indexOf(this.defaultLang) !=1) {
      this.commonService.setTranslationLanguage(this.defaultLang);
     }
     else {
       this.commonService.setTranslationLanguage('en');
     }
    this.commonService.stopLoader();
    if (window.innerHeight < 820) {
      this.formBgPosition['height'] = "1000px";
    }
    else {
      this.formBgPosition['height'] = "100%";
    }

    if (localStorage.getItem("saveRawMX") != "undefined" && localStorage.getItem("saveRawMX") != undefined && localStorage.getItem("saveRawMX") != null && localStorage.getItem("saveRawMX") != "null" && localStorage.getItem("saveRawMX") != "") {
      var data = JSON.parse(localStorage.getItem("saveRawMX"));
      this.firstName = data.firstname;
      this.lastName = data.lastname;
      this.email = data.email;
      if (data.dob != undefined && data.dob != null && data.dob != "") {
        this.dateOfBirth = data.dob;
        this.saveProfiledisabled = false;
        this.nextBtnBgColor = '#00BCD4';
      }
    }
    this.commonService.stopLoader();
  }
  enableContinue() {
    if (this.firstName != null && this.firstName != "" &&
      this.lastName != null && this.lastName != ""
      && this.dateOfBirth != null && this.dateOfBirth != "" &&
      this.email != null && this.email != ""
    ) {
      this.saveProfiledisabled = false;
      this.nextBtnBgColor = '#00BCD4';
    }
    else {
      this.saveProfiledisabled = true;
      this.nextBtnBgColor = '#C2C2C2';
    }
  }

  loadAppStore() {
    window.open("https://itunes.apple.com/in/app/diro-identity/id1408537104?mt=8");
  }
  loadPlayStore() {
    window.open("https://play.google.com/store/apps/details?id=com.diro.kyc");
  }

  facebook() {}

  testAPI() {};

  createNewMX(firstName: any, lastName: any, dateOfBirth: any, email: any) {
    this.commonService.startLoader();
    document.body.style.opacity = "0.5";
    // var dob = dateInFormat(dateOfBirth);
    var dob = dateOfBirth;
    let user = JSON.parse(localStorage.getItem("saveUserData"));
    var json = {
      "firstname": firstName,
      "lastname": lastName,
      "dob": dob,
      "email": email,
      "mobile": user.mobile,
      "mcc": user.mcc,
      "nationality": localStorage.getItem("userNationality")
    };
    console.log("userNationality: " + localStorage.getItem("userNationality"));
    if (localStorage.getItem("saveRawMX") != "undefined" && localStorage.getItem("saveRawMX") != undefined && localStorage.getItem("saveRawMX") != null && localStorage.getItem("saveRawMX") != "null" && localStorage.getItem("saveRawMX") != "") {
      let data = JSON.parse(localStorage.getItem("saveRawMX"));
      json['org_id'] = data.org_id;
    }
    // let os = window.navigator.os
    json['kycdv'] = { "carrierName": "NA", "deviceToken": "NA", "installVersion": environment.build_version, "modelNumber": "NA", "os": "NA", "platform": "NA", "systemVersion": "NA", "udid": "NA" };
    if ('variable window.ui.os') {
      json['kycdv']['os'] = 'window.ui.os';
    }
    if ('var window.ui.osversion') {
      json['kycdv.systemVersion'] = 'window.ui.os';
    }
    if ('var window.ui.platform') {
      json['kycdv.platform'] = 'window.ui.platform';
    }
    this.userService.updateUserProfileInfo(json).
      subscribe(response => {
        let resbody = response.body;
        if (response.body.error == false || response.body.error == "false") {
          if (localStorage.getItem("saveUserImage") == "undefined"
            && localStorage.getItem("saveUserImage") != undefined
            && localStorage.getItem("saveUserImage") != "null"
            && localStorage.getItem("saveUserImage") != null
            && localStorage.getItem("saveUserImage") != "") {
            let picUrl = localStorage.getItem("saveUserImage");
            if ('this.clickbase64') {
              let json = { "baseimage": picUrl, "mxid": response.body.mxid };
            }
            else {
              let json = { "url": picUrl, "mxid": response.body.mxid };
            }
            this.postUserImage(json);
          }
          else {
            this.forwardTo(response);
          }
        }
        else {
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          this.router.navigate(['/form']);
        }
      },
        error => {
          console.log("error in update userprofile info", error);
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          this.router.navigate(['/form']);
        }
      )
  }

  postUserImage(data: any) {
    this.userService.postImage(data).
      subscribe(response => {
        console.log("image post api response");
        console.log(response);
        this.forwardTo(response);
      },
        error => {
          console.error("error in post user image", error);
        }
      )
  }


  forwardTo(response: any) {
    console.log(response);
    localStorage.setItem("saveAllUserData", JSON.stringify(response.body));
    console.log(localStorage.getItem("saveAllUserData"));
    localStorage.setItem("saveFileData", JSON.stringify(response.kycDoc));
    if (response.body.token == undefined || response.body.token == null || response.body.token == "") {
      localStorage.setItem("saveToken", response.headers.get('Authorization'));
    }
    else {
      localStorage.setItem("saveToken", response.body.token);
    }
    this.statusInfo = true;
    this.orgService.orgDetail().
      subscribe(response => {
        console.log("org detail api response", response);
        if (response.pendingrequest.length > 0) {
          this.router.navigate(['/consentManagement']);
        }
        else {
          this.router.navigate(["/docType"]);
        }
      },
        error => {
          console.error("error in get org detail api", error);
          this.router.navigate(["/docType"]);
        })
  }

  openCameraCapture() {
    let actionLoader = false;
    document.body.style.opacity = "0.5";
    // $timeout(function(){
    //   $scope.blueBody = false;
    // },500)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        console.log(stream);
        let localstream = stream;
        var video = document.getElementById('video');
        //video.src = window.URL.createObjectURL(stream);
        // video.srcObject = stream;
        // video.play();
        document.body.style.opacity = "1";
        let actionLoader = true;
        // $scope.$apply();
      });
    }
  }
	cancelClick() {
		this.blueBody = true;
		this.vidOff();
  };
  ready() { }
  vidOff() { }
  captureClick()
  {
  // this.clickbase64 = getBase64Image(video);
  // localStorage.setItem("saveUserImage",this.clickbase64);
  this.blueBody = true;
  //console.log(base64);
  // var base64str = base64.substr(23);
  // var decoded = atob(base64str);
  // $scope.file = base64;
  // $scope.filesize = decoded.length.toString();
  // $scope.filename = new Date().getTime() + ".jpeg";
  this.vidOff();
  }

}
