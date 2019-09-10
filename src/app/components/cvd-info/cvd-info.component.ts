import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-cvd-info',
  templateUrl: './cvd-info.component.html',
  styleUrls: ['./cvd-info.component.css']
})
export class CvdInfoComponent implements OnInit {
  userProfile = true;
  AllData = {"BankStatementStatus":"NA"};
  user = JSON.parse(localStorage.getItem("saveAllUserData"));
  token = localStorage.getItem("saveToken");
  userDob = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

    // profile function
  showPro = function () {
    this.userProfile = !this.userProfile;
  }

  getUserKycInfo() {
    let data = { "mxid": this.user.data.mxid };
    this.userService.getUserKycInfo(data).
      subscribe(response => {
        console.log(response);
        this.AllData = response.data;
        if (response.data.doc.DOB != undefined && response.data.doc.DOB != "undefined" && response.data.doc.DOB != null && response.data.doc.DOB != "null" && response.data.doc.DOB != "") {
          this.userDob = this.commonService.dobProFormat(response.data.doc.DOB);
        }
      },
        error => {
          console.log();
        })
  }

  loadMainMenu() {
    this.router.navigate(['/docType']);
  }
  loadAppStore() {
    window.open("https://itunes.apple.com/in/app/diro-identity/id1408537104?mt=8");
  }
  loadPlayStore = function () {
    window.open("https://play.google.com/store/apps/details?id=com.diro.kyc");
  }
  showVideo ()
    {
        // $mdDialog.show({
        //     parent: angular.element(document.body),
        //     clickOutsideToClose:true,
        //     template:
        //         '<md-dialog><md-dialog-content><iframe width="420" height="345" src="https://www.youtube.com/embed/JuHUGFNM77w" frameborder="0" allowfullscreen></iframe></md-dialog-content></md-dialog>',
        //     locals: {
                
        //     },
        //     controller: linkController
        //     });

        //     function linkController($scope, $mdDialog, $location) {
        //     $scope.cancelDialog = function()
        //     {
        //       $mdDialog.hide();
        //     }
        // };
    }

    loadHome ()
    {
        this.router.navigate(['/docType']);
    }

}
