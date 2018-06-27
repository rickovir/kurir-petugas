import { Component, OnInit } from '@angular/core';
import {PaketBarang} from '../PaketBarang';
import { PaketBarangService } from '../paket-barang.service';

declare var google: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	paket:PaketBarang;
	
	tujuanOption:Array<{
		nama_cabang:string,
		harga:number,
		IDCabang:number
	}>;

	tujuan:{
		nama_cabang:string,
		harga:number,
		IDCabang:number
	};

	resi:string;
	pecahBelah:string;
	biaya:number;
	nama:string;
	berat:number;
	p:number;
	l:number;
	t:number;
	dimensi:number;
	volume:number;
	layananDecimal:number;
	jenis:string;
	pengirim:{
		nama:string,
		alamat:string,
		nohp:string
	};
	penerima:{
		nama:string,
		alamat:string,
		nohp:string
	};
	geoLoc:{
		lat:number,
		lng:number
	}

	constructor(private paketBarangService:PaketBarangService) {
		this.resi = this.makeResi();
		this.layananDecimal = 1;
		this.nama = "";
		this.biaya = 0;
		this.jenis ="";
		this.p = 0;
		this.l = 0;
		this.t = 0;
		this.volume = 0;
		this.dimensi = 0;
		this.berat = 0;
		this.penerima = {
			nama:"",
			alamat:"",
			nohp:""
		}
		this.pengirim = {
			nama:"",
			alamat:"",
			nohp:""
		}
		this.tujuan = {
			nama_cabang:"",
			harga:0,
			IDCabang:0
		};

		this.geoLoc = {
			lat:0,
			lng:0
		}

		this.tujuanOption = [];

		this.paketBarangService.initData();

		this.paketBarangService.showPaketBarang().subscribe(
			data =>{
				console.log(data);
				});
		this.paketBarangService.showHarga().subscribe(
			data =>{
				this.tujuanOption = data;
			});
	 }

	ngOnInit() {
	}
	setAlamatPengirim(alamat)
	{
		this.pengirim.alamat = alamat;
	}
	setAlamatPenerima(alamat)
	{
		this.penerima.alamat = alamat;
	}

	RunAutoCompletePengirim()
	{
		// this just for angular desktop
	    var input = document.getElementById('alamatPengirim');
		var options = {componentRestrictions: {country: 'id'}};
		var autocomplete = new google.maps.places.Autocomplete(input, options);

		autocomplete.addListener('place_changed', () =>{
	        var place = autocomplete.getPlace();
	        this.setAlamatPengirim(place.formatted_address);
	        console.log(place.name);
	        console.log(place.geometry.location.lat());

	        if (!place.geometry) {
	          alert("No details available for input: '" + place.name + "'");
	        return;
	      }
	      });
	}

	setGeoLoc(lat,lng)
	{
		this.geoLoc={
			lat:lat,
			lng:lng
		};
	}

	RunAutoCompletePenerima()
	{
		// this just for angular desktop
	    var input = document.getElementById('alamatPenerima');
		var options = {componentRestrictions: {country: 'id'}};
		var autocomplete = new google.maps.places.Autocomplete(input, options);

		autocomplete.addListener('place_changed', () =>{
	        var place = autocomplete.getPlace();
	        this.setAlamatPenerima(place.formatted_address);
	        console.log(place.name);
	        
	        this.setGeoLoc(place.geometry.location.lat(),place.geometry.location.lng());

	        if (!place.geometry) {
	          alert("No details available for input: '" + place.name + "'");
	        return;
	      }
	      });
	}
	

	cekTujuan()
	{
		console.log(this.tujuan);
	}
	submitData()
	{
		let kategoriPaket;

		if(this.layananDecimal == 1)
		{
			kategoriPaket = 'REG';
		}else if(this.layananDecimal == 1.5)
		{
			kategoriPaket = 'EXP';
		}
		this.paket = {
			IDPaket:0,
			IDCabang:this.tujuan.IDCabang,
			nama_paket:this.nama,
			no_resi:this.resi,
			nama_pengirim:this.pengirim.nama,
			alamat_pengirim:this.pengirim.alamat,
			telepon_pengirim:this.pengirim.nohp.toString(),
			nama_penerima:this.penerima.nama,
			alamat_penerima:this.penerima.alamat,
			telepon_penerima:this.penerima.nohp.toString(),
			berat:this.berat,
			kategori_paket:kategoriPaket,
			jenis_paket:this.jenis,
			tarif:this.biaya,
			created_on:0,
			lat:this.geoLoc.lat,
			lng:this.geoLoc.lng
		};

		console.log(this.paket);

		this.paketBarangService.addBarang(this.paket).subscribe(
			data =>{
				console.log(data);
				});
	}
	cekTextarea()
	{
		console.log(this.nama);
	}
	getTime()
	{
		return new Date().getTime();
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	makeResi()
	{
		return this.getTime().toString() + this.getRandomInt(100,999).toString();
	}

	hitungDimensi()
	{
		this.dimensi = this.p*this.l*this.t;
		this.volume = this.dimensi/6000;
		this.hitungHarga();
	}
	hitungHarga()
	{
		if(this.dimensi < 18000){
			this.biaya = this.tujuan.harga*this.berat*this.layananDecimal;
		}
		else
		{
			this.biaya = this.volume*this.tujuan.harga*this.layananDecimal;
		}
	}

}
