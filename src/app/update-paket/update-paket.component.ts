import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PaketBarang } from '../PaketBarang';
import { PaketBarangService } from '../paket-barang.service';

@Component({
  selector: 'app-update-paket',
  templateUrl: './update-paket.component.html',
  styleUrls: ['./update-paket.component.css']
})
export class UpdatePaketComponent implements OnInit {
	paket:PaketBarang;
	isSubmit:boolean;
	
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
  constructor(
	  private route: ActivatedRoute,
	  private router: Router,
	  private paketBarangService:PaketBarangService
	  ) { }

  ngOnInit() {
  	let id;
  	this.route.params.subscribe(
  		(param)=>{
  			id  = param['id'];
  		});

	this.tujuanOption = [];

  	this.paketBarangService.callSelectPaket(id);

	this.paketBarangService.receiveSelectPaket().subscribe(
		(data:PaketBarang) =>{
			this.resi = data.no_resi;
			this.layananDecimal = 1;
			this.nama = data.nama_paket;
			this.biaya = data.tarif;
			this.jenis =data.jenis_paket;
			this.p = 0;
			this.l = 0;
			this.t = 0;
			this.volume = 0;
			this.dimensi = 0;
			this.berat = data.berat;
			this.penerima = {
				nama:data.nama_penerima,
				alamat:data.alamat_penerima,
				nohp:data.telepon_penerima
			}
			this.pengirim = {
				nama:data.nama_pengirim,
				alamat:data.alamat_pengirim,
				nohp:data.telepon_pengirim
			}
			this.tujuan = {
				nama_cabang:"",
				harga:0,
				IDCabang:data.IDCabang
			};

			this.geoLoc = {
				lat:data.lat,
				lng:data.lng
			}
	});
  }

  	initDataPaketBarang()
	{
		this.resi = "";
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
	}

}
