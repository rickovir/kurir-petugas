import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  pathNow:any;

  constructor(private router:Router,private location: Location)
  {
  	console.log("Route now : "+this.location.path() );
  	this.pathNow = this.location.path();
  }
}
