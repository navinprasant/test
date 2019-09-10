import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  // app.service('webSocket',function($location){
  //   this.createWebSocket = (callback) => {
  //     var sock = new WebSocket("wss://stage.dirolabs.com:8356/name");
  //         sock.onopen = function()
  //         {
  //             console.log("connected to web socket");
  //             var user = JSON.parse(localStorage.getItem("saveAllUserData"));
  //             console.log($location.path());
  //             if(user.data.mxid != undefined)
  //             {
  //               var jsonObject = {"mxid":user.data.mxid};
  //             }
  //             else
  //             {
  //               var jsonObject = {"mxid":user.data.doc.mxid};
  //             }
  //             if($location.path().search('docLinks') == -1) {
  //               jsonObject.data = "no parser found";
  //             }
  //             sock.send(JSON.stringify(jsonObject));
  //         }
  //         sock.onmessage = function(event)
  //         {
  //             console.log(event);
  //             if(event.data != "hi this is from server")
  //             {
  //               sock.close();
  //             }
  //         }
  //         sock.onclose = function(event)
  //         {
  //           callback();
  //             console.log("socket closed");
  //             console.log(event);
  //         }
  //   }
  // })
}
