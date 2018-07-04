import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AcaraService } from '../acara.service';

import {Acara} from "../acara";

@Component({
  selector: 'app-acara-detail',
  templateUrl: './acara-detail.component.html',
  styleUrls: ['./acara-detail.component.css']
})
export class AcaraDetailComponent implements OnInit {
  acara:any;

  constructor(  
  private route: ActivatedRoute,
  private router: Router,
  private acaraService: AcaraService) { 
  	this.acara = null;
  }

  ngOnInit() {
  	this.route.params.subscribe(
  		param =>{
  			console.log(param['id']);
  			this.acaraService.getAcara(param['id']).subscribe(
  				data=>{
  					this.acara = data;
  					console.log(data);
  				}
  			);
  		}
	);
  }

}
