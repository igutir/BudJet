import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiclientService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }

    apiURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getCuenta(cuentaId:any):Observable<any>{
        return this.http.get(this.apiURL+'/cuentas/'+cuentaId).pipe(
            retry(3)
        );
    }

    getCuentas():Observable<any>{
        return this.http.get(this.apiURL+'/cuentas/').pipe(
            retry(3)
        );
    }

    getMovimiento(id:any):Observable<any>{
        return this.http.get(this.apiURL+'/movimientos/'+id).pipe(
            retry(3)
        );
    }

    getMovimientos():Observable<any>{
        return this.http.get(this.apiURL+'/movimientos/').pipe(
            retry(3)
        );
    }

    createMovimiento(movimiento:any): Observable<any>{
        return this.http.post(this.apiURL+'/movimientos',movimiento,this.httpOptions).pipe(
            retry(3)
        );
    }

    updateMovimiento(id:any, movimiento:any): Observable<any>{
        return this.http.put(this.apiURL+'/movimientos/'+id,movimiento,this.httpOptions).pipe(
            retry(3)
        );
    }

    deleteMovimiento(id:any): Observable<any>{
        return this.http.delete(this.apiURL+'/movimientos/'+id,this.httpOptions);
    }
}
