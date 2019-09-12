import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-consent-management',
  templateUrl: './consent-management.component.html',
  styleUrls: ['./consent-management.component.css']
})
export class ConsentManagementComponent implements OnInit {
  defaultLang = window.navigator.language;
  proVisible = true;
  user = JSON.parse(localStorage.getItem("saveAllUserData"));
  userName = this.user.doc.firstname;
  userPro: any;

  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.commonService.stopLoader();
      //     if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
      // {
      //     $translate.use($scope.defaultLang);
      // }
      // else
      // {
      //     $translate.use('en');
      // }
  }

  showPro() {
    this.proVisible = !this.proVisible;
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  gotomenu() {
    this.router.navigate(['/mobilemenu']);
  }

  setUserData() {
      if(this.user.data.doc.lastname != undefined && user.data.doc.lastname != "undefined" && user.data.doc.lastname != null && user.data.doc.lastname != "null" && user.data.doc.lastname != "")
    {
      this.userName = this.user.doc.firstname + " " + this.user.doc.lastname;
    }
    if(this.user.data.profileImage != undefined)
    {
      this.userPro = this.user.profileImage;
    }

    $scope.userMCC = user.data.doc.mcc;
//     $scope.userMobile = user.data.doc.mobile;
//     $scope.allOrgsrect = true;
//     $scope.actionLoader = false;
  }


//     $scope.userMCC = user.data.doc.mcc;
//     $scope.userMobile = user.data.doc.mobile;
//     $scope.allOrgsrect = true;
//     $scope.actionLoader = false;
//     var token = localStorage.getItem("saveToken");
//     document.body.style.opacity = "0.5";
//     var url = getURL();
//     $http({
//       method: "POST",
//       url: url.orginivitationdetails,
//       data: {"mxid":user.data.mxid,"mobile":user.data.doc.mobile,"token":token},
//       headers: {
//         "Authorization": token
//       }
//     }).then(function(response){
//       console.log(response);
//       $scope.orgsList = response.data;
//       $scope.allOrgsrect = false;
//       $scope.actionLoader = true;
//       document.body.style.opacity = "1";
//     },function(err){
//       console.log(err);
//       $scope.allOrgsrect = true;
//       $scope.actionLoader = false;
//       document.body.style.opacity = "0.5";
//       alert("Something went wrong");
//     })
//     $scope.getRequestTime = function(epoc)
//     {
//       console.log(epoc);
//       var time = getPrettyTiming(epoc);
//       return time;
//     }
//     $scope.acceptOrgReq = function(orgData,index)
//     {
//       $scope.actionLoader = false;
//       document.body.style.opacity = "0.5";
//       var user = JSON.parse(localStorage.getItem("saveAllUserData"));
//       var token = localStorage.getItem("saveToken");
//       let urlToken = guid();
//       var json = {"mxid":user.data.mxid,"status":true,"apikey":orgData.apikey,"orgid":orgData.orgid};
//       var url = getURL();
//       $http({
//         method: "POST",
//         url: url.orgverifiedinvite,
//         data: json,
//         headers: {
//           "Authorization": token
//         }
//       }).then(function(response){
//         console.log(response);
//         if(response.data.message == "successful")
//         {
//           $scope.orgsList.pendingrequest.splice(index,1);
//           var json = orgData;
//           json.status = true;
//           json.eptime = new Date().getTime();
//           if($scope.orgsList.allorgdetail != undefined)
//           {
//             $scope.orgsList.allorgdetail.unshift(json);
//           }
//           else
//           {
//             $scope.orgsList.allorgdetail = [];
//             $scope.orgsList.allorgdetail.push(json);
//           }
//           $scope.actionLoader = true;
//           document.body.style.opacity = "1";	
//           window.location.href = orgData.boardurl;
//         }
//         else
//         {
//           $scope.actionLoader = true;
//           document.body.style.opacity = "1";
//           alert("Something went wrong");
//         }
//       },function(err){
//         console.log(err);
//         $scope.actionLoader = true;
//         document.body.style.opacity = "1";
//         alert("Something went wrong");
//       })
//     }
//     $scope.rejectOrgReq = function(orgData,index)
//     {
//       $scope.actionLoader = false;
//       document.body.style.opacity = "0.5";
//       var user = JSON.parse(localStorage.getItem("saveAllUserData"));
//       var token = localStorage.getItem("saveToken");
//       var json = {"mxid":user.data.mxid,"status":false,"apikey":orgData.apikey,"orgid":orgData.orgid,"token":token};
//       var url = getURL();
//       $http({
//         method: "POST",
//         url: url.orgverifiedinvite,
//         data: json,
//         headers: {
//           "Authorization": token
//         }
//       }).then(function(response){
//         console.log(response);
//         if(response.data.message == "successful")
//         {
//           $scope.orgsList.pendingrequest.splice(index,1);
//           var json = orgData;
//           json.status = false;
//           json.eptime = new Date().getTime();
//           if($scope.orgsList.allorgdetail != undefined)
//           {
//             $scope.orgsList.allorgdetail.unshift(json);
//           }
//           else
//           {
//             $scope.orgsList.allorgdetail = [];
//             $scope.orgsList.allorgdetail.push(json);
//           }
//           $scope.actionLoader = true;
//           document.body.style.opacity = "1";
//         }
//         else
//         {
//           $scope.actionLoader = true;
//           document.body.style.opacity = "1";
//           alert("Something went wrong");
//         }
//       },function(err){
//         console.log(err);
//         $scope.actionLoader = true;
//         document.body.style.opacity = "1";
//         alert("Something went wrong");
//       })
//     }
//     $scope.changeSwitchStatus = function(orgData,status,index)
//     {
//       $scope.actionLoader = false;
//       document.body.style.opacity = "0.5";
//       var user = JSON.parse(localStorage.getItem("saveAllUserData"));
//       var token = localStorage.getItem("saveToken");
//       var url = getURL();
//       $http({
//         method: "POST",
//         url: url.orgswitchstatus,
//         data: {"mxid":user.data.mxid,"orgid":orgData.orgid,"status":status,"token":token},
//         headers: {
//           "Authorization": token
//         }
//       }).then(function(response){
//         console.log(response);
//         if(response.data.message == "successful")
//         {
//           $scope.actionLoader = true;
//           document.body.style.opacity = "1";
//           if(status == true && orgData.boardurl)
//           {
//             window.location.href = orgData.boardurl;
//           }
//         }
//         else
//         {
//           if(status == true)
//           {
//             $scope.orgsList.allorgdetail[index].status = false;
//             $scope.actionLoader = true;
//             document.body.style.opacity = "1";
//             alert("Something went wrong");
//           }
//           else
//           if(status == false)
//           {
//             $scope.orgsList.allorgdetail[index].status = true;
//             $scope.actionLoader = true;
//             document.body.style.opacity = "1";
//             alert("Something went wrong");
//           }
//         }
//       },function(err){
//         console.log(err);
//         $scope.actionLoader = true;
//         document.body.style.opacity = "1";
//         alert("Something went wrong");
//       })
//     }


}
