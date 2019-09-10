import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDataService } from './country-data.service';
import { environment } from '../../environments/environment'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private countryService: CountryDataService,
    private loader: NgxUiLoaderService,
    private translate: TranslateService
    
  ) { }

  startLoader() {
    this.loader.start();
  }

  stopLoader() {
    this.loader.stop();
  }

  setTranslationLanguage(locale: string) {
    this.translate.setDefaultLang('en');
    this.translate.use(locale);
  }
 
  getDocStatus(docData: any) {

    // method: "POST",
    // url: url.getdocstatus,
    // data: {"mxid":response.data.mxid},
    // headers:{
    //     'Authorization': $scope.token
    // }
    let user = JSON.parse(localStorage.getItem("saveAllUserData"));
    const token = localStorage.getItem("saveToken");
    let data = { "mxid": user.mxid, "mobile": user.doc.mobile };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<any>(environment.getdocstatus, data, httpOptions);
  }


  getPrettyTiming(epoc:any)
  {
  	let date = new Date();
  	let d = date.getTime();
  	let diff:any = d - epoc;
  	console.log("diff: " + diff);
  	switch(true)
  	{
  		case(0 <= diff && diff < 60000):
  			diff = diff/1000;
  			diff = diff.toFixed(0);
  			return diff + " sec ago";
  			break;
  		case(60000 <= diff && diff < 60000*60):
  			var minD = 60000;
  			diff = diff/minD;
  			diff = diff.toFixed(0);
  			return diff + " min ago";
  			break;
  		case(60000*60 <= diff && diff < 60000*60*12):
  			var hrd = 60000*60;
  			diff = diff/hrd;
  			diff = diff.toFixed(0);
  			return diff + " Hours ago";
  			break;
  		case(60000*60*12 <= diff && diff < 60000*60*24):
  			return "Today";
  			break;
  		case(60000*60*24 <= diff && diff < 60000*60*24*2):
  			return "Yesterday";
  			break;
  		case(60000*60*24*2 <= diff && diff < 60000*60*24*7):
  			var dayd = 60000*60*24;
  			diff = diff/dayd;
  			diff = diff.toFixed(0);
  			return diff + " Days ago";
  			break;
  		case(60000*60*24*7 <= diff && diff < 60000*60*24*7*4):
  			var weekd = 60000*60*24*7;
  			diff = diff/weekd;
  			diff = diff.toFixed(0);
  			return diff + " Weeks ago";
  			break;
  		case(60000*60*24*7*4 <= diff && diff < 60000*60*24*7*4*3):
  			var mond = 60000*60*24*7*4;
  			diff = diff/mond;
  			diff = diff.toFixed(0);
  			return diff + " Months ago";
  			break;
  		default:
  			if(typeof(epoc) == "string")
  			{
  				epoc = parseInt(epoc);
  			}
  			var fileDate = new Date(epoc); 
  			var fileD = fileDate.getDate();
  			var monArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  			var fileM = fileDate.getMonth();
  			var fileY = fileDate.getFullYear();
  			return monArray[fileM] + " " + fileD + ", " + fileY;
  	}
  }
  getCreateWalletTime(epoc: any) {
    var d = new Date(+epoc);
    var n = d.toString();
    var splitDate = n.split(" ");
    return splitDate[1] + " " + splitDate[2] + " " + splitDate[3] + " " + "@" + " " + splitDate[4];
  }

  convertBase64toBlob(base64: any, contentType: any) {
    var byteCharacters = atob(base64);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: contentType });
    return blob;
  }
  dateInFormat(dateEntered: any){
  	var dateArray = dateEntered.toString().split(" "); 
  	console.log("length of dateArray: " + dateArray.length);
  	if(dateArray.length < 2)
  	{
  		return dateEntered;
  	}
  	else
  	{
  		let monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; 
  		let month:any = monthArray.indexOf(dateArray[1]);
  		 if(month < 9) { 
  		  var m = month + 1; month = "0" + m.toString(); 
  		} 
  		else
  		{
  			month = month + 1;
  		}
  		var dob = dateArray[3] + "-" + month + "-" + dateArray[2];
  		return dob;
  	}
  }
  dobProFormat(dob) {
    var split = dob.split("-");
    var month;
    console.log("split[1]: " + typeof (split[1]));
    switch (split[1]) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
    }
    return month + " " + split[2] + ", " + split[0];
  }
  detectExtension(extensionId: any, callback: any) {
    var img;
    var result;
    img = new Image();
    img.src = "chrome-extension://" + extensionId + "/icons/ic-download.svg";
    img.onload = function () {
      result = "true";
      callback(result);
    };
    img.onerror = function () {
      result = "false";
      callback(result);
    };
  }
  detectFirefoxExtension(extID: any, callback: any) {
    var img;
    var result;
    img = new Image();
    img.src = "moz-extension://" + extID + "/icons/ic-download.svg";
    img.onload = function () {
      result = "true";
      callback(result);
    };
    img.onerror = function () {
      result = "false";
      callback(result);
    };
  }

  getTimeFormat(eptime: any) {
    console.log("eptime: " + eptime);
    if (typeof (eptime) == "string") {
      eptime = parseInt(eptime);
    }
    var epoc = new Date(eptime);
    console.log("epoc: " + epoc);
    var monArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var fileD = epoc.getDate();
    var fileM = epoc.getMonth();
    var fileY = epoc.getFullYear();
    return fileD + " " + monArray[fileM] + " " + fileY;
  }
  // function sendDataToExt(message,data)
  // {
  // 	var isChrome = !!window.chrome && !!window.chrome.webstore;
  // 	if(isChrome==false)
  //     {
  //         console.log("isChrome false");
  //         window.postMessage({
  //             direction: data,
  //             message: message
  //         }, "*");
  //     } 
  //     else
  //     {
  //         console.log("isChrome true");
  //         var ids = ["kbmhlnkfmpdpgeohnkpooalkebgkfjgg","hieikkelfcfafkommbghfbkjndekappp","bjgaldbifgggilbplhngodpmpimpiamo","kkajlkjbkjjgkggngpeilnadiiphkdga","joofemlmoddilkbnmlppbmekhaelmgbi"];
  //         for(var i = 0; i < ids.length; i++)
  //         {
  //             chrome.runtime.sendMessage(ids[i], { messageFromWeb: message, data: data }, function (response) 
  //             {
  //                 console.log("message send");
  //                 console.log(response);
  //             });
  //         }
  //     }
  // }

  // function to set user name 
  // function setFreshChatUserName(firstname,lastname,mxid)
  // {
  // 	console.log("new user");
  // 	var uniqueID = firstname + "." + lastname + mxid;
  // 	console.log("uniqueID: " + uniqueID);
  // 	// Make sure fcWidget.init is included before setting these values

  // 	// To set unique user id in your system when it is available
  // 	//window.fcWidget.setExternalId(uniqueID);

  // 	// To set user properties
  // 	window.fcWidget.user.setProperties({
  // 		plan: "Estate",                 // meta property 1
  // 		status: "Active"                // meta property 2
  // 	});
  // 	window.fcWidget.user.get(function(resp) {
  // 		console.log("freshchat");
  // 		console.log(resp);
  // 			var status = resp && resp.status,
  // 		 	data = resp && resp.data;
  // 			// if (status == 200) {
  // 		  	window.fcWidget.user.setProperties({
  // 			    firstName: firstname,              // user's first name
  // 			    lastName: lastname,                // user's last name
  // 			    plan: "Estate",                 // user's meta property 1
  // 			    status: "Active",               // user's meta property 2
  // 			  });
  // 		  window.fcWidget.on('user:created', function(resp) {
  // 		  		console.log("user created");
  // 		  		console.log(resp);
  // 		    	// var status = resp && resp.status,
  // 		     // data = resp && resp.data;
  // 		    	// if (status === 200) {
  // 		     //  	if (data.restoreId) {
  // 		     //    		// Update restoreId in your database
  // 		     //  	}
  // 		    	// }
  //     		});
  //   		// }
  // 	});
  // }
  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}
