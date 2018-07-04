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
	this.socketUrl = "http://localhost:3000";
	this.socket = io(this.socketUrl);
	this.socket.connect();
  }

  	public initData():void
  	{
  		this.socket.on('connect',()=>{
			this.socket.emit('show_paket_barang');
  			this.socket.emit('show_harga');
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
  public addBarang(data):Observable<any>
  {
  	let send = {
  		type : 'add',
		data : data
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
}
