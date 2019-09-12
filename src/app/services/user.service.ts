import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDataService } from './country-data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url = this.countryService.getURL();
  constructor(
    private http: HttpClient,
    private countryService: CountryDataService
  ) { }

  verifyUserOTP(data:any) :Observable<any> {
    return this.http.post<any>(environment.sendotp, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
   }

   updateUserProfileInfo (data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
    };
    return this.http.post<any>(environment.updateuserprofileinfo, data,{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
   }

   postImage (data: any) {

    return this.http.post<any>(environment.postimage, data, {observe: 'response'});
   }

   getUserKycInfo(data: any) {
    let token = localStorage.getItem('saveToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<any>(environment.getuserkycinfo, data, httpOptions);
   }
}
