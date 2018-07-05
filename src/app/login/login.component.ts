import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username:string;
	password:string;
  isValid:boolean;

  constructor() { 
  	this.username="";
  	this.password="";
    this.isValid = true;
  }

  ngOnInit() {
  }

  submit():void
  {

    this.username = btoa(this.username);
    this.password = btoa(this.password);
    if(this.username == 'cGV0dWdhcw==' && this.password == 'cGV0dWdhcw=='){

    	localStorage.setItem("username", this.username);
    	localStorage.setItem("password", this.password);

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
