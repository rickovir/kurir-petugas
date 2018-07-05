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
		let username = localStorage.getItem("username");
		let password = localStorage.getItem("password");

		if(username == "" || username == undefined)
		{
			window.location.href = "/login";
		}
		else if(username != "cGV0dWdhcw==")
		{
			window.location.href = "/login";
		}

		if(password == "" || password == undefined)
		{
			window.location.href = "/login";
		}
		else if(password != "cGV0dWdhcw==")
		{
			window.location.href = "/login";
		}
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
				if(data.type=="add") // add data from socket
				{
					console.log(data);
					data.data.IDPaket = data.IDPaket;
					this.pakets.unshift(data.data);
				}
				else if(data.type=="update") // update data from socket
				{
					console.log(data);
					for(let i =0; i<this.pakets.length; i++)
					{
						if(this.pakets[i].IDPaket == data.IDPaket)
						{
							this.pakets[i] = data.data;
							this.pakets[i].IDPaket = data.IDPaket;
						}
					}
				}
				else if(data.type=="delete") // delete data from socket
				{
					console.log(data);
					// let temp:PaketBarang[];
					// let j = 0;
					// for(let i =0; i<this.pakets.length; i++)
					// {
					// 	if(this.pakets[i].IDPaket != data.IDPaket)
					// 	{
					// 		temp[j] = this.pakets[i];
					// 		j++;
					// 	}
					// }
					// this.pakets = temp;
					this.pakets = this.pakets.filter(paket=>paket.IDPaket !==data.IDPaket);
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

	doDeleteBarang(id)
	{
		this.paketBarangService.deleteBarang(id).subscribe((data)=>{
			console.log(data);
		});
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
