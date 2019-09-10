import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FidgetService {

  constructor() { }

hideFidget() {
  if( '/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)' ) {
    // some code..
    var divScroll = document.getElementById('formCard').scrollTop;
    if(divScroll > 175)
       {
         document.getElementById("fc_widget").hidden = false;
       }
       else
       {
         document.getElementById("fc_widget").hidden = true;
       }
 }
}



















}
