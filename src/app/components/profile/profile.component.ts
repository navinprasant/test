import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CountryDataService } from '../../services/country-data.service';
import { UserService } from '../../services/user.service';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import {SuccessComponent } from '../../dialogs/success/success.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  maxDateOfYear = new Date(new Date().setDate(new Date().getDate() - 1));
  user: any;
  firstName: any;
  lastName: any;
  clickbase64: any;
  dob: any = "1991/02/08";
  sideDob: any;
  memberSince: any;
  blueBody: boolean;
  date: any;
  allCountries: any;
  addressLane: any;
  addressCity: any;
  addressCountry: any;
  addressZipCode: any;
  addressState: any;
  allStates: any;
  errorlane: boolean;
  errorCity: boolean;
  errorState: boolean;
  errorCountry: boolean;
  errorZip: boolean;
  formerror :boolean = false;
  dialogRef: MatDialogRef<SuccessComponent, any>;

  constructor(
    private commonService: CommonService,
    private countryService: CountryDataService,
    private userService: UserService,
    public dialog: MatDialog
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
    this.date = new FormControl(new Date("1991/02/04"));
  }

  updateSearch(event: any) {
    event.stopPropagation();
  }
  goBack() {
    window.history.back();
  }

  initialize() {
    this.user = JSON.parse(localStorage.getItem("saveAllUserData"));
    console.log("this user", this.user);
    this.sideDob = this.commonService.dobProFormat(this.user.doc.DOB);
    this.memberSince = this.commonService.getTimeFormat(this.user.doc.crtime);
    this.firstName = this.user.doc.firstname;
    if (this.user.doc.lastname) {
      this.lastName = this.user.doc.lastname;
    }
    if (this.user.profileImage) {
      this.clickbase64 = this.user.profileImage;
    }
    this.dob = this.user.doc.DOB;
    this.dob = "1991/02/08";
    this.countryService.getCountryWithStates().subscribe(response => {
      this.allCountries = response.countries;
      if (this.user.doc.address) {
        this.addressLane = this.user.doc.address.street;
        this.addressCity = this.user.doc.address.city;
        this.addressCountry = this.user.doc.address.country;
        this.showState(this.addressCountry);
        this.addressZipCode = this.user.doc.address.zip;
        this.addressState = this.user.doc.address.state;
      }
      this.countryService.getGeoIp().subscribe(response => {
        if (!this.user.doc.address) {
          this.addressCountry = response.country_name;
          this.addressCity = response.city;
          this.showState(this.addressCountry);
          // for(var i = 0; i < this.allStates.length; i++)
          // {
          //     // console.log(defaultCountry.state.search($scope.allStates[i]));
          //     if(response.state.search($scope.allStates[i]) >= 0)
          //     {
          //         console.log($scope.allStates[i]);
          //         $scope.addressState = $scope.allStates[i];
          //         break;
          //     }
          // }
          this.addressZipCode = response.postal;
        }
      }, error => {
        console.log("get geoip", error);
      })
    },
      error => {
        console.log("country with state error", error);
      }
    )
  }

  init() {
    this.blueBody = true;
    this.initialize();
  }

  addEvent(type: any, event: any) {
    let date = event.value.getDate();
    let month = event.value.getMonth() + 1;
    let year = event.value.getFullYear();
    this.dob = date + "/" + month + "/" + year;
  }

  showState(country: any) {
    for (var i = 0; i < this.allCountries.length; i++) {
      if (country.toLowerCase() == this.allCountries[i].country.toLowerCase()) {
        this.allStates = this.allCountries[i].states;
        console.log(this.allStates);
        break;
      }
    }
  }

  updateProfile() {
    console.log("firstname",this.firstName);
    console.log("lastname",this.lastName);
    console.log("dob",this.dob);
    console.log("Address",this.addressLane);
    console.log("city",this.addressCity);
    console.log("country",this.addressCountry);
    console.log("zipcode",this.addressZipCode);
    console.log("state",this.addressState);
    var json = {};
    json['kycdv'] = {"carrierName":"NA","deviceToken":"NA","installVersion":environment.build_version,"modelNumber":"NA", "udid": "NA"};
    console.log("json declared");
    if(navigator['oscpu'])
      {
          json['kycdv']['os'] = 'window.ui.os';
      }
      else
      {
          json['kycdv']['os'] = "NA";
      }

    if(window['platform'])
      {
          json['kycdv']['platform'] = 'window.ui.platform';
      }
      else
      {
        json['kycdv']['platform'] = "NA";
      }
    if('window.osversion')
      {
        json['kycdv']['systemVersion'] = 'window.ui.osversion';
      }
      else
      {
          json['kycdv']['systemVersion'] = "NA";
      }

      json['firstname'] = this.firstName;
      json ['lastname'] =  this.lastName;
      json['dob'] = this.dob;
      if(this.addressLane || this.addressCity || this.addressState || this.addressCountry || this.addressZipCode || this.user.doc.address)
      {
        json['address'] = {};
        if(this.addressLane)
        {
          json['address']['street'] = this.addressLane;
        }
        else
        {
          this.errorlane = true;
          this.formerror = true;
        }
        if(this.addressCity)
        {
          json['address']['city'] = this.addressCity;
        }
        else
        {
          this.errorCity = true;
          this.formerror = true;
        }
        if(this.addressState)
        {
          json['address']['state'] = this.addressState;
        }
        else
        {
          this.errorState = true;
          this.formerror = true;
        }
        if(this.addressCountry)
        {
          json['address']['country'] = this.addressCountry;
        }
        else
        {
          this.errorCountry = true;
          this.formerror = true;
        }
        if(this.addressZipCode)
        {
          json['address']['zip'] = this.addressZipCode;
        }
        else
        {
          this.errorZip = true;
          this.formerror = true;
        }
      }

    if(this.clickbase64)
      {
        json['profileImage'] = this.clickbase64;
      }

      json['mobile'] = this.user.doc.mobile;
      json['mcc'] = this.user.doc.mcc;
      json['email'] = this.user.doc.email;
      json['nationality'] = localStorage.getItem("userNationality");

      if(!this.formerror)
      {

        this.commonService.startLoader();
        this.userService.updateUserProfileInfo(json).subscribe(response => {
          console.log("update user profile info", response);
              this.commonService.stopLoader();
              localStorage.setItem("saveAllUserData",JSON.stringify(response.body));
              this.initialize();
              setTimeout( () => {
                this.successFunction();
            }, 10);
              // if( /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
              //     $location.path('/mprofile');
              // }
              // else
              // {
              //     setTimeout(function() {
              //         successFunction();
              //     }, 10);
              // }
              // if($routeParams.redirectId) {
              //     webSocket.createWebSocket(() => {
              //     });
              // }

        }, error => {
          console.log(" update user profile info error",error);
              this.commonService.stopLoader();
              document.body.style.opacity = "1";
        })
      }

  }



  successFunction () {
      console.log('success function');
       this.dialogRef = this.dialog.open(SuccessComponent, {
        data: {name: 'this.name', animal: 'this.animal'}
      });
      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
  }

  // function successFunction()
  // {
  //   $mdDialog.show({
  //     parent: angular.element(document.body),
  //     clickOutsideToClose:true,
  //     templateUrl: 'partials/dialogs/success.html',
  //     controller: successController
  // });
  // function successController($scope,$routeParams,$window)
  // {
  //   document.body.style.opacity = "1";
  //   $scope.cancelDialog = function()
  //   {
  //     document.body.style.opacity = "1";
  //             if($routeParams.redirectId) {
  //                 console.log("window close");
  //                 $window.close();
  //             }
  //     $mdDialog.hide();
  //   }
  // }
  // }































}
