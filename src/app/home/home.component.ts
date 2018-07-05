import { Component, OnInit } from '@angular/core';
import {PaketBarang} from '../PaketBarang';
import { GeneralService } from '../general.service';

declare var google: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	total:number;
	jumlah:number;

	constructor(private generalService:GeneralService) {
	
	 }

	ngOnInit() {
		this.generalService.callTarif();
		this.generalService.callJumlah();

		this.generalService.tarifStream().subscribe(
		(data)=>{
			this.total = data[0].total;
			console.log(data);
		});

		this.generalService.jumlahStream().subscribe(
		(data)=>{
			this.jumlah = data[0].jumlah;
			console.log(data);
		});
	}
	
}
