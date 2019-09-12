import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryDataService } from '../../services/country-data.service';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { OrgDetailService } from '../../services/org-detail.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  mobile: string = '';
  btndisable = true;
  allCountries = [];
  countrylist = [];
  mcc: any;
  defaultCountry: any;
  userNationality:any;
  countryJson: any;
  // actionLoader: any;
  open = false;
  disablebtnclass = {};
  nextBtnBgColor: string;
  orgName: any;
  orgPic: any;
  invalidOTP : boolean = false;
  userMobile: string ;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryDataService: CountryDataService,
    private userService: UserService,
    private orgService: OrgDetailService,
    private commonService: CommonService,
    ) { }
  ngOnInit() {
    if(this.defaultLangArray.indexOf(this.defaultLang) !=1) {
      this.commonService.setTranslationLanguage(this.defaultLang);
     }
     else {
       this.commonService.setTranslationLanguage('en');
     }
    this.getAllCountrylist();
    this.commonService.stopLoader();
    console.log("oninit loader");
  }

  // setOrgNameAndOrgPic () {
  //   if(localStorage.getItem("rawmx") != undefined && localStorage.getItem("rawmx") != null && localStorage.getItem("rawmx") != "") {
  //     let rawmx = JSON.parse(localStorage.getItem("rawmx"));
  //     this.orgName = rawmx.orgName;
  //     this.orgPic = rawmx.orglogo;
  //   }
  //   let user = JSON.parse(localStorage.getItem("saveUserData"));
  //   this.commonService.startLoader();
  //   this.invalidOTP = false;
  //   this.userMobile = user.mcc + " " + user.mobile;
  // }

  changeCountry(countrycode: any) {
    this.mcc = countrycode;
    this.open = false;
  }
  showDropdown() {
    this.open = true;
  }

  openedChange(event: any) {
      this.open = !this.open;
      console.log("openend change", event.value, this.open);
  }
  getAllCountrylist () {
    this.countryDataService.getCountryData()
    .subscribe(response => {
      this.countrylist = response.data;
      for (var i = 0; i < this.countrylist.length; i++) {
        for (var j = 0; j < this.countrylist[i].mcc.length; j++) {
          var json = { "country": this.countrylist[i].country, "mcc": this.countrylist[i].mcc[j], "nationality": this.countrylist[i].nationality, "country_code": this.countrylist[i].alpha2code };
          this.allCountries.push(json);
        }
      }
      this.callback(this.allCountries);
      this.getIpMcc();
    },
      error => {
        console.log(error);
      }
    );
  }

  getIpMcc () {
    this.countryDataService.getGeoIp().
    subscribe(response => {
      console.log("getIpMcc response", response);
      var userCountryCode = response.country_code;
      for(var i = 0;i <this.allCountries.length;i++)
      {
          if(this.allCountries[i].country_code.toLowerCase() == userCountryCode.toLowerCase())
          {    
            this.secondCallback(this.allCountries[i]);
          }
      }
      if(!this.mcc)
      {
          this.mcc = this.defaultCountry.mcc;
          this.userNationality = this.defaultCountry.nationality;
          localStorage.setItem("userCountry",this.defaultCountry.country);
      }
    }, error => {
      console.log("error in getipmcc", error);
    })
  }

  mobileChanged() {
    console.log("mobilenumber  changed");
    if(this.mobile) {
      this.btndisable = false;
      this.nextBtnBgColor='#00BCD4';
    }
    else {
      this.btndisable = true;
      this.nextBtnBgColor = '#C2C2C2';
    }
  }

  getSelectedContributions = function (value: any, country: any, nationality: any) {
    if (value != null && value != "") {
			this.codeCountry = value;
			this.userNationality = nationality;
			this.selectBox = false;
			localStorage.setItem("userCountry",country);
			return value;
    }
    else {
      return "MCC";
    }
  }
  
  getCountryDetails(value: any, country: any, nationality: any) {
    if (value != null && value != "") {
      console.log(value + "........" + country + "......." + nationality);
      let codeCountry = value;
      let userNationality = nationality;
      let selectBox = false;
      localStorage.setItem("userCountry", country);
      return value;
    }
    else {
      return "MCC";
    }
  }


  verifyOTP() {
    console.log("verify otp method");
    document.body.style.opacity = "0.5";
    this.commonService.startLoader();
    console.log("verifyotp start loader");
    localStorage.setItem("userNationality", this.userNationality);
    let jsonObj = { "mobile": this.mobile, "mcc": this.mcc, "nationality": this.userNationality };
    let jsonData = JSON.stringify(jsonObj);
    localStorage.setItem("saveUserData", jsonData);
    this.userService.verifyUserOTP(jsonData).
      subscribe(response => {
        console.log("sendotp success response");
        console.log("send otp response *******************", response);
        console.log("send otp response ******************* message", response);
        if (response.body.message == "demo") {
          if (response.body.mxid == undefined || response.body.mxid == "undefined") {
            document.body.style.opacity = "1";
            console.log(1);
            this.commonService.stopLoader();
            this.router.navigate(['/form']);
            console.log("after redirecting");
            localStorage.setItem("saveRawMX", JSON.stringify(response.body.rawmx));
          }
          else {
            localStorage.setItem("saveAllUserData", JSON.stringify(response.body));
            localStorage.setItem("saveFileData", JSON.stringify(response.body.kycDoc));
            if (response.body.token == undefined || response.body.token == null || response.body.token == "") {
              console.log("headers",response.headers.get('Authorization'))
              localStorage.setItem("saveToken", response.headers.get('Authorization'));
            }
            else {
              localStorage.setItem("saveToken", response.body.token);
            }
            this.orgService.orgDetail().subscribe(response => {
               document.body.style.opacity = "1";
               this.commonService.stopLoader();
               console.log('orgdetail response', response);
            	if(response.pendingrequest.length > 0) {
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
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          if (response.body.rawmx != undefined && response.body.rawmx != null && response.body.rawmx != "") {
            localStorage.setItem("rawmx", JSON.stringify(response.body.rawmx));
            this.router.navigate(['/verifyOrgOtp']);
          }
          else {
            this.router.navigate([ "/verify"] );
          }
        }
      },
        error => {
          console.log("sendotp error response");
          console.log(error);
          document.body.style.opacity = "1";
          this.commonService.stopLoader();
          console.log(4);
          alert("Please Try Again");
        }
      )
  }

  updateSearch(event: any) {
    event.stopPropagation();
  }

  getCountryData(countryLists) {
    this.countryJson = countryLists;
    let mccqueryparameter = this.route.snapshot.queryParamMap.get('mcc');
    if (this.mcc) {
      for (var i = 0; i < this.countryJson.length; i++) {
        this.route.snapshot.paramMap.get('mcc');
          if(mccqueryparameter == this.countryJson[i].mcc)
          {
            this.mcc = mccqueryparameter;
            this.userNationality = this.countryJson[i].nationality;
            localStorage.setItem("userCountry", this.countryJson[i].country);
          }
        }
      }
    }

  callback(countryLists :any) {
    this.countryJson = countryLists;
    if(this.mcc)
    {
      for(var i = 0;i< this.countryJson.length;i++)
      {
        if(this.mcc == this.countryJson[i].mcc)
        {
          let userNationality = this.countryJson[i].nationality;
          localStorage.setItem("userCountry", this.countryJson[i].country);
        }
      }
    }
    if(this.mobile)
    {
      this.commonService.startLoader();
      console.log("mobile loader");
      document.body.style.opacity = "0.5";
      this.btndisable = false;
      this.nextBtnBgColor='#00BCD4';
      if(this.mobile && this.mcc)
      {
        this.verifyOTP();
      }
    }
  }
  secondCallback(defaultCountry: any) {
    console.log("secondCallback");
    if (!this.mcc) {
      this.mcc = defaultCountry.mcc;
      this.userNationality = defaultCountry.nationality;
      localStorage.setItem("userCountry", defaultCountry.country);
    }
  }

}
