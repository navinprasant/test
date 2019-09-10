import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrgDetailService } from '../../services/org-detail.service'
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-doc-type',
  templateUrl: './doc-type.component.html',
  styleUrls: ['./doc-type.component.css']
})
export class DocTypeComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit {
  defaultLang = window.navigator.language;
  defaultLangArray = ["en", "ru", "fr", "de", "ar", "zh-CN", "nl", "pt", "es", "vi", "ja"];
  isExtAvailable = "false";
  // ext check varibles
  downloadExt = false;
  enableExtension = false;
  mainWrapPart = "main-wrap";
  dashboardButton = false;
  mainWrap = false;
  VideoButton = true;
  actionLoader = false;
  // document.body.style.opacity = "0.1";
  atleastWarning: string = "Please verify your self using online docume";
  // id wrap variables
  idSingleTick = false;
  idDoubleTick = false;
  idWhiteTick = false;
  idRejectedTick = false;
  idSubmitNow = false;
  idWeakText = false;
  idResubmitNow = false;
  idProcessing = false;
  idVerified = false;
  idVerifiedText = false;
  // address wrap variables
  addressSingleTick = false;
  addressDoubleTick = false;
  addressWhiteTick = false;
  addressRejectedTick = false;
  addressSubmitNow = false;
  addressWeakText = false;
  addressResubmitNow = false;
  addressProcessing = false;
  addressVerified = false;
  addressVerifiedText = false;
  //     // bank wrap variables 
  bankSingleTick = false;
  bankDoubleTick = false;
  bankWhiteTick = false;
  bankRejectedTick = false;
  bankSubmitNow = false;
  bankWeakText = false;
  bankResubmitNow = false;
  bankProcessing = false;
  bankVerified = false;
  // profile function
  userProfile = false;
  docstatus: any = {};
  user = JSON.parse(localStorage.getItem("saveAllUserData"));
  token = localStorage.getItem("saveToken");
  orgsList: any;
  allOrgsrect: boolean;
  AllData: any;
  headerText: string;
  idVerify: any[];
  idVerifiedFilename: string;
  idVerifiedTime: any;
  addressVerify: any[];
  addressVerifiedFilename: string;
  addressVerifiedTime: any;
  bankVerify: any[];
  bankVerifiedFilename: string;
  bankVerifiedTime: any;
  userDOB: any;

  constructor(
    private userService: UserService,
    private orgService: OrgDetailService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("doctype component");
    if (this.defaultLangArray.indexOf(this.defaultLang) != 1) {
      this.commonService.setTranslationLanguage(this.defaultLang);
    }
    else {
      this.commonService.setTranslationLanguage('en');
    }
    this.commonService.stopLoader();
    this.getUserKycInfo();
  }
  ngAfterViewInit() {
    // console.log('after view init', this.AllData);
  }

  ngAfterViewChecked() {
    // console.log('after view init', this.AllData);
  }
  ngAfterContentChecked() {
    // console.log('after content checked', this.AllData);
  }
  ngAfterContentInit() {
    // console.log('after Content init', this.AllData);
  }

  showPro() {
    this.userProfile = !this.userProfile;
  }

  getUserKycInfo() {
    console.log("****user", this.user);
    let data = { 'mxid': this.user.mxid };
    this.userService.getUserKycInfo(data).subscribe(response => {
      console.log("user response", response);
      let data = { "mxid": this.user.mxid, "mobile": this.user.doc.mobile };
      this.orgService.orgDetail().subscribe(response => {

        console.log("orgdetail response",response);
        // setTimeout(function () {
        //   var height = document.getElementById("docTypehtml").offsetHeight;
        //   console.log("height of docTypehtml: " + height);
        //   console.log("height of body: " + document.body.offsetHeight);
        //   if (height < document.body.offsetHeight) {
        //     document.getElementById("docTypehtml").style.height = "100%";
        //   }
        //   else {
        //     document.getElementById("docTypehtml").style.height = "auto";
        //   }
        // }, 100);

        this.orgsList = response;
        this.allOrgsrect = false;

      }, error => {
        console.log(error);
        this.allOrgsrect = true;
        this.actionLoader = true;
        document.body.style.opacity = "1";
        alert("Something went wrong");

      })
      // orginvitationdetail error block finish

      this.AllData = response;
      console.log("All Data",this.AllData, '***************',response);
      // this.setFreshChatUserName(response.doc.firstname, response.doc.lastname, response.mxid);
      // sending data from webpage to extension           
      // this.sendDataToExt("webToExt", response.data);
      localStorage.setItem("saveAllUserData", JSON.stringify(response));
      this.mainWrap = false;
      if (response.doc.DOB != undefined && response.doc.DOB != "undefined" && response.doc.DOB != null && response.doc.DOB != "null" && response.doc.DOB != "") {
        this.userDOB = this.commonService.dobProFormat(response.doc.DOB);
      }
      else {
        document.body.style.opacity = "1";
        this.dobDialogBox();
      }
      if (response.doc.email == undefined || response.doc.email == null || response.doc.email == "") {
        document.body.style.opacity = "1";
        this.emailDialogBox();
      }
      // if($rootScope.statusInfo != undefined && $rootScope.statusInfo != null && $rootScope.statusInfo != "")
      // {
      //     if($rootScope.statusInfo == true)
      //     {
      //         document.body.style.opacity = "1";
      //         guidancePopUp();
      //     }
      // }
      // var url = getURL();
      this.token = localStorage.getItem("saveToken");
      let docdata = { "mxid": response.mxid };
      this.commonService.getDocStatus(docdata).
        subscribe(response => {

          console.log("dffgnhjikyhuvlvli",response);
          this.docstatus = response.docstatus;
          this.setHeaderText(response.finalstatus);
          localStorage.setItem("docstatus", JSON.stringify(response.docstatus));
          if (response.error == false || response.error == "false") {
            console.log("getdocstatus76587799", response.docstatus.id.status)
            // this code block should be removed 
            if (response.docstatus.id.status == "required") {
              this.idSubmitNow = true;
            }
            if (this.isExtAvailable == "false" && this.AllData.kycDoc.files.length < 1) {
              this.downloadExt = false;
              this.mainWrapPart = "main-wrap";
              this.actionLoader = true;
              document.body.style.opacity = "1";
              this.VideoButton = false;
              var height = document.getElementById("docTypehtml").offsetHeight;
              if (height < window.outerHeight) {
                document.getElementById("docTypehtml").style.height = "100%";
              }
              else {
                document.getElementById("docTypehtml").style.height = "auto";
              }
            }
            else {
              if (this.AllData.kycDoc.files.length > 0) {
                this.dashboardButton = false;
                this.VideoButton = true;
              }
              else {
                this.VideoButton = false;
                this.dashboardButton = true;
              }
              this.actionLoader = true;
              document.body.style.opacity = "1";
              var height = document.getElementById("docTypehtml").clientHeight;
              if (this.isExtAvailable == "false") {
                this.enableExtension = false;
              }
              this.downloadExt = true;
              this.mainWrapPart = "main-wrap-id";



              if (response.docstatus.id.status == "required" &&
                response.docstatus.address.status == "required" &&
                response.docstatus.bankstatement.status == "required") {
                console.log("if one");
                this.idWhiteTick = false;
                this.idSubmitNow = true;
                // this.idWrapOpacity = {
                //     "opacity":"1",
                //     "pointer-events":"none"
                // };
                this.addressWhiteTick = false;
                // this.addressWrapOpacity = {
                //     "opacity":"0.7",
                //     "pointer-events":"none"
                // };
                this.bankWhiteTick = false;
                // this.bankWrapOpacity = {
                //     "opacity":"0.7",
                //     "pointer-events":"none"
                // };
              }
              else
                if (response.docstatus.id.status != "required" &&
                    response.docstatus.address.status == "required" && 
                    response.docstatus.bankstatement.status == "required") {
                  console.log("if two");
                  var id = response.docstatus.id;
                  this.idNotReq(id);
                  this.addressWhiteTick = false;
                  this.addressSubmitNow = false;
                  // this.addressWrapOpacity = {
                  //     "opacity":"1",
                  //     "pointer-events":"none"
                  // };
                  this.bankWhiteTick = false;
                  // this.bankWrapOpacity = {
                  //     "opacity":"0.7",
                  //     "pointer-events":"none"
                  // };
                }
                else
                  if (response.docstatus.id.status == "required" &&
                      response.data.docstatus.address.status != "required" &&
                      response.data.docstatus.bankstatement.status == "required") {
                    console.log("if three");
                    this.idWhiteTick = false;
                    this.idSubmitNow = true;
                    // this.idWrapOpacity = {
                    //     "opacity":"1",
                    //     "pointer-events":"none"
                    // };
                    var address = response.docstatus.address;
                    // this.addNotReq(address);
                    this.bankWhiteTick = false;
                    // this.bankWrapOpacity = {
                    //     "opacity":"0.7",
                    //     "pointer-events":"none"
                    // };
                  }
                  else
                    if (response.docstatus.id.status == "required" && 
                    response.docstatus.address.status == "required" &&
                     response.docstatus.bankstatement.status != "required") {
                      console.log("if four");
                      this.idWhiteTick = false;
                      this.idSubmitNow = true;
                      // this.idWrapOpacity = {
                      //     "opacity":"1",
                      //     "pointer-events":"none"
                      // };
                      this.addressWhiteTick = false;
                      // this.addressWrapOpacity = {
                      // //     "opacity":"0.7",
                      // //     "pointer-events":"none"
                      // // };
                      let bank = response.docstatus.bankstatement;
                      this.bankNotReq(bank);
                    }
                    else
                      if (response.docstatus.id.status != "required" &&
                        response.docstatus.address.status != "required" &&
                        response.docstatus.bankstatement.status == "required") {
                        console.log("if five");
                        let id = response.docstatus.id;
                        this.idNotReq(id);
                        var address = response.data.docstatus.address;
                        this.addNotReq(address);
                        this.bankWhiteTick = false;
                        this.bankSubmitNow = false;
                        // this.bankWrapOpacity = {
                        //     "opacity":"1",
                        //     "pointer-events":"none"
                        // };
                      }
                      else
                        if (response.docstatus.id.status != "required" &&
                         response.docstatus.address.status == "required" &&
                          response.docstatus.bankstatement.status != "required"
                          ) {
                          console.log("if six");
                          let id = response.docstatus.id;
                          this.idNotReq(id);
                          this.addressWhiteTick = false;
                          this.addressSubmitNow = false;
                          // this.addressWrapOpacity = {
                          //     "opacity":"1",
                          //     "pointer-events":"none"
                          // };
                          var bank = response.docstatus.bankstatement;
                          this.bankNotReq(bank);
                        }
                        else
                          if (response.docstatus.id.status == "required" &&
                             response.data.docstatus.address.status != "required" &&
                              response.data.docstatus.bankstatement.status != "required"
                              ) {
                            console.log("if seven");
                            this.idWhiteTick = false;
                            this.idSubmitNow = true;
                            // this.idWrapOpacity = {
                            //     "opacity":"1",
                            //     "pointer-events":"none"
                            // };
                            let address = response.docstatus.address;
                            this.addNotReq(address);
                            let bank = response.docstatus.bankstatement;
                            this.bankNotReq(bank);
                          }
                          else
                            if (response.docstatus.id.status != "required" &&
                             response.docstatus.address.status != "required" &&
                              response.docstatus.bankstatement.status != "required") {
                              console.log("if eight");
                              var id = response.docstatus.id;
                              this.idNotReq(id);
                              var address = response.docstatus.address;
                              this.addNotReq(address);
                              var bank = response.docstatus.bankstatement;
                              this.bankNotReq(bank);
                            }

            }
          }
          else {
            this.actionLoader = true;
            document.body.style.opacity = "1";
            alert("Something went wrong docstatus");
          }
        }, error => {
          console.log(error);
          this.actionLoader = true;
          document.body.style.opacity = "1";

        })
      // getDoc status error block finish 



    }, error => {
      console.log(error);
      console.log(error);
      this.actionLoader = true;
      document.body.style.opacity = "1";
    }
      // getUserKycInfo error block
    )

    console.log(this.AllData, "1234567899");
  }

  setFreshChatUserName(firstname: any, lastname: any, mxid: any) {
    // throw new Error("Method not implemented.");
  }
  sendDataToExt(arg0: string, data: any) {
    // throw new Error("Method not implemented.");
  }

  getDocStatus() {

  }

  idNotReq(id: any) {
    console.log('idNot req', id);
    this.idVerify = [];
    // $scope.idWrapOpacity = {
    //     "opacity":"1"
    // };
    switch (id.status) {
      case "pending":
        this.idSingleTick = false;
        this.idProcessing = false;
        //underReviewHeaderText();
        break;
      case "verified":
        // $scope.idWrapOpacity = {
        //     "pointer-events": "auto"
        // }
        if (id.cvd == false) {
          this.idWeakText = false;
          this.idVerified = false;
          this.idDoubleTick = false;
          var filename = this.docstatus.id.name.split(".")[0];
          //console.log("filename: " + filename + ",           filename.length: " + filename.length);
          if (filename.length > 15) {
            this.idVerifiedFilename = filename.substring(0, 15) + "...";
          }
          else {
            this.idVerifiedFilename = this.docstatus.id.name.split(".")[0];
          }
          this.idVerifiedTime = this.commonService.getTimeFormat(this.docstatus.id.eptime);
          //failedHeaderText();
          break;
        }
        else {
          this.idVerifiedText = false;
          this.idVerified = false;
          this.idDoubleTick = false;
          var filename = this.docstatus.id.name.split(".")[0];
          //console.log("filename: " + filename + ",           filename.length: " + filename.length);
          if (filename.length > 15) {
            this.idVerifiedFilename = filename.substring(0, 15) + "...";
          }
          else {
            this.idVerifiedFilename = this.docstatus.id.name.split(".")[0];
          }
          this.idVerifiedTime = this.commonService.getTimeFormat(this.docstatus.id.eptime);
          //underReviewHeaderText();
          break;
        }
      case "rejected":
        this.idRejectedTick = false;
        this.idResubmitNow = false;
        break;
      default:
        this.idSingleTick = false;
        this.idProcessing = false;
        //underReviewHeaderText();
        break;
    }
  }

  addNotReq(address: any) {

            this.addressVerify = [];
            // this.addressWrapOpacity = {
            //     "opacity":"1"
            // };
            switch(address.status)
            {
                case "pending":
                    console.log("addNotReq switch case one");
                    this.addressSingleTick = false;
                    this.addressProcessing = false;
                    //underReviewHeaderText();
                    break;
                case "verified":
                    // this.addressWrapOpacity = {
                    //     "pointer-events": "auto"
                    // }
                    if(address.cvd == false)
                    {
                        this.addressWeakText = false;
                        this.addressVerified = false;
                        this.addressDoubleTick = false;
                        var filename = this.docstatus.address.name.split(".")[0];
                        if(filename.length > 15)
                        {
                            this.addressVerifiedFilename = filename.substring(0,15) + "...";    
                        }
                        else
                        {
                            this.addressVerifiedFilename = this.docstatus.address.name.split(".")[0];
                        }
                        this.addressVerifiedTime = this.commonService.getTimeFormat(this.docstatus.address.eptime);
                        //failedHeaderText();
                        break;
                    }
                    else
                    {
                        this.addressDoubleTick = false;
                        this.addressVerified = false;
                        this.addressVerifiedText = false;
                        var filename = this.docstatus.address.name.split(".")[0];
                        if(filename.length > 15)
                        {
                            this.addressVerifiedFilename = filename.substring(0,15) + "...";    
                        }
                        else
                        {
                            this.addressVerifiedFilename = this.docstatus.address.name.split(".")[0];
                        }
                        this.addressVerifiedTime = this.commonService.getTimeFormat(this.docstatus.address.eptime);
                        console.log("addNotReq switch case two else");
                        break;
                    }
                case "rejected":
                    this.addressRejectedTick = false;
                    this.addressResubmitNow = false;
                    console.log("addNotReq switch case three");
                    break;
                default:
                    this.addressSingleTick = false;
                    this.addressProcessing = false;
                    console.log("addNotReq switch case four");
                    // underReviewHeaderText();
                    break;
            }
  }

  bankNotReq(bank: any) {

            this.bankVerify = [];
            // this.bankWrapOpacity = {
            //     "opacity":"1"
            // };
            if(bank.cvd == false || bank.cvd == "false")
            {
                switch(bank.status)
                {
                    case "pending":
                        this.bankWeakText = false;
                        this.bankProcessing = false;
                        // underReviewHeaderText();
                        break;
                    case "verified":
                        // this.bankWrapOpacity = {
                        //     "pointer-events": "auto"
                        // }
                        this.bankWeakText = false;
                        this.bankVerified = false;
                        var filename = this.docstatus.bankstatement.name.split(".")[0];
                        if(filename.length > 15)
                        {
                            this.bankVerifiedFilename = filename.substring(0,15) + "...";    
                        }
                        else
                        {
                            this.bankVerifiedFilename = this.docstatus.bankstatement.name.split(".")[0];
                        }
                        this.bankVerifiedTime = this.commonService.getTimeFormat(this.docstatus.bankstatement.eptime);
                        break;
                    case "rejected":
                        this.bankWeakText = false;
                        this.bankResubmitNow = false;
                        // failedHeaderText();
                        break;
                    default:
                        this.bankWeakText = false;
                        this.bankProcessing = false;
                        // underReviewHeaderText();
                        break;
                }
            }
            else
            {
                switch(bank.status)
                {
                    case "pending":
                        this.bankSingleTick = false;
                        this.bankProcessing = false;
                        break;
                    case "verified":
                        // this.bankWrapOpacity = {
                        //     "pointer-events": "auto"
                        // }
                        this.bankDoubleTick = false;
                        this.bankVerified = false;
                        this.bankVerifiedFilename = this.docstatus.bankstatement.name.split(".")[0];
                        this.bankVerifiedTime = this.commonService.getTimeFormat(this.docstatus.bankstatement.eptime);
                        break;
                    case "rejected":
                        this.bankRejectedTick = false;
                        this.bankResubmitNow = false;
                        break;
                    default:
                        this.bankSingleTick = false;
                        this.bankProcessing = false;
                        break;
                }
            }
  }

  setHeaderText(statusCode: any) {
    switch(statusCode)
    {
        case 0:
           this.welcomeHeaderText();
           break;
        case 1:
            this.failedHeaderText();
            break;
        case 2:
            this.underReviewHeaderText();
            break;
        case 3:
            this.pendingHeaderText();
            console.log("setHeaderText pending");
            break;
        case 4: 
            this.verifiedRiskBasedHeaderText();
            break;
        case 5:
            this.verifiedHeaderText();
            break; 
        default:
           this.welcomeHeaderText();
           break; 
    }
  }
  welcomeHeaderText() {
    switch (this.defaultLang) {
      case 'en':
        this.headerText = "Welcome " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Please verify your self using online documents";
        break;
      case 'ru':
        this.headerText = "желанный " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Убедитесь, что вы сами используете онлайн-документы";
        break;
      case 'fr':
        this.headerText = "Bienvenue " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "S'il vous plaît vérifier vous-même en utilisant des documents en ligne";
        break;
      case 'de':
        this.headerText = "Herzlich willkommen " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Bitte bestätigen Sie Ihre Identität anhand von Online-Dokumenten";
        break;
      case 'ar':
        this.headerText = + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + " أهلا بك!";
        this.atleastWarning = "يرجى التحقق من نفسك باستخدام المستندات عبر الإنترنت";
        break;
      case 'zh-CN':
        this.headerText = "欢迎 " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "请使用在线文档验证您的自我";
        break;
      case 'nl':
        this.headerText = "Welkom " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Verifieer uzelf door online documenten te gebruiken";
        break;
      case 'pt':
        this.headerText = "Bem vinda " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Por favor, verifique a sua auto usando documentos on-line";
        break;
      case 'es':
        this.headerText = "Bienvenido " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Por favor, verifíquese usando documentos en línea";
        break;
      case 'vi':
        this.headerText = "Chào mừng " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Vui lòng xác minh bản thân của bạn bằng tài liệu trực tuyến";
        break;
      case 'ja':
        this.headerText = "ようこそ " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "オンライン文書を使用してあなた自身を確認してください";
        break;
      default:
        this.headerText = "Welcome " + this.AllData.doc.firstname + " " + this.AllData.doc.lastname + "!";
        this.atleastWarning = "Please verify your self using online documents";
        break;
    }
  }

  verifiedRiskBasedHeaderText() {
    switch (this.defaultLang) {
      case 'en':
        this.headerText = "Identity verification: Success(Risk Based)";
        this.atleastWarning = "Please submit online documents";
        break;
      case 'ru':
        this.headerText = "Проверка подлинности: успех (с учетом рисков)";
        this.atleastWarning = "Пожалуйста, отправьте онлайн-документы";
        break;
      case 'fr':
        this.headerText = "Vérification d'identité: succès (basé sur les risques)";
        this.atleastWarning = "S'il vous plaît soumettre des documents en ligne";
        break;
      case 'de':
        this.headerText = "Identitätsprüfung: Erfolg (Risk Based)";
        this.atleastWarning = "Bitte reichen Sie Online-Dokumente ein";
        break;
      case 'ar':
        this.headerText = "التحقق من الهوية: النجاح (قائم على المخاطرة)";
        this.atleastWarning = "يرجى تقديم الوثائق عبر الإنترنت";
        break;
      case 'zh-CN':
        this.headerText = "身份验证：成功（基于风险）";
        this.atleastWarning = "请提交在线文件";
        break;
      case 'nl':
        this.headerText = "Identiteitsverificatie: succes (op risico gebaseerd)";
        this.atleastWarning = "Gelieve online documenten in te dienen";
        break;
      case 'pt':
        this.headerText = "Verificação de identidade: sucesso (com base em risco)";
        this.atleastWarning = "Por favor submeta documentos onlines";
        break;
      case 'es':
        this.headerText = "Verificación de identidad: éxito (basado en riesgo)";
        this.atleastWarning = "Por favor envíe documentos en línea";
        break;
      case 'vi':
        this.headerText = "Xác minh danh tính: Thành công (Dựa trên rủi ro)";
        this.atleastWarning = "Vui lòng gửi tài liệu trực tuyến";
        break;
      case 'ja':
        this.headerText = "本人確認：成功（リスクベース）";
        this.atleastWarning = "オンライン文書を提出してください";
        break;
      default:
        this.headerText = "Identity verification: Success(Risk Based)";
        this.atleastWarning = "Please submit online documents";
        break;
    }
  }
  verifiedHeaderText() {
    switch (this.defaultLang) {
      case 'en':
        this.headerText = "Identity verification: Success";
        this.atleastWarning = "Your documents has been verified";
        break;
      case 'ru':
        this.headerText = "Проверка подлинности: успех";
        this.atleastWarning = "Ваши документы были подтверждены";
        break;
      case 'fr':
        this.headerText = "Vérification d'identité: succès";
        this.atleastWarning = "Vos documents ont été vérifiés";
        break;
      case 'de':
        this.headerText = "Identitätsprüfung: Erfolg";
        this.atleastWarning = "Ihre Dokumente wurden überprüft";
        break;
      case 'ar':
        this.headerText = "التحقق من الهوية: النجاح";
        this.atleastWarning = "تم التحقق من مستنداتك";
        break;
      case 'zh-CN':
        this.headerText = "身份验证：成功";
        this.atleastWarning = "您的文件已经过验证";
        break;
      case 'nl':
        this.headerText = "Identiteitsverificatie: succes";
        this.atleastWarning = "Uw documenten zijn geverifieerd";
        break;
      case 'pt':
        this.headerText = "Verificação de identidade: sucesso";
        this.atleastWarning = "Seus documentos foram verificados";
        break;
      case 'es':
        this.headerText = "Verificación de identidad: éxito";
        this.atleastWarning = "Sus documentos han sido verificados";
        break;
      case 'vi':
        this.headerText = "Xác minh danh tính: Thành công";
        this.atleastWarning = "Tài liệu của bạn đã được xác minh";
        break;
      case 'ja':
        this.headerText = "本人確認：成功";
        this.atleastWarning = "あなたの文書は確認済みです";
        break;
      default:
        this.headerText = "Identity verification: Success";
        this.atleastWarning = "Your documents has been verified";
        break;
    }
  }
  pendingHeaderText() {
    switch (this.defaultLang) {
      case 'en':
        this.headerText = "Identity verification: Pending";
        this.atleastWarning = "Please submit online documents";
        break;
      case 'ru':
        this.headerText = "Проверка подлинности: ожидается";
        this.atleastWarning = "Пожалуйста, отправьте онлайн-документы";
        break;
      case 'fr':
        this.headerText = "Vérification d'identité: en attente";
        this.atleastWarning = "S'il vous plaît soumettre des documents en ligne";
        break;
      case 'de':
        this.headerText = "Identitätsprüfung: Ausstehend";
        this.atleastWarning = "Bitte reichen Sie Online-Dokumente ein";
        break;
      case 'ar':
        this.headerText = "التحقق من الهوية: معلق";
        this.atleastWarning = "يرجى تقديم الوثائق عبر الإنترنت";
        break;
      case 'zh-CN':
        this.headerText = "身份验证：待定";
        this.atleastWarning = "请提交在线文件";
        break;
      case 'nl':
        this.headerText = "Identiteitsverificatie: in behandeling";
        this.atleastWarning = "Gelieve online documenten in te dienen";
        break;
      case 'pt':
        this.headerText = "Verificação de identidade: pendente";
        this.atleastWarning = "Por favor submeta documentos onlines";
        break;
      case 'es':
        this.headerText = "Verificación de identidad: pendiente";
        this.atleastWarning = "Por favor envíe documentos en línea";
        break;
      case 'vi':
        this.headerText = "Xác minh danh tính: Đang chờ xử lý";
        this.atleastWarning = "Vui lòng gửi tài liệu trực tuyến";
        break;
      case 'ja':
        this.headerText = "本人確認：保留中";
        this.atleastWarning = "オンライン文書を提出してください";
        break;
      default:
        this.headerText = "Identity verification: Pending";
        this.atleastWarning = "Please submit online documents";
        console.log("pendingHeaderText function");
        break;
    }
  }
  underReviewHeaderText() {
    switch (this.defaultLang) {
      case 'en':
        this.headerText = "Identity verification: Under review";
        this.atleastWarning = "Please submit online documents";
        break;
      case 'ru':
        this.headerText = "Проверка подлинности: на рассмотрении";
        this.atleastWarning = "Пожалуйста, отправьте онлайн-документы";
        break;
      case 'fr':
        this.headerText = "Vérification d'identité: en cours d'examen";
        this.atleastWarning = "S'il vous plaît soumettre des documents en ligne";
        break;
      case 'de':
        this.headerText = "Identitätsprüfung: Wird überprüft";
        this.atleastWarning = "Bitte reichen Sie Online-Dokumente ein";
        break;
      case 'ar':
        this.headerText = "التحقق من الهوية: قيد المراجعة";
        this.atleastWarning = "يرجى تقديم الوثائق عبر الإنترنت";
        break;
      case 'zh-CN':
        this.headerText = "身份验证：正在审核中";
        this.atleastWarning = "请提交在线文件";
        break;
      case 'nl':
        this.headerText = "Identiteitsverificatie: wordt beoordeeld";
        this.atleastWarning = "Gelieve online documenten in te dienen";
        break;
      case 'pt':
        this.headerText = "Verificação de identidade: em revisão";
        this.atleastWarning = "Por favor submeta documentos onlines";
        break;
      case 'es':
        this.headerText = "Verificación de identidad: En revisión";
        this.atleastWarning = "Por favor envíe documentos en línea";
        break;
      case 'vi':
        this.headerText = "Xác minh danh tính: Đang xem xét";
        this.atleastWarning = "Vui lòng gửi tài liệu trực tuyến";
        break;
      case 'en':
        this.headerText = "本人確認：審査中";
        this.atleastWarning = "オンライン文書を提出してください";
        break;
      default:
        this.headerText = "Identity verification: Under review";
        this.atleastWarning = "Please submit online documents";
        break;
    }
  }
  failedHeaderText() {
    switch (this.defaultLang) {
      case 'en':
        this.headerText = "Identity verification: Retry";
        this.atleastWarning = "Please submit online documents";
        break;
      case 'ru':
        this.headerText = "Проверка подлинности: повторите попытку";
        this.atleastWarning = "Пожалуйста, отправьте онлайн-документы";
        break;
      case 'fr':
        this.headerText = "Vérification d'identité: Réessayer";
        this.atleastWarning = "S'il vous plaît soumettre des documents en ligne";
        break;
      case 'de':
        this.headerText = "Identitätsprüfung: Versuchen Sie es erneut";
        this.atleastWarning = "Bitte reichen Sie Online-Dokumente ein";
        break;
      case 'ar':
        this.headerText = "التحقق من الهوية: إعادة المحاولة";
        this.atleastWarning = "Bitte reichen Sie Online-Dokumente ein";
        break;
      case 'zh-CN':
        this.headerText = "身份验证：重试";
        this.atleastWarning = "请提交在线文件";
        break;
      case 'nl':
        this.headerText = "Identiteitsverificatie: opnieuw proberen";
        this.atleastWarning = "Bitte reichen Sie Online-Dokumente ein";
        break;
      case 'pt':
        this.headerText = "Verificação de identidade: tente novamente";
        this.atleastWarning = "Por favor submeta documentos onlines";
        break;
      case 'es':
        this.headerText = "Verificación de identidad: vuelva a intentar";
        this.atleastWarning = "Por favor envíe documentos en línea";
        break;
      case 'vi':
        this.headerText = "Xác minh danh tính: Thử lại";
        this.atleastWarning = "Vui lòng gửi tài liệu trực tuyến";
        break;
      case 'ja':
        this.headerText = "本人確認：再試行";
        this.atleastWarning = "オンライン文書を提出してください";
        break;
      default:
        this.headerText = "Identity verification: Retry";
        this.atleastWarning = "Please submit online documents";
        break;
    }
  }

  addExt = function () {
    window.open("https://addons.mozilla.org/en-US/firefox/addon/diro-kyc/")
  }
  viewDashBoard = function () {
    // $location.path('/dashboard');
  }


  goIdLinks() {
    // if($scope.isExtAvailable == "true" || $scope.isExtAvailable == true)
    // {
    //     //localStorage.setItem("documentredirected","ID");
    //     $location.path('/docLinks/ID');
    // }
    // else
    // {
    //     $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     template:
    //         '<md-dialog class="url-dialog-box"><md-dialog-content layout="column"><div layout="row" layout-align="center"><img src="icons/warning.svg" class="warning-icon"></div><div style="margin-top: 24px;">{{"docType_page.install_dialog_text" | translate}}</div><div layout="row" layout-align="end"><a href="https://addons.mozilla.org/en-US/firefox/addon/diro-kyc/" target="_blank">{{"Common_all_page.proceed" | translate}}</a></div></md-dialog-content></md-dialog>',
    //     locals: {

    //     },
    //     controller: linkController
    //     });

    //     function linkController($scope, $mdDialog, $location,$translate) {
    //         $scope.defaultLang = window.navigator.language || window.navigator.userLanguage; 
    //         if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
    //         {
    //             $translate.use($scope.defaultLang);
    //         }
    //         else
    //         {
    //             $translate.use('en');
    //         }
    //         $scope.cancelDialog = function()
    //         {
    //           $mdDialog.hide();
    //         }
    //     };
    // }
  }
  goAddressLinks() {
    // if($scope.isExtAvailable == "true" || $scope.isExtAvailable == true)
    // {
    //     //localStorage.setItem("documentredirected","Address");
    //     $location.path('/docLinks/Address');
    // }
    // else
    // {
    //     $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     template:
    //         '<md-dialog class="url-dialog-box"><md-dialog-content layout="column"><div layout="row" layout-align="center"><img src="icons/warning.svg" class="warning-icon"></div><div style="margin-top: 24px;">{{"docType_page.install_dialog_text" | translate}}</div><div layout="row" layout-align="end"><a href="https://addons.mozilla.org/en-US/firefox/addon/diro-kyc/" target="_blank">{{"Common_all_page.proceed" | translate}}</a></div></md-dialog-content></md-dialog>',
    //     locals: {

    //     },
    //     controller: linkController
    //     });

    //     function linkController($scope, $mdDialog, $location,$translate) {
    //         $scope.defaultLang = window.navigator.language || window.navigator.userLanguage; 
    //         if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
    //         {
    //             $translate.use($scope.defaultLang);
    //         }
    //         else
    //         {
    //             $translate.use('en');
    //         }
    //         $scope.cancelDialog = function()
    //         {
    //           $mdDialog.hide();
    //         }
    //   };
    // }
  }

  goBankLinks = function () {
    // if($scope.isExtAvailable == "true" || $scope.isExtAvailable == true)
    // {     
    //     //localStorage.setItem("documentredirected","Bank");
    //     $location.path('/docLinks/Bank');
    // }
    // else
    // {
    //     $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     template:
    //         '<md-dialog class="url-dialog-box"><md-dialog-content layout="column"><div layout="row" layout-align="center"><img src="icons/warning.svg" class="warning-icon"></div><div style="margin-top: 24px;">{{"docType_page.install_dialog_text" | translate}}</div><div layout="row" layout-align="end"><a href="https://addons.mozilla.org/en-US/firefox/addon/diro-kyc/" target="_blank">{{"Common_all_page.proceed" | translate}}</a></div></md-dialog-content></md-dialog>',
    //     locals: {

    //     },
    //     controller: linkController
    //     });

    //     function linkController($scope, $mdDialog, $location,$translate) {
    //         $scope.defaultLang = window.navigator.language || window.navigator.userLanguage; 
    //         if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
    //         {
    //             $translate.use($scope.defaultLang);
    //         }
    //         else
    //         {
    //             $translate.use('en');
    //         }
    //         $scope.cancelDialog = function()
    //         {
    //           $mdDialog.hide();
    //         }
    //     };
    // }
  }
  loadAppStore() {
    window.open("https://itunes.apple.com/in/app/diro-identity/id1408537104?mt=8");
  }
  loadPlayStore() {
    window.open("https://play.google.com/store/apps/details?id=com.diro.kyc");
  }
  gotomenu() {
    //  $location.path('/mobilemenu'); 
  }
  showVideo() {
    this.router.navigate(['/cvdInfo']);
  }
  // code for consent management
  getRequestTime(epoc) {
    // var time = getPrettyTiming(epoc);
    // return time;
  }


  acceptOrgReq(orgData, index) {
    // console.log(orgData);
    // $scope.actionLoader = false;
    // document.body.style.opacity = "0.5";
    // var user = JSON.parse(localStorage.getItem("saveAllUserData"));
    // var token = localStorage.getItem("saveToken");
    // var json = {"mxid":user.data.mxid,"status":true,"apikey":orgData.apikey,"orgid":orgData.orgid,"token":token};
    // var url = getURL();
    // $http({
    //     method: "POST",
    //     url: url.orgverifiedinvite,
    //     data: json,
    //     headers: {
    //         "Authorization": token
    //     }
    // }).then(function(response){
    //     console.log(response);
    //     if(response.data.message == "successful")
    //     {
    //         $scope.orgsList.pendingrequest.splice(index,1);
    //         var json = orgData;
    //         json.status = true;
    //         json.eptime = new Date().getTime();
    //         if($scope.orgsList.allorgdetail != undefined)
    //         {
    //             $scope.orgsList.allorgdetail.unshift(json);
    //         }
    //         else
    //         {
    //             $scope.orgsList.allorgdetail = [];
    //             $scope.orgsList.allorgdetail.push(json);
    //         }
    //         $scope.actionLoader = true;
    //         document.body.style.opacity = "1";  
    //         window.location.href = orgData.boardurl;
    //     }
    //     else
    //     {
    //         $scope.actionLoader = true;
    //         document.body.style.opacity = "1";
    //         alert("Something went wrong");
    //     }
    // },function(err){
    //     console.log(err);
    //     $scope.actionLoader = true;
    //     document.body.style.opacity = "1";
    //     alert("Something went wrong");
    // })
  }

  rejectOrgReq(orgData, index) {
    // $scope.actionLoader = false;
    // document.body.style.opacity = "0.5";
    // var user = JSON.parse(localStorage.getItem("saveAllUserData"));
    // var token = localStorage.getItem("saveToken");
    // var json = {"mxid":user.data.mxid,"status":false,"apikey":orgData.apikey,"orgid":orgData.orgid,"token":token};
    // var url = getURL();
    // $http({
    //     method: "POST",
    //     url: url.orgverifiedinvite,
    //     data: json,
    //     headers: {
    //         "Authorization": token
    //     }
    // }).then(function(response){
    //     console.log(response);
    //     if(response.data.message == "successful")
    //     {
    //         $scope.orgsList.pendingrequest.splice(index,1);
    //         var json = orgData;
    //         json.status = false;
    //         json.eptime = new Date().getTime();
    //         if($scope.orgsList.allorgdetail != undefined)
    //         {
    //             $scope.orgsList.allorgdetail.unshift(json);
    //         }
    //         else
    //         {
    //             $scope.orgsList.allorgdetail = [];
    //             $scope.orgsList.allorgdetail.push(json);
    //         }
    //         $scope.actionLoader = true;
    //         document.body.style.opacity = "1";
    //     }
    //     else
    //     {
    //         $scope.actionLoader = true;
    //         document.body.style.opacity = "1";
    //         alert("Something went wrong");
    //     }
    // },function(err){
    //     console.log(err);
    //     $scope.actionLoader = true;
    //     document.body.style.opacity = "1";
    //     alert("Something went wrong");
    // })
  }


  changeSwitchStatus(orgData, status, index) {
    // console.log(orgData);
    // $scope.actionLoader = false;
    // document.body.style.opacity = "0.5";
    // var user = JSON.parse(localStorage.getItem("saveAllUserData"));
    // var token = localStorage.getItem("saveToken");
    // var url = getURL();
    // $http({
    //     method: "POST",
    //     url: url.orgswitchstatus,
    //     data: {"mxid":user.data.mxid,"orgid":orgData.orgid,"status":status,"token":token},
    //     headers: {
    //         "Authorization": token
    //     }
    // }).then(function(response){
    //     console.log(response);
    //     if(response.data.message == "successful")
    //     {
    //         $scope.actionLoader = true;
    //         document.body.style.opacity = "1";
    //         if(status == true)
    //         {
    //             window.location.href = orgData.boardurl;
    //         }
    //     }
    //     else
    //     {
    //         if(status == true)
    //         {
    //             $scope.orgsList.allorgdetail[index].status = false;
    //             $scope.actionLoader = true;
    //             document.body.style.opacity = "1";
    //             alert("Something went wrong");
    //         }
    //         else
    //         if(status == false)
    //         {
    //             $scope.orgsList.allorgdetail[index].status = true;
    //             $scope.actionLoader = true;
    //             document.body.style.opacity = "1";
    //             alert("Something went wrong");
    //         }
    //     }
    // },function(err){
    //     console.log(err);
    //     $scope.actionLoader = true;
    //     document.body.style.opacity = "1";
    //     alert("Something went wrong");
    // })
  }


  dobDialogBox() {
    // $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     templateUrl:"partials/dialogs/dob_dialog.html",
    //     locals: {

    //     },
    //     controller: dobController
    //     });

    //     function dobController($scope, $mdDialog, $location,$translate) {
    //         $scope.defaultLang = window.navigator.language || window.navigator.userLanguage; 
    //         if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
    //         {
    //             $translate.use($scope.defaultLang);
    //         }
    //         else
    //         {
    //             $translate.use('en');
    //         }
    //         $scope.enableProceed = function(dob)
    //         {
    //             if(dob != undefined && dob != null && dob != "")
    //             {
    //                 $scope.proceedButton = {
    //                     "pointer-events":"auto",
    //                     "background-color":"#fdb828"
    //                 }
    //             }
    //             else
    //             {
    //                 $scope.proceedButton = {
    //                     "pointer-events":"none",
    //                     "background-color":"rgba(0, 0, 0, 0.38)"
    //                 }
    //             }
    //         }
    //         $scope.updatedob = function(dob)
    //         {
    //             //document.body.style.opacity = "0.5";
    //             var date = dateInFormat(dob);
    //             var json = {"dob":date};
    //             var userData = JSON.parse(localStorage.getItem("saveAllUserData"));
    //             json.mobile = userData.data.doc.mobile;
    //             json.mcc = userData.data.doc.mcc;
    //             json.email = userData.data.doc.email;
    //             json.firstname = userData.data.doc.firstname;
    //             json.nationality = localStorage.getItem("userNationality");
    //             var url = getURL();
    //             json.kycdv = {"carrierName":"NA","deviceToken":"NA","installVersion":url.build_version,"modelNumber":"NA", "udid": "NA"};
    //             if(window.ui.os)
    //             {
    //                 json.kycdv.os = window.ui.os;
    //             }
    //             else
    //             {
    //                 json.kycdv.os = "NA";
    //             }
    //             if(window.ui.platform)
    //             {
    //                 json.kycdv.platform = window.ui.platform;
    //             }
    //             else
    //             {
    //                 json.kycdv.platform = "NA";
    //             }
    //             if(window.ui.osversion)
    //             {
    //                 json.kycdv.systemVersion = window.ui.osversion;
    //             }
    //             else
    //             {
    //                 json.kycdv.systemVersion = "NA";
    //             }
    //             $http({
    //                 method: "POST",
    //                 url: url.updateuserprofileinfo,
    //                 data: json,
    //             }).then(function(response){
    //                 console.log(response);
    //                 document.body.style.opacity = "1";
    //                 $rootScope.userDOB = dobProFormat(date);
    //                 $mdDialog.hide();
    //             },function(error){
    //                 console.log(error);
    //                 document.body.style.opacity = "1";
    //                 $mdDialog.hide();
    //             });
    //         }
    //         $scope.cancelDialog = function()
    //         {
    //           $mdDialog.hide();
    //         }
    //     };
  }

  //     // function for email dialog box
  emailDialogBox() {
    // $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     templateUrl: "partials/dialogs/email_dialog.html",
    //     locals: {

    //     },
    //     controller: emailController
    //     });

    //     function emailController($scope, $mdDialog, $location,$translate) {
    //         $scope.defaultLang = window.navigator.language || window.navigator.userLanguage; 
    //         if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
    //         {
    //             $translate.use($scope.defaultLang);
    //         }
    //         else
    //         {
    //             $translate.use('en');
    //         }
    //         $scope.enableProceed = function(email)
    //         {
    //             if(email != undefined && email != null && email != "")
    //             {
    //                 $scope.proceedButton = {
    //                     "pointer-events":"auto",
    //                     "background-color":"#fdb828"
    //                 }
    //             }
    //             else
    //             {
    //                 $scope.proceedButton = {
    //                     "pointer-events":"none",
    //                     "background-color":"rgba(0, 0, 0, 0.38)"
    //                 }
    //             }
    //         }
    //         $scope.updateEmail = function(email)
    //         {
    //             document.body.style.opacity = "0.5";
    //             var json = {"email":email};
    //             var userData = JSON.parse(localStorage.getItem("saveAllUserData"));
    //             json.mobile = userData.data.doc.mobile;
    //             json.mcc = userData.data.doc.mcc;
    //             json.dob = userData.data.doc.DOB;
    //             json.firstname = userData.data.doc.firstname;
    //             json.nationality = localStorage.getItem("userNationality");
    //             var url = getURL();
    //             json.kycdv = {"carrierName":"NA","deviceToken":"NA","installVersion":url.build_version,"modelNumber":"NA", "udid": "NA"};
    //             if(window.ui.os)
    //             {
    //                 json.kycdv.os = window.ui.os;
    //             }
    //             else
    //             {
    //                 json.kycdv.os = "NA";
    //             }
    //             if(window.ui.platform)
    //             {
    //                 json.kycdv.platform = window.ui.platform;
    //             }
    //             else
    //             {
    //                 json.kycdv.platform = "NA";
    //             }
    //             if(window.ui.osversion)
    //             {
    //                 json.kycdv.systemVersion = window.ui.osversion;
    //             }
    //             else
    //             {
    //                 json.kycdv.systemVersion = "NA";
    //             }
    //             $http({
    //                 method: "POST",
    //                 url: url.updateuserprofileinfo,
    //                 data: json,
    //             }).then(function(response){
    //                 console.log(response);
    //                 document.body.style.opacity = "1";
    //                 $mdDialog.hide();
    //             },function(error){
    //                 console.log(error);
    //                 document.body.style.opacity = "1";
    //                 $mdDialog.hide();
    //             });
    //         }
    //         $scope.cancelDialog = function()
    //         {
    //           $mdDialog.hide();
    //         }
    //     };
  }


  guidancePopUp() {
    // $mdDialog.show({
    //     parent: angular.element(document.body),
    //     clickOutsideToClose:true,
    //     templateUrl:"partials/dialogs/guidance_popup.html",
    //     locals: {

    //     },
    //     controller: guidanceController
    //     });

    //     function guidanceController($scope, $mdDialog, $location,$translate) {
    //         $scope.defaultLang = window.navigator.language || window.navigator.userLanguage; 
    //         if($scope.defaultLang == "en" || $scope.defaultLang == "ru" || $scope.defaultLang == "fr" || $scope.defaultLang == "de" || $scope.defaultLang == "ar" || $scope.defaultLang == "zh-CN" || $scope.defaultLang == "nl" || $scope.defaultLang == "pt" || $scope.defaultLang == "es" || $scope.defaultLang == "vi" || $scope.defaultLang == "ja")
    //         {
    //             $translate.use($scope.defaultLang);
    //         }
    //         else
    //         {
    //             $translate.use('en');
    //         }
    //         $scope.cancelDialog = function()
    //         {
    //           $rootScope.statusInfo = false;
    //           $mdDialog.hide();
    //         }
    //     };
  }

}
