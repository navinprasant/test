import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobileprofile',
  templateUrl: './mobileprofile.component.html',
  styleUrls: ['./mobileprofile.component.css']
})
export class MobileprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // app.controller('mobilemenuController', ['$scope', function($scope) {

  //   console.log(window.location.port);
  //   $scope.closeMenu = function()
  //   {
    
  //      window.history.back();
  //   }
  //   $scope.loadAppStore = function()
  //   {
  //       window.open("https://itunes.apple.com/in/app/diro-identity/id1408537104?mt=8");
  //   }
  //   $scope.loadPlayStore = function()
  //   {
  //       window.open("https://play.google.com/store/apps/details?id=com.diro.kyc");
  //   }
  //   }])









  // app.controller('mobileprofileController',['$rootScope','$scope','$window','$http','$location',function ($rootScope,$scope,$window,$http,$location) {
  //   $scope.gotomenu = function()
  //   {
  //      $location.path('/mobilemenu');   
  //   }
  //   $scope.goEditProfile = function()
  //   {
  //     $location.path('/profile'); 
  //   }
  //   function getData(files){
  //     var addArr = [];
  //     var idArr = [];
  //     var bankArr = [];
  //     var other = [];
  //     for(var i = 0;i<files.length;i++)
  //     {
  //       if(files[i].category == "idProof" || files[i].category == "idproof")
  //       {
  //         idArr.push(files[i]);
  //       }
  //       else if(files[i].category == "addressProof")
  //       {
  //         addArr.push(files[i]);
  //       }
  //       else if(files[i].category == "bankstatement")
  //       {
  //         bankArr.push(files[i]);
  //       }
  //       else if(files[i].category == "other")
  //       {
  //         other.push(files[i]);
  //       }
  //     }
  //     if(addArr.length > 0)
  //     {
  //       formatData(addArr);
  //     }
  //     if(idArr.length > 0)
  //     {
  //       formatData(idArr);
  //     }
  //     if(bankArr.length > 0)
  //     {
  //       formatData(bankArr);
  //     }
  //     if(other.length > 0)
  //     {
  //       formatData(other);
  //     }
  //   }
  //   function formatData(arr)
  //   {
  //     var flag = 0;
  //     for(var i = 0;i<arr.length;i++)
  //     {
  //       if(arr[i].status == 'verified')
  //       {
  //         $scope.kycFiles.push(arr[i]);
  //         flag = 1;
  //         break;
  //       }
  //     }
  //     if(flag == 0)
  //     {
  //       var maxEptime = arr[0].eptime;
  //       var maxArrVal = arr[0];
  //       for(var i = 1;i<arr.length;i++)
  //       {
  //         if(maxEptime < arr[i].eptime)
  //         {
  //           maxEptime = arr[i].eptime;
  //           maxArrVal = arr[i];
  //         }
  //       }
  //       $scope.kycFiles.push(maxArrVal);
  //     }
  //     console.log($scope.kycFiles);
  //   }
  //   $scope.getFilename = function(str)
  //   {
  //     if(str.length > 15)
  //     {
  //       return str.substring(0,15) + "...";
  //     }
  //     else
  //     {
  //       return str;
  //     }
  //   }
  //   function init()
  //   {
  //     $scope.user = JSON.parse(localStorage.getItem("saveAllUserData"));
  //     $scope.memberSince = getTimeFormat($scope.user.data.doc.crtime);
  //     $scope.kycFiles = [];
  //     getData($scope.user.data.kycDoc.files);
  //     console.log($scope.user);
  //   }
  //   init();
  // }])










}
