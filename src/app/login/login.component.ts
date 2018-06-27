import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email:string;
	password:string;
  constructor(private router: Router) { 
  	this.email="";
  	this.password="";
  }

  ngOnInit() {
  }

  submit():void
  {
  	console.log("email : "+this.email);
  	console.log("password : "+this.password);

  	localStorage.setItem("email", this.email);
  	localStorage.setItem("password", this.password);
  	this.router.navigate(["/home"]);
  }

}
