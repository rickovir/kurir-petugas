import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logOut()
  {
  	localStorage.setItem('username','');
  	localStorage.setItem('password','');
  	window.location.href = "/login";
  }
}
