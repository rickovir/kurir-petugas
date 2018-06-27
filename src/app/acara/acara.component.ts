import { Component, OnInit } from '@angular/core';
import { AcaraService } from '../acara.service';
import {Acara} from "../acara";

@Component({
  selector: 'app-acara',
  templateUrl: './acara.component.html',
  styleUrls: ['./acara.component.css']
})
export class AcaraComponent implements OnInit {
	acaraData:Acara[];
  constructor(private acaraService:AcaraService) { 
  	this.acaraData = [];
  }

  ngOnInit() {
  	this.acaraService.getAllAcara().subscribe(
  		acara=>{
  			this.acaraData = acara;
  			console.log(this.acaraData);
  		});
  }

  deleteAcara(id)
  {
  	this.acaraService.deleteAcara(id).subscribe(
  		(data)=>{
  			console.log(data);
  		});
  }
  restoreAcara(id)
  {
  	this.acaraService.restoreAcara(id).subscribe(
  		(data)=>{
  			console.log(data);
  		});
  }

}
