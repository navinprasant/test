// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sendotp: "https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/sendOtp",
  uploadkyc: "https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/upload",
  download: "https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/downloadDoucment",
  deletedoc: "https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/deleteKyc",
  addwallet: "https://stage.dirolabs.com:8443/kycwallet-1.0/addwallet",
  checkwalletstatus: "https://stage.dirolabs.com:8443/kycwallet-1.0/checkwalletstatus",
  getuserlistwithdocs: "https://e1r3fenwh6.execute-api.us-west-1.amazonaws.com/stage/getuserlistwithdocs",
  getedd: "https://stage.dirolabs.com:8443/kycwallet-1.0/edd",
  getuserkycinfo: "https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/getUserKycInfo",
  updateuserprofileinfo: "https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/updateUserProfile",
  rawmxcreation: "https://8mo5ypt05j.execute-api.us-west-1.amazonaws.com/stage/rawmxcreation",
  gettransactionforaddress: "https://ctaa5skxm9.execute-api.us-west-1.amazonaws.com/stage/gettransactionforaddress",
  createcontact: "https://h99p8nvl0l.execute-api.us-west-1.amazonaws.com/stage/createcontact",
  tagcontact: "https://em4dwyn1b3.execute-api.us-west-1.amazonaws.com/stage/tagcontact",
  usercxplist: "https://33e7s4ynyg.execute-api.us-west-1.amazonaws.com/stage/usercxplist",
  mainurl: "https://stage-submitkyc.dirolabs.com/",
  nxcreateforaddress: "https://stage.dirolabs.com:8443/AddressVerifier-1.0/createNxForAddress",
  addressverify: "https://stage.dirolabs.com:8443/AddressVerifier-1.0/verifyAddress",
  selectlanguage: "https://stage.dirolabs.com:8443/IdMaster-1.0/getcountryname?languages=",
  countryinfo: "https://stage.dirolabs.com:8440/Zuul-1.0/IdMaster-2.0/idInfo",
  updatecountrydata: "https://stage.dirolabs.com:8443/IdMaster-1.0/updatedoc",
  addcomment: "https://stage.dirolabs.com:8443/IdMaster-1.0/addComment",
  showcomment: "https://stage.dirolabs.com:8443/IdMaster-1.0/showComments",
  mysubmissiondetail: "https://stage.dirolabs.com:8443/IdMaster-1.0/userWiseCountry",
  verifiedcountrylist: "https://stage.dirolabs.com:8443/VerifiedCountryDetail-1.0/getVerifiedCountry",
  addressverifierlink: "https://stage-submitkyc.dirolabs.com/addressVerifier",
  postimage: "https://stage.dirolabs.com:8440/Zuul-1.0/Image-2.0/postImage",
  epassportlink: "https://stage.dirolabs.com:8440/Zuul-1.0/PassportId-2.0/sendLink",
  epassport_email_link: "https://stage.dirolabs.com:8440/Zuul-1.0/PassportId-2.0/sendemail",
  orginivitationdetails: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/getorg/invitation/detail",
  orgverifiedinvite: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/verifiedinvite",
  orgswitchstatus: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/onofforg",
  getdocstatus: "https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/getdocstatus",
  checkexistance: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/checkexistance",
  sendsmsfororg: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/sendsmsfororg",
  createconsentrawmx: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/createconsentrawmx",
  savelastclickedlink: "https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/savelastclickedlink",
  guacomoleurl: "https://secureserver.dirolabs.com:8443/server/#/client/MzQAYwBteXNxbA==",
  get_user_with_key: "https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/getuserforkey",
  country_with_states: "https://stage.dirolabs.com:8440/Zuul-1.0/IdMaster-2.0/countrywithstates",
  build_version: -1
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
