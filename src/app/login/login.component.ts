import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  isValid:boolean;
  cabangs:any[];
  server:any;
  private socketUrl:string;
  private socket:any;

  constructor() { 
    // this.socketUrl = "http://192.168.1.30:3000";
    this.socketUrl = "http://localhost:3000";

    this.username="";
    this.password="";
    this.password="";
    this.isValid = true;
    this.cabangs = [];
  }

  ngOnInit() {
  
  }
  connect()
  {

    this.socket = io(this.socketUrl);
    this.socket.connect();

    this.socket.emit("servers_stream");

    let observable:Observable<any> = new Observable(
      (observer) => {
      this.socket.on('servers_stream', 
        (data) => {
        observer.next(data);
        });
      });
    observable.subscribe((data)=>{
      this.cabangs = data;
      console.log(data);
    });
  }

  submit():void
  {

    this.username = btoa(this.username);
    this.password = btoa(this.password);
    if(this.username == 'cGV0dWdhcw==' && this.password == 'cGV0dWdhcw=='){

      localStorage.setItem("username", this.username);
      localStorage.setItem("password", this.password);
      localStorage.setItem("socketUrl", this.server.IP);

      localStorage.setItem("IDCabang", this.server.IDCabang);
      localStorage.setItem("nama_cabang", this.server.nama_cabang);
      localStorage.setItem("IP", this.server.IP);

      window.location.href = "/home";
      this.username = "success";
      this.password = "success";
    }
    else
    {
      this.isValid = false;

      setTimeout(()=>{
        this.isValid = true;
      }, 5000);
    }
  }

}
