import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Acara} from "./acara";

@Injectable({
  providedIn: 'root'
})
export class AcaraService {
  constructor( private http:HttpClient) { }

  public getAllAcara():Observable<Acara[]>
  {
    let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Acara[]>('http://localhost/cencal/api/getacara/',httpOptions)
    .pipe(
      tap(acara => console.log(`fetched ${acara}`)),
      catchError(this.handleError('getHeroes', []))
    );
  }
  
  public getAcara(id)
  {
  	let httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	  };
  	return this.http.get('http://localhost/cencal/api/getacara/'+id,httpOptions);
  }

  public deleteAcara(id_acara:string)
  {
  	let httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	let postData = {id_acara:id_acara};
  	return this.http.post('http://localhost/cencal/api/deleteacara/',JSON.stringify(postData) ,httpOptions);
  }
  public restoreAcara(id_acara:string)
  {
  	let httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	let postData = {id_acara:id_acara};
  	return this.http.post('http://localhost/cencal/api/restoreacara/',JSON.stringify(postData) ,httpOptions);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
