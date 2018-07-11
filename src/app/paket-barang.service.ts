import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { PaketBarang } from './PaketBarang';


@Injectable({
  providedIn: 'root'
})
export class PaketBarangService {
  	private socketUrl:string;
  	private socket:any;
  constructor() {
    this.socketUrl = localStorage.getItem("socketUrl");
    if(this.socketUrl == undefined)
    {
      window.location.href = "/login";
    }
    else
    {
      this.socket = io(this.socketUrl);
      this.socket.connect();  
    }
  }

  	public initData():void
  	{
  		this.socket.on('connect',()=>{
			this.socket.emit('show_paket_barang');
        this.socket.emit('show_harga');
  			this.socket.emit('show_cabang');
	  	});
  	}

  // show_paket_barang
  public showPaketBarang()
  {
    let observable:Observable<PaketBarang[]> = new Observable(
        (observer) => {
        this.socket.on('show_paket_messages', 
          (data) => {
          observer.next(data);
          });
        })
      return observable;
  }
  public paketBarangStream()
  {
  	let observable:Observable<any> = new Observable(
	    	(observer) => {
				this.socket.on('paket_barang_stream', 
					(data) => {
					observer.next(data);
					});
	    	})
	    return observable;
  }
  // show_paket_barang
  public showHarga()
  {
    let observable:Observable<any[]> = new Observable(
        (observer) => {
        this.socket.on('show_harga_answer', 
          (data) => {
          observer.next(data);
          });
        })
      return observable;
  }
  public callSelectPaket(id)
  {
    this.socket.emit("select_paket",{IDPaket:id});
  }

  public receiveSelectPaket()
  {
    let observable:Observable<PaketBarang> = new Observable(
        (observer) => {
        this.socket.on('select_paket_messages', 
          (data) => {
          observer.next(data);
          });
        })
      return observable;
  }
  // show_paket_barang
  public showCabang()
  {
  	let observable:Observable<any[]> = new Observable(
	    	(observer) => {
				this.socket.on('show_cabang_messages', 
					(data) => {
					observer.next(data);
					});
	    	})
	    return observable;
  }
  public addBarang(data):Observable<any>
  {
    let send = {
      type : 'add',
      data : data,
      cabang : {
        IDCabang : localStorage.getItem("IDCabang"),
        nama_cabang : localStorage.getItem("nama_cabang")
      }
    };
    this.socket.emit('paket_barang_stream', send);
    
      let observable:Observable<any> = new Observable(
        (observer) => {
        this.socket.on('paket_barang_stream', 
          (data) => {
            observer.next(data);
          });
        })
      return observable;
  }
  public updateBarang(data):Observable<any>
  {
    let send = {
      type : 'update',
      data : data,
      IDPaket : data.IDPaket
    };
    this.socket.emit('paket_barang_stream', send);
    
    console.log(send);

      let observable:Observable<any> = new Observable(
        (observer) => {
        this.socket.on('paket_barang_stream', 
          (data) => {
            observer.next(data);
          });
        })
      return observable;
  }
  public deleteBarang(id):Observable<any>
  {
  	let send = {
  		type : 'delete',
      IDPaket : id
  	};
  	this.socket.emit('paket_barang_stream', send);
  	
    console.log(send);

      let observable:Observable<any> = new Observable(
        (observer) => {
        this.socket.on('paket_barang_stream', 
          (data) => {
            observer.next(data);
          });
        })
      return observable;
  }
}
