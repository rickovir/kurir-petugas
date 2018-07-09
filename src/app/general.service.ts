import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	private socketUrl:string;
	private socket:any;

	constructor() {
	// this.socketUrl = `http://${ localStorage.getItem("IP") }`;
		this.socketUrl = "http://localhost:3000";
		this.socket = io(this.socketUrl);
		this.socket.connect();
 }

	callTarif()
	{
		this.socket.emit('stream_tarif');
	}
	public tarifStream()
	{
		let observable:Observable<any> = new Observable(
			(observer) => {
				this.socket.on('stream_tarif', 
					(data) => {
						observer.next(data);
					});
			})
		return observable;
	}
	callJumlah()
	{
		this.socket.emit('stream_jumlahtr');
	}
	public jumlahStream()
	{
		let observable:Observable<any> = new Observable(
			(observer) => {
				this.socket.on('stream_jumlahtr', 
					(data) => {
						observer.next(data);
					});
			})
		return observable;
	}
}
