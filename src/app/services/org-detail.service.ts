import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDataService } from './country-data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrgDetailService {

  constructor(
    private http: HttpClient,
    private countryService: CountryDataService
  ) { }

  orgDetail () {
      let user = JSON.parse(localStorage.getItem("saveAllUserData"));
      console.log(user, '************ orgdetail service');
      const token = localStorage.getItem("saveToken");
      let data = {"mxid":user.mxid,"mobile":user.doc.mobile};
      const httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type':  'application/json',
          // 'dataType':  'application/json',
          // 'crossDomain': 'true',
          'Authorization': token
        })
      };
      return this.http.post<any>(environment.orginivitationdetails, data, httpOptions);

  }

  // orgInvitationDetail (orgdata: any) {
  //   let user = JSON.parse(localStorage.getItem("saveAllUserData"));
  //   const token = localStorage.getItem("saveToken");
  //   let data = {"mxid":user.data.mxid,"mobile":user.data.doc.mobile};
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'dataType':  'application/json',
  //       'crossDomain': 'true',
  //       'Authorization': token
  //     })
  //   };
  //   return this.http.post<any>(environment.orginivitationdetails, data, httpOptions);
  // }

  //         }).then(function(response){
  //             callback(response);
  //         },function(err){
  //             callback(err);
 

}
