import { Component, OnInit, NgZone } from '@angular/core';
import {PaketBarang} from '../PaketBarang';
import {ActivatedRoute, Router} from "@angular/router";
import { PaketBarangService } from '../paket-barang.service';

@Component({
	selector: 'app-paket',
	templateUrl: './paket.component.html',
	styleUrls: ['./paket.component.css']
})
export class PaketComponent implements OnInit {
	pakets:Array<PaketBarang>;
	cabang:Array<any>;

	constructor(private paketBarangService:PaketBarangService, private router:Router, private ngZone:NgZone) {

	 }

	ngOnInit() {
		console.log("paket barang tampil page");
		this.paketBarangService.initData();
		this.pakets = [];
		this.cabang = [];
		this.paketBarangService.showPaketBarang().subscribe(
			(data:PaketBarang[])=>{
				this.pakets = data;
				console.log(data);
			});

		this.paketBarangService.paketBarangStream().subscribe(
			(data)=>{
				if(data.type=="add")
				{
					console.log(data);
					data.data.IDPaket = data.IDPaket;
					this.pakets.unshift(data.data);
				}
				else if(data.type=="update")
				{
					console.log(data);
					this.pakets.map((dataPaket)=>{
						if(dataPaket.IDPaket == data.data.IDPaket)
						{
							dataPaket = data.data;
						}
					})
				}
				else if(data.type=="delete")
				{
					console.log(data);
					this.pakets = this.pakets.filter((dataPaket)=>{
						if(dataPaket.IDPaket != data.data.IDPaket)
						{
							return dataPaket;
						}
					})
				}
			});

		this.paketBarangService.showCabang().subscribe(
			(data:any[])=>{
				this.cabang = data;
				console.log(data);
			});

	}

	cekKosong()
	{
		this.paketBarangService.initData();
		console.log("cek");
	}
	

	getNamaCabang(id)
	{
		let x = this.cabang.filter(data=>{
			return data.IDCabang == id
		})

		return x[0].nama_cabang;
	}

	gotoAdd()
	{
		this.ngZone.run(()=>{
			this.router.navigateByUrl('/paket/add');
		});
		console.log("add data");
	}
	
}
