import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { OrgDetailService } from '../../services/org-detail.service'
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  mobilebrowserheight = document.body.clientHeight - 75;
  body = "body-white";
  // document.body.style.opacity = "0.5";
  clickAction = true;
  user = JSON.parse(localStorage.getItem("saveAllUserData"));
  token = localStorage.getItem("saveToken");
  proVisible = true;
  pdfUrl: string;
  Imagebase64: any;
  userName: any;
  userPro: any;
  userMCC: any;
  userMobile: any;
  fileData: any;
  uploadedFiles: any[];

  constructor(
    private userService: UserService,
    private orgService: OrgDetailService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.defaultLangArray.indexOf(this.defaultLang) != 1) {
      this.commonService.setTranslationLanguage(this.defaultLang);
    }
    else {
      this.commonService.setTranslationLanguage('en');
    }
    // this.commonService.stopLoader();
    this.getUserKycInfo();
  }
  gotomenu() {
    this.router.navigate(['/mobilemenu']);
  }

  showPro() {
    this.proVisible = !this.proVisible;
  }
  loadAddressVerifier() {
    this.router.navigate(["/addressVerifier"]);
  }

  getFileName = function (name: any) {
    let splitedName = name.split(".");
    if (splitedName[0].length > 24) {
      let string = splitedName[0].substring(0, 24);
      return string + "...";
    }
    else {
      return splitedName[0];
    }
  }

  getFileSize(size: any) {
    size = size / 1048576;
    size = size.toFixed(2);
    return size + " " + "MB";
  }

  showActionMenu(index: any, arrLength: any) {
    this.clickAction = false;
    for (var i = 0; i < arrLength; i++) {
      var id = document.getElementById("action" + i);
      console.log(id);
      var mobId = document.getElementById("mobileaction" + i);
      console.log(mobId);
      if (i == index) {
        console.log("index matched");
        if (id.hidden == true || mobId.hidden == true) {
          console.log("id set to false");
          id.hidden = false;
          mobId.hidden = false;
        }
        else {
          console.log("id set to true");
          id.hidden = true;
          mobId.hidden = true;
        }
      }
      else {
        console.log("id set to true");
        id.hidden = true;
        mobId.hidden = true;
      }
    }
  }

  windowonclick() {
    if (this.clickAction != true) {
      alert("hit function");
    }
  }

  noDelVer() {
    // $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     templateUrl: 'partials/dialogs/delete_warning.html',
    //     controller: delWarn
    // });
    //   function delWarn($scope, $mdDialog, $location,$translate) 
    //   {
    //     $scope.closeDialog = function()
    //     {
    //       $mdDialog.hide();
    //     }
    //   }
  }

  getFileTime(eptime: any) {
    var date = new Date();
    var d = date.getTime();
    if (typeof (eptime) == 'string') {
      eptime = parseInt(eptime);
    }
    var diff = d - eptime;
    switch (true) {
      case (0 <= diff && diff < 60000):
        diff = diff / 1000;
        // diff = diff.toFixed(0);
        return diff + " sec ago";
        break;
      case (60000 <= diff && diff < 60000 * 60):
        var minD = 60000;
        diff = diff / minD;
        // diff = diff.toFixed(0);
        return diff + " min ago";
        break;
      case (60000 * 60 <= diff && diff < 60000 * 60 * 24):
        var hrd = 60000 * 60;
        diff = diff / hrd;
        // diff = diff.toFixed(0);
        return diff + " Hours ago";
        break;
      case (60000 * 60 * 24 <= diff && diff < 60000 * 60 * 24 * 7):
        var dayd = 60000 * 60 * 24;
        diff = diff / dayd;
        // diff = diff.toFixed(0);
        return diff + " Days ago";
        break;
      case (60000 * 60 * 24 * 7 <= diff && diff < 60000 * 60 * 24 * 7 * 4):
        var weekd = 60000 * 60 * 24 * 7;
        diff = diff / weekd;
        // diff = diff.toFixed(0);
        return diff + " Weeks ago";
        break;
      case (60000 * 60 * 24 * 7 * 4 <= diff && diff < 60000 * 60 * 24 * 7 * 4 * 3):
        var mond = 60000 * 60 * 24 * 7 * 4;
        diff = diff / mond;
        // diff = diff.toFixed(0);
        return diff + " Months ago";
        break;
      default:
        var fileDate = new Date(eptime);
        var fileD = fileDate.getDate();
        var fileM = fileDate.getMonth();
        var fileY = fileDate.getFullYear();
        return fileD + "-" + fileM + "-" + fileY;
    }
    // document.write("difference epoctime: " + diff);
    // return eptime;
  }

  delDoc(docDetails: any, index: any) {
    console.log(docDetails);
    if (docDetails.status == 'verified' || docDetails.status == 'approved') {
      this.noDelVer();
    }
    else {
      document.body.style.opacity = "0.5";
      this.commonService.startLoader();
      let docArray = [];
      docArray.push(docDetails);
      this.user = JSON.parse(localStorage.getItem("saveAllUserData"));
      let userMX = this.user.data.mxid;
      this.token = localStorage.getItem("saveToken");
      let sendData = { "mxid": userMX, "files": docArray };
      if (this.token.split(" ")[0] != "Bearer") {
        sendData['token'] = this.token;
      }
      let d = JSON.stringify(sendData);
      this.commonService.deleteDocument(d).subscribe(response => {
        console.log('delete doc response', response);
        if (response.error == false) {
          this.uploadedFiles.splice(index, 1);
          let files = JSON.stringify(response.kycDoc);
          localStorage.setItem("saveFileData", files);
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          for (var i = 0; i < this.uploadedFiles.length; i++) {
            var id = document.getElementById("action" + i);
            id.hidden = true;
          }
        }
        else {
          alert("Something went wrong");
          this.commonService.stopLoader();
          document.body.style.opacity = "1";
        }
      }, error => {
        console.log("delete doc error", error);
        this.commonService.stopLoader();
        alert("Something went wrong");
      })
    }
  }

  getUserKycInfo() {

    this.user = JSON.parse(localStorage.getItem("saveAllUserData"));
    this.token = localStorage.getItem("saveToken");
    let data = { "mxid": this.user.mxid }
    this.userService.getUserKycInfo(data).subscribe(response => {
      console.log("getuser kycinfo", response);
      let data = JSON.parse(localStorage.getItem("saveAllUserData"));
      // document.write(localStorage.getItem("saveFileData"));
      this.commonService.stopLoader();
      this.userName = response.doc.firstname;
      if (response.doc.lastname != undefined && response.doc.lastname != null && response.doc.lastname != "") {
        this.userName = response.doc.firstname + response.doc.lastname;
      };
      if (response.profileImage != undefined) {
        this.userPro = response.profileImage;
      }
      this.userMCC = response.doc.mcc;
      this.userMobile = response.doc.mobile;

      this.fileData = response.kycDoc;
      this.uploadedFiles;
      for (var i = this.fileData.files.length - 1; i >= 0; i--) {
        this.uploadedFiles.push(this.fileData.files[i]);
      }
      localStorage.setItem("saveAllUserData", JSON.stringify(response));
      localStorage.setItem("saveFileData", JSON.stringify(this.fileData));

    }, error => {
      console.log("getuser kycinfo error", error);
    })
  }

  downloadDoc(docDetails: any) {
    document.body.style.opacity = "0.5";
    this.commonService.startLoader();
    let docArray = [];
    docArray.push(docDetails);
    this.user = JSON.parse(localStorage.getItem("saveAllUserData"));
    let userMX = this.user.data.mxid;
    this.token = localStorage.getItem("saveToken");
    let sendData = { "mxid": userMX, "files": docArray };
    if (this.token.split(" ")[0] != "Bearer") {
      sendData['token'] = this.token;
    }
    let d = JSON.stringify(sendData);
    this.commonService.downloadDocument(d).subscribe(response => {
      console.log("download document response", response);
      if (response.error == false) {
        var splitFilename = response.data.filename.split(".");
        var type = splitFilename[splitFilename.length - 1];
        var base64 = response.data.base64;
        var dlnk = document.getElementById('dlink');
        var pdf = 'data:application/' + type + ';base64,' + base64;
        var contentType = 'application/' + type;
        console.log("contentType: " + contentType);
        let blob = this.commonService.convertBase64toBlob(base64, contentType);
        var url = URL.createObjectURL(blob);
        // dlnk.href = url;
        // dlnk.download = response.filename;
        dlnk.click();
        console.log("anchor clicked");
        document.body.style.opacity = "1";
        this.commonService.stopLoader();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
          var id = document.getElementById("action" + i);
          id.hidden = true;
        }
      }
      else {
        alert("Please Try again");
        this.commonService.stopLoader();
        document.body.style.opacity = "1";
      }
    }, error => {
      console.log("download document error", error);
      this.commonService.stopLoader();
      document.body.style.opacity = "1";
      alert("Something went wrong, please refresh");
    })

  }

  viewDoc(docDetails: any) {
    console.log("viewDoc function hit");
    // view document
    document.body.style.opacity = "0.5";
    this.commonService.startLoader();
    let docArray = [];
    docArray.push(docDetails);
    this.user = JSON.parse(localStorage.getItem("saveAllUserData"));
    let userMX = this.user.data.mxid;
    this.token = localStorage.getItem("saveToken");
    var sendData = { "mxid": userMX, "files": docArray };
    if (this.token.split(" ")[0] != "Bearer") {
      sendData['token'] = this.token;
    }
    let d = JSON.stringify(sendData);
    this.commonService.downloadDocument(d).subscribe(response => {
      console.log("view doc response", response);
      console.log(response);
      if (response.error == false) {
        let splitFilename = response.filename.split(".");
        let type = splitFilename[splitFilename.length - 1];
        if (type == "pdf") {
          let base64 = response.base64;
          let binaryImg = atob(base64);
          let length = binaryImg.length;
          let arrayBuffer = new ArrayBuffer(length);
          let uintArray = new Uint8Array(arrayBuffer);

          for (var i = 0; i < length; i++) {
            uintArray[i] = binaryImg.charCodeAt(i);
          }
          let contentType = 'application/' + type;
          console.log("contentType: " + contentType);
          let currentBlob = new Blob([uintArray], { type: contentType });
          this.pdfUrl = URL.createObjectURL(currentBlob);
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          for (var i = 0; i < this.uploadedFiles.length; i++) {
            var id = document.getElementById("action" + i);
            id.hidden = true;
          }
          console.log("$scope.pdfUrl: " + this.pdfUrl);
          window.open(this.pdfUrl);
        }
        else {
          this.Imagebase64 = response.base64;
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          //     $mdDialog.show({
          //   parent: angular.element(document.body),
          //   clickOutsideToClose:true,
          //   template:
          //     '<md-dialog style:"width: 100px;height: 100px;"><md-dialog-content layout="column"><img src={{image}} style="width: 100%; height: 100%;"></md-dialog-content></md-dialog>',
          //   locals: {

          //   },
          //   controller: openImageController
          // });

          // function openImageController($scope, $mdDialog) {
          //   $scope.image = "data:image/jpeg;base64," + $rootScope.Imagebase64;
          //     $scope.cancelDialog = function()
          //     {
          //       $mdDialog.hide();
          //     }
          // };
        }
      }
      else {
        alert("Something went wrong");
        this.commonService.stopLoader();
        document.body.style.opacity = "1";
      }
    }, error => {
      console.log("viewDoc error", error);

      console.log("error: " + JSON.stringify(error));
      this.commonService.stopLoader();
      document.body.style.opacity = "1";
      alert("Something went wrong");

    })
  }
}
