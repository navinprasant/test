import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  // allCountries = [];

  constructor(private http: HttpClient) { }

    getCountryData() : Observable<any>
    {
      return this.http.get<any>("https://prod.dirolabs.com:8443/Zuul-1.0/VerifiedCountryDetail-2.0/getVerifiedCountry");
    }

    getCountryWithStates() {
      return this.http.get<any>(environment.country_with_states);
    }

   getGeoIp () : Observable<any> {
     return this.http.get("https://geoip-db.com/json/");
   }

  //  getURL()
  //  {
  //    let urls = {
  //      "stage":{
  //        "sendotp":"https://stage.dirolabs.com:8443/User-1.0/sendOtp",
  //        "uploadkyc":"https://stage.dirolabs.com:8443/uploadKyc-1.0/upload",
  //        "download":"https://stage.dirolabs.com:8443/uploadKyc-1.0/downloadDoucment",
  //        "deletedoc":"https://stage.dirolabs.com:8443/uploadKyc-1.0/deleteKyc",
  //        "addwallet":"https://stage.dirolabs.com:8443/kycwallet-1.0/addwallet",
  //        "checkwalletstatus":"https://stage.dirolabs.com:8443/kycwallet-1.0/checkwalletstatus",
  //        "getuserlistwithdocs":"https://e1r3fenwh6.execute-api.us-west-1.amazonaws.com/stage/getuserlistwithdocs",
  //        "getedd":"https://stage.dirolabs.com:8443/kycwallet-1.0/edd",
  //        "getuserkycinfo":"https://stage.dirolabs.com:8443/User-1.0/getUserKycInfo",
  //        "updateuserprofileinfo":"https://stage.dirolabs.com:8443/User-1.0/updateUserProfile",
  //        "rawmxcreation":"https://8mo5ypt05j.execute-api.us-west-1.amazonaws.com/stage/rawmxcreation",
  //        "gettransactionforaddress":"https://ctaa5skxm9.execute-api.us-west-1.amazonaws.com/stage/gettransactionforaddress",
  //        "createcontact":"https://h99p8nvl0l.execute-api.us-west-1.amazonaws.com/stage/createcontact",
  //        "tagcontact":"https://em4dwyn1b3.execute-api.us-west-1.amazonaws.com/stage/tagcontact",
  //        "usercxplist":"https://33e7s4ynyg.execute-api.us-west-1.amazonaws.com/stage/usercxplist",
  //        "mainurl":"https://stage-submitkyc.dirolabs.com/",
  //        "nxcreateforaddress":"https://stage.dirolabs.com:8443/AddressVerifier-1.0/createNxForAddress",
  //        "addressverify":"https://stage.dirolabs.com:8443/AddressVerifier-1.0/verifyAddress",
  //        "selectlanguage":"https://stage.dirolabs.com:8443/IdMaster-1.0/getcountryname?languages=",
  //        "countryinfo":"https://stage.dirolabs.com:8443/IdMaster-1.0/idInfo",
  //        "updatecountrydata":"https://stage.dirolabs.com:8443/IdMaster-1.0/updatedoc",
  //        "addcomment":"https://stage.dirolabs.com:8443/IdMaster-1.0/addComment",
  //        "showcomment":"https://stage.dirolabs.com:8443/IdMaster-1.0/showComments", 
  //        "mysubmissiondetail":"https://stage.dirolabs.com:8443/IdMaster-1.0/userWiseCountry",
  //        "verifiedcountrylist":"https://stage.dirolabs.com:8443/VerifiedCountryDetail-1.0/getVerifiedCountry",
  //              "addressverifierlink":"https://stage-submitkyc.dirolabs.com/addressVerifier",
  //              "postimage":"https://stage.dirolabs.com:8443/Image-1.0/postImage",
  //              "epassportlink":"https://stage.dirolabs.com:8443/PassportId-1.0/sendLink",
  //              "orginivitationdetails":"https://stage.dirolabs.com:8443/organization-1.0/getorg/invitation/detail",
  //              "orgverifiedinvite":"https://stage.dirolabs.com:8443/organization-1.0/verifiedinvite",
  //              "orgswitchstatus":"https://stage.dirolabs.com:8443/organization-1.0/onofforg",
  //              "getdocstatus":"https://stage.dirolabs.com:8443/User-1.0/getdocstatus",
  //              "checkexistance":"https://stage.dirolabs.com:8443/organization-1.0/checkexistance",
  //              "sendsmsfororg":"https://stage.dirolabs.com:8443/organization-1.0/sendsmsfororg",
  //              "createconsentrawmx":"https://stage.dirolabs.com:8443/organization-1.0/createconsentrawmx",
  //              "savelastclickedlink":"https://stage.dirolabs.com:8443/User-1.0/savelastclickedlink",
  //              "guacomoleurl":"https://secureserver.dirolabs.com:8443/server/#/client/MwBnAG15c3Fs",
  //              "get_user_with_key":"https://stage.dirolabs.com:8443/organization-1.0/getuserforkey",
  //              "country_with_states":"https://stage.dirolabs.com:8443/IdMaster-1.0/countrywithstates",
  //              "build_version":-1
  //      },
  //      "stage_sec":{
  //        "sendotp":"https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/sendOtp",
  //        "uploadkyc":"https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/upload",
  //        "download":"https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/downloadDoucment",
  //        "deletedoc":"https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/deleteKyc",
  //        "addwallet":"https://stage.dirolabs.com:8443/kycwallet-1.0/addwallet",
  //        "checkwalletstatus":"https://stage.dirolabs.com:8443/kycwallet-1.0/checkwalletstatus",
  //        "getuserlistwithdocs":"https://e1r3fenwh6.execute-api.us-west-1.amazonaws.com/stage/getuserlistwithdocs",
  //        "getedd":"https://stage.dirolabs.com:8443/kycwallet-1.0/edd",
  //        "getuserkycinfo":"https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/getUserKycInfo",
  //        "updateuserprofileinfo":"https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/updateUserProfile",
  //        "rawmxcreation":"https://8mo5ypt05j.execute-api.us-west-1.amazonaws.com/stage/rawmxcreation",
  //        "gettransactionforaddress":"https://ctaa5skxm9.execute-api.us-west-1.amazonaws.com/stage/gettransactionforaddress",
  //        "createcontact":"https://h99p8nvl0l.execute-api.us-west-1.amazonaws.com/stage/createcontact",
  //        "tagcontact":"https://em4dwyn1b3.execute-api.us-west-1.amazonaws.com/stage/tagcontact",
  //        "usercxplist":"https://33e7s4ynyg.execute-api.us-west-1.amazonaws.com/stage/usercxplist",
  //        "mainurl":"https://stage-submitkyc.dirolabs.com/",
  //        "nxcreateforaddress":"https://stage.dirolabs.com:8443/AddressVerifier-1.0/createNxForAddress",
  //        "addressverify":"https://stage.dirolabs.com:8443/AddressVerifier-1.0/verifyAddress",
  //        "selectlanguage":"https://stage.dirolabs.com:8443/IdMaster-1.0/getcountryname?languages=",
  //        "countryinfo":"https://stage.dirolabs.com:8440/Zuul-1.0/IdMaster-2.0/idInfo",
  //        "updatecountrydata":"https://stage.dirolabs.com:8443/IdMaster-1.0/updatedoc",
  //        "addcomment":"https://stage.dirolabs.com:8443/IdMaster-1.0/addComment",
  //        "showcomment":"https://stage.dirolabs.com:8443/IdMaster-1.0/showComments", 
  //        "mysubmissiondetail":"https://stage.dirolabs.com:8443/IdMaster-1.0/userWiseCountry",
  //        "verifiedcountrylist":"https://stage.dirolabs.com:8443/VerifiedCountryDetail-1.0/getVerifiedCountry",
  //              "addressverifierlink":"https://stage-submitkyc.dirolabs.com/addressVerifier",
  //              "postimage":"https://stage.dirolabs.com:8440/Zuul-1.0/Image-2.0/postImage",
  //              "epassportlink":"https://stage.dirolabs.com:8440/Zuul-1.0/PassportId-2.0/sendLink",
  //              "epassport_email_link":"https://stage.dirolabs.com:8440/Zuul-1.0/PassportId-2.0/sendemail",
  //              "orginivitationdetails":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/getorg/invitation/detail",
  //              "orgverifiedinvite":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/verifiedinvite",
  //              "orgswitchstatus":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/onofforg",
  //              "getdocstatus":"https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/getdocstatus",
  //              "checkexistance":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/checkexistance",
  //              "sendsmsfororg":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/sendsmsfororg",
  //              "createconsentrawmx":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/createconsentrawmx",
  //              "savelastclickedlink":"https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/savelastclickedlink",
  //              "guacomoleurl":"https://secureserver.dirolabs.com:8443/server/#/client/MzQAYwBteXNxbA==",
  //              "get_user_with_key":"https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/getuserforkey",
  //              "country_with_states":"https://stage.dirolabs.com:8440/Zuul-1.0/IdMaster-2.0/countrywithstates",
  //              "build_version":-1
  //      },
  //      "prod":{
  //        "sendotp":"https://prod.dirolabs.com:8443/User-1.0/sendOtp",
  //        "uploadkyc":"https://prod.dirolabs.com:8443/uploadKyc-1.0/upload",
  //        "download":"https://prod.dirolabs.com:8443/uploadKyc-1.0/downloadDoucment",
  //        "deletedoc":"https://prod.dirolabs.com:8443/uploadKyc-1.0/deleteKyc",
  //        "addwallet":"https://prod.dirolabs.com:8443/kycwallet-1.0/addwallet",
  //        "checkwalletstatus":"https://prod.dirolabs.com:8443/kycwallet-1.0/checkwalletstatus",
  //        "getuserlistwithdocs":"https://37wza8u4bg.execute-api.us-west-1.amazonaws.com/prod/getuserlistwithdocs",
  //        "getedd":"https://prod.dirolabs.com:8443/kycwallet-1.0/edd",
  //        "getuserkycinfo":"https://prod.dirolabs.com:8443/User-1.0/getUserKycInfo",
  //        "updateuserprofileinfo":"https://prod.dirolabs.com:8443/User-1.0/updateUserProfile",
  //        "rawmxcreation":"https://prod.dirolabs.com:8443/User-1.0/rawMxCreation",
  //        "gettransactionforaddress":"https://g3i7noupug.execute-api.us-west-1.amazonaws.com/prod/gettransactionforaddress",
  //        "createcontact":"https://9ag3xu9or0.execute-api.us-west-1.amazonaws.com/prod/createcontact",
  //        "tagcontact":"https://92rv55t2f5.execute-api.us-west-1.amazonaws.com/prod/tagcontact",
  //        "usercxplist":"https://a7y045gwqh.execute-api.us-west-1.amazonaws.com/prod/usercxplist",
  //        "mainurl":"https://submitkyc.dirolabs.com/",
  //        "nxcreateforaddress":"https://prod.dirolabs.com:8443/AddressVerifier-1.0/createNxForAddress",
  //        "addressverify":"https://prod.dirolabs.com:8443/AddressVerifier-1.0/verifyAddress",
  //        "selectlanguage":"https://prod.dirolabs.com:8443/IdMaster-1.0/getcountryname?languages=",
  //        "countryinfo":"https://prod.dirolabs.com:8443/IdMaster-1.0/idInfo",
  //        "updatecountrydata":"https://prod.dirolabs.com:8443/IdMaster-1.0/updatedoc",
  //        "addcomment":"https://prod.dirolabs.com:8443/IdMaster-1.0/addComment",
  //        "showcomment":"https://prod.dirolabs.com:8443/IdMaster-1.0/showComments",
  //        "mysubmissiondetail":"https://prod.dirolabs.com:8443/IdMaster-1.0/userWiseCountry",
  //        "verifiedcountrylist":"https://prod.dirolabs.com:8443/VerifiedCountryDetail-1.0/getVerifiedCountry",
  //              "addressverifierlink":"https://submitkyc.dirolabs.com/addressVerifier",
  //              "postimage":"https://prod.dirolabs.com:8443/Image-1.0/postImage",
  //              "epassportlink":"https://prod.dirolabs.com:8443/PassportId-1.0/sendLink",
  //              "orginivitationdetails":"https://prod.dirolabs.com:8443/organization-1.0/getorg/invitation/detail",
  //              "orgverifiedinvite":"https://prod.dirolabs.com:8443/organization-1.0/verifiedinvite",
  //              "orgswitchstatus":"https://prod.dirolabs.com:8443/organization-1.0/onofforg",
  //              "getdocstatus":"https://prod.dirolabs.com:8443/User-1.0/getdocstatus",
  //              "checkexistance":"https://prod.dirolabs.com:8443/organization-1.0/checkexistance",
  //              "sendsmsfororg":"https://prod.dirolabs.com:8443/organization-1.0/sendsmsfororg",
  //              "createconsentrawmx":"https://prod.dirolabs.com:8443/organization-1.0/createconsentrawmx",
  //              "savelastclickedlink":"https://prod.dirolabs.com:8443/User-1.0/savelastclickedlink",
  //              "guacomoleurl":"https://secureserver.dirolabs.com:8443/server/#/client/MQBnAG15c3Fs",
  //              "get_user_with_key":"https://prod.dirolabs.com:8443/organization-1.0/getuserforkey",
  //              "country_with_states":"https://prod.dirolabs.com:8443/IdMaster-1.0/countrywithstates",
  //              "build_version":-1
  //      },
  //      "prod_sec":{
  //        "sendotp":"https://prod.dirolabs.com:8443/Zuul-1.0/User-2.0/sendOtp",
  //        "uploadkyc":"https://prod.dirolabs.com:8443/Zuul-1.0/uploadKyc-2.0/upload",
  //        "download":"https://prod.dirolabs.com:8443/Zuul-1.0/uploadKyc-2.0/downloadDoucment",
  //        "deletedoc":"https://prod.dirolabs.com:8443/Zuul-1.0/uploadKyc-2.0/deleteKyc",
  //        "addwallet":"https://prod.dirolabs.com:8443/kycwallet-1.0/addwallet",
  //        "checkwalletstatus":"https://prod.dirolabs.com:8443/kycwallet-1.0/checkwalletstatus",
  //        "getuserlistwithdocs":"https://e1r3fenwh6.execute-api.us-west-1.amazonaws.com/prod/getuserlistwithdocs",
  //        "getedd":"https://prod.dirolabs.com:8443/kycwallet-1.0/edd",
  //        "getuserkycinfo":"https://prod.dirolabs.com:8443/Zuul-1.0/User-2.0/getUserKycInfo",
  //        "updateuserprofileinfo":"https://prod.dirolabs.com:8443/Zuul-1.0/User-2.0/updateUserProfile",
  //        "rawmxcreation":"https://8mo5ypt05j.execute-api.us-west-1.amazonaws.com/prod/rawmxcreation",
  //        "gettransactionforaddress":"https://ctaa5skxm9.execute-api.us-west-1.amazonaws.com/prod/gettransactionforaddress",
  //        "createcontact":"https://h99p8nvl0l.execute-api.us-west-1.amazonaws.com/prod/createcontact",
  //        "tagcontact":"https://em4dwyn1b3.execute-api.us-west-1.amazonaws.com/prod/tagcontact",
  //        "usercxplist":"https://33e7s4ynyg.execute-api.us-west-1.amazonaws.com/prod/usercxplist",
  //        "mainurl":"https://prod-submitkyc.dirolabs.com/",
  //        "nxcreateforaddress":"https://prod.dirolabs.com:8443/AddressVerifier-1.0/createNxForAddress",
  //        "addressverify":"https://prod.dirolabs.com:8443/AddressVerifier-1.0/verifyAddress",
  //        "selectlanguage":"https://prod.dirolabs.com:8443/IdMaster-1.0/getcountryname?languages=",
  //        "countryinfo":"https://prod.dirolabs.com:8443/Zuul-1.0/IdMaster-2.0/idInfo",
  //        "updatecountrydata":"https://prod.dirolabs.com:8443/IdMaster-1.0/updatedoc",
  //        "addcomment":"https://prod.dirolabs.com:8443/IdMaster-1.0/addComment",
  //        "showcomment":"https://prod.dirolabs.com:8443/IdMaster-1.0/showComments", 
  //        "mysubmissiondetail":"https://prod.dirolabs.com:8443/IdMaster-1.0/userWiseCountry",
  //        "verifiedcountrylist":"https://prod.dirolabs.com:8443/Zuul-1.0/VerifiedCountryDetail-2.0/getVerifiedCountry",
  //              "addressverifierlink":"https://prod-submitkyc.dirolabs.com/addressVerifier",
  //              "postimage":"https://prod.dirolabs.com:8443/Zuul-1.0/Image-2.0/postImage",
  //              "epassportlink":"https://prod.dirolabs.com:8443/Zuul-1.0/PassportId-2.0/sendLink",
  //              "epassport_email_link":"https://prod.dirolabs.com:8443/Zuul-1.0/PassportId-2.0/sendemail",
  //              "orginivitationdetails":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/getorg/invitation/detail",
  //              "orgverifiedinvite":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/verifiedinvite",
  //              "orgswitchstatus":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/onofforg",
  //              "getdocstatus":"https://prod.dirolabs.com:8443/Zuul-1.0/User-2.0/getdocstatus",
  //              "checkexistance":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/checkexistance",
  //              "sendsmsfororg":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/sendsmsfororg",
  //              "createconsentrawmx":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/createconsentrawmx",
  //              "savelastclickedlink":"https://prod.dirolabs.com:8443/Zuul-1.0/User-2.0/savelastclickedlink",
  //              "guacomoleurl":"https://secureweb.dirolabs.com:8443/server/#/client/MQBnAG15c3Fs",
  //              "get_user_with_key":"https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/getuserforkey",
  //              "country_with_states":"https://prod.dirolabs.com:8443/Zuul-1.0/IdMaster-2.0/countrywithstates",
  //              "build_version":-1
  //      }
  //    }
  //    return urls.stage;
  //  }

  //  app.service('countryWithStates',function($http){
  //   this.gettingCountryWithStates = function(callback,defaultData)
  //   {
  //         document.body.style.opacity = "0.5";
  //     var url = getURL();
  //         $http({
  //             method: "GET",
  //             url: url.country_with_states
  //         }).then(function(response){
  //             console.log("country_with_states success response");
  //             console.log(response);
  //             callback(response.data.countries);
  //             document.body.style.opacity = "1";
  //             $http({
  //                     method: "GET",
  //                     url: "https://geoip-db.com/json/"
  //                 }).then(function(response){
  //                     console.log(response);
  //                     defaultData(response.data);
  //                 },function(error){
  //                     console.log(error);
  //                 });
  //         },function(error){
  //             console.log("country_with_states error response");
  //             console.log(error);
  //             document.body.style.opacity = "1";
  //         })
  //   }
  // })



}
