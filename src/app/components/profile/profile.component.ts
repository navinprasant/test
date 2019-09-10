import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  maxDateOfYear = new Date(new Date().setDate(new Date().getDate()-1));
  user: any;
  firstName: any;
  lastName: any;
  clickbase64: any;
  dob: any;
  sideDob: any;
  memberSince: any;
  blueBody: boolean;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.stopLoader();
    if (this.defaultLangArray.indexOf(this.defaultLang) != 1) {
      this.commonService.setTranslationLanguage(this.defaultLang);
    }
    else {
      this.commonService.setTranslationLanguage('en');
    }
    this.commonService.stopLoader();
    this.init();
  }

  updateSearch(event: any) {
    event.stopPropagation();
  }
  goBack() {
    window.history.back();
  }

  initialize() {

      // initialize values function 

          this.user = JSON.parse(localStorage.getItem("saveAllUserData"));
          console.log(this.user);
          this.sideDob = this.commonService.dobProFormat(this.user.data.doc.DOB);
          this.memberSince = this.commonService.getTimeFormat(this.user.data.doc.crtime);
          this.firstName = this.user.data.doc.firstname;
          if(this.user.data.doc.lastname)
          { 
            this.lastName = this.user.data.doc.lastname; 
          }
          if(this.user.data.profileImage)
          {
              this.clickbase64 = this.user.data.profileImage;
          }
          this.dob = this.user.data.doc.DOB;
          // if(!$routeParams.redirectId) {
          //     countryWithStates.gettingCountryWithStates(function(countries){
          //         $scope.allCountries = countries; 
          //         if($scope.user.data.doc.address)
          //         {
          //             $scope.addressLane = $scope.user.data.doc.address.street;
          //             $scope.addressCity = $scope.user.data.doc.address.city;
          //             $scope.addressCountry = $scope.user.data.doc.address.country;
          //             $scope.showState($scope.addressCountry);
          //             $scope.addressZipCode = $scope.user.data.doc.address.zip;
          //             $scope.addressState = $scope.user.data.doc.address.state;
          //         } 
          //     },function(defaultCountry){
          //         if(!$scope.user.data.doc.address)
          //         {
          //             $scope.addressCountry = defaultCountry.country_name;
          //             $scope.addressCity = defaultCountry.city;
          //             $scope.showState($scope.addressCountry);
          //             for(var i = 0; i < $scope.allStates.length; i++)
          //             {
          //                 console.log(defaultCountry.state.search($scope.allStates[i]));
          //                 if(defaultCountry.state.search($scope.allStates[i]) >= 0)
          //                 {
          //                     console.log($scope.allStates[i]);
          //                     $scope.addressState = $scope.allStates[i];
          //                     break;
          //                 }
          //             }
          //             $scope.addressZipCode = defaultCountry.postal;
          //         }
          //     }) 
          // }
  }
  init() {
    this.blueBody = true;
    this.initialize();
  }

  showState() {

  }










    //   $scope.actionLoader = true;
    //   // show states function
    //   $scope.showState = function(country)
    //   {
    //       for(var i = 0; i< $scope.allCountries.length; i++)
    //       {
    //           if(country.toLowerCase() == $scope.allCountries[i].country.toLowerCase())
    //           {
    //               $scope.allStates = $scope.allCountries[i].states;
    //               break;
    //           }
    //       }
    //   }
    //   // profile function
    //   $scope.proVisible = true;
    //   $scope.showPro = function()
    //   {   
    //       $scope.proVisible = !$scope.proVisible;
    //   }
    //   // code for pics click
    // $scope.openCameraCapture = function()
    // {
    //   $scope.actionLoader = false;
    //   document.body.style.opacity = "0.5";
    //       if(!$routeParams.redirectId) {
    //           $timeout(function(){
    //               $scope.blueBody = false;
    //           },500)
    //       }
    //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     // Not adding `{ audio: true }` since we only want video now
    //     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    //       console.log(stream);
    //       localstream = stream;
    //       var video = document.getElementById('video');
    //       //video.src = window.URL.createObjectURL(stream);
    //       video.srcObject = stream;
    //       video.play();
    //       document.body.style.opacity = "1";
    //       $scope.actionLoader = true;
    //       $scope.$apply();
    //     },function(error) {
    //               console.log("navigator error stream");
    //               console.log(error);
    //           });
    //   }  
    // }
    // $scope.cancelClick = function() {
    //       vidOff();
    //       if($routeParams.redirectId) {
    //           $timeout(() => {
    //               console.log("removeIframe");
    //               window.parent.postMessage("closeIframeSubmitKyc","*");
    //               // window.close();
    //           }, 500);
    //       }
    //       else {
    //           $scope.blueBody = true;
    //       }
    //   };
    //   var localstream;
    //   // Elements for taking the snapshot
    //   $scope.video = document.getElementById('video');
    //   $scope.captureClick = function()
    //   {
    //   $scope.clickbase64 = getBase64Image($scope.video);
    //       const videoElem = document.querySelector("video");
    //       vidOff();
    //       videoElem.hidden = true;
    //       document.querySelector("#clickedImage").hidden = false;
    //       if($routeParams.redirectId) {
    //           $scope.clickbtns = false;
    //       }
    //   localStorage.setItem("saveUserImage",$scope.clickbase64);
    //       var json = {"baseimage":$scope.clickbase64,"mxid":$scope.user.data.mxid};
    //       var url = getURL();
    //       $scope.actionLoader = false;
    //       document.body.style.opacity = "0.4";
    //       $http({
    //           method: "POST",
    //           url: url.postimage,
    //           data: json
    //       }).then(function(result){
    //           console.log("image post api response");
    //           console.log(result);
    //           $scope.actionLoader = true;
    //           document.body.style.opacity = "1";
    //       },function(error){
    //           console.log(error);
    //           $scope.actionLoader = true;
    //           document.body.style.opacity = "1";
    //       })
    //       if(!$routeParams.redirectId) {
    //           $timeout(() => {
    //               $scope.blueBody = true;
    //           },500)
    //           vidOff();
    //       }
    //   }
    //   function vidOff() {
    //   //clearInterval(theDrawLoop);
    //   //ExtensionData.vidStatus = 'off';
    //   video.pause();
    //   video.src = "";
    //   localstream.getTracks()[0].stop();
    //   console.log("Vid off");
    //   }
    //   // update profile button
    //   $scope.updateProfile = function()
    //   {
    //     var url = getURL();
    //       var json = {};
    //       json.kycdv = {"carrierName":"NA","deviceToken":"NA","installVersion":url.build_version,"modelNumber":"NA", "udid": "NA"};
    //       console.log("json declared");
    //       if(window.ui.os)
    //       {
    //           json.kycdv.os = window.ui.os;
    //       }
    //       else
    //       {
    //           json.kycdv.os = "NA";
    //       }
    //       if(window.ui.platform)
    //       {
    //           json.kycdv.platform = window.ui.platform;
    //       }
    //       else
    //       {
    //           json.kycdv.platform = "NA";
    //       }
    //       if(window.ui.osversion)
    //       {
    //           json.kycdv.systemVersion = window.ui.osversion;
    //       }
    //       else
    //       {
    //           json.kycdv.systemVersion = "NA";
    //       }
    //       console.log("json kycdv done");
    //       if($scope.firstName)
    //       {
    //         json.firstname = $scope.firstName;
    //       }
    //       else
    //       {
    //         $scope.errorFirstName = true;
    //       }
    //       if($scope.lastName)
    //       {
    //         json.lastname = $scope.lastName;
    //       }
    //       else
    //       {
    //         $scope.errorLastName = true
    //       }
    //       if($scope.dob)
    //       {
    //         json.dob = $scope.dob;
    //       }
    //       else
    //       {
    //         $scope.errorDob = true;
    //       }
    //       if($scope.addressLane || $scope.addressCity || $scope.addressState || $scope.addressCountry || $scope.addressZipCode || $scope.user.data.doc.address)
    //       {
    //         json.address = {};
    //         if($scope.addressLane)
    //         {
    //           json.address.street = $scope.addressLane;
    //         }
    //         else
    //         {
    //           $scope.errorlane = true;
    //         }
    //         if($scope.addressCity)
    //         {
    //           json.address.city = $scope.addressCity;
    //         }
    //         else
    //         {
    //           $scope.errorCity = true;
    //         }
    //         if($scope.addressState)
    //         {
    //           json.address.state = $scope.addressState;
    //         }
    //         else
    //         {
    //           $scope.errorState = true;
    //         }
    //         if($scope.addressCountry)
    //         {
    //           json.address.country = $scope.addressCountry;
    //         }
    //         else
    //         {
    //           $scope.errorCountry = true;
    //         }
    //         if($scope.addressZipCode)
    //         {
    //           json.address.zip = $scope.addressZipCode;
    //         }
    //         else
    //         {
    //           $scope.errorZip = true;
    //         }
    //       }
    //       if($scope.clickbase64)
    //       {
    //         json.profileImage = $scope.clickbase64;
    //       }
    //       json.mobile = $scope.user.data.doc.mobile;
    //       json.mcc = $scope.user.data.doc.mcc;
    //       json.email = $scope.user.data.doc.email;
    //       json.nationality = localStorage.getItem("userNationality");
    //       if(($scope.addressLane && $scope.addressCity && $scope.addressState && $scope.addressCountry && $scope.addressZipCode) || ($routeParams.redirectId))
    //       {
    //         $scope.actionLoader = false;
    //       document.body.style.opacity = "0.4";
    //           $http({
    //               method: "POST",
    //               url: url.updateuserprofileinfo,
    //               data: json,
    //           }).then(function(response){
    //               console.log(response);
    //               $scope.actionLoader = true;
    //               document.body.style.opacity = "1";
    //               console.log(document.body.style.opacity);
    //               localStorage.setItem("saveAllUserData",JSON.stringify(response));
    //               initialize();
    //               if( /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //                   $location.path('/mprofile');
    //               }
    //               else
    //               {
    //                   setTimeout(function() {
    //                       successFunction();
    //                   }, 10);
    //               }
    //               if($routeParams.redirectId) {
    //                   webSocket.createWebSocket(() => {
    //                   });
    //               }
    //           },function(error){
    //               console.log(error);
    //               $scope.actionLoader = true;
    //               document.body.style.opacity = "1";
    //           });
    //       }
    //   }
    //   // success update function
    //   function successFunction()
    //   {
    //     $mdDialog.show({
    //       parent: angular.element(document.body),
    //       clickOutsideToClose:true,
    //       templateUrl: 'partials/dialogs/success.html',
    //       controller: successController
    //   });
    //   function successController($scope,$routeParams,$window)
    //   {
    //     document.body.style.opacity = "1";
    //     $scope.cancelDialog = function()
    //     {
    //       document.body.style.opacity = "1";
    //               if($routeParams.redirectId) {
    //                   console.log("window close");
    //                   $window.close();
    //               }
    //       $mdDialog.hide();
    //     }
    //   }
    //   }

  



























}
