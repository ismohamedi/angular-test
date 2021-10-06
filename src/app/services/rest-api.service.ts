import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataElement } from '../models/dataElement';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

    // Define API
    baseURL = 'https://facility.dpod.monitafrica.com/api';

    constructor(private http: HttpClient) {

    }
    username:string = "demo";
    password:string="Afya@20211";

    header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic '+btoa(this.username+":"+ this.password))
    }






    getDataElements() {
      return this.http.get(this.baseURL + '/dataElements.json?paging=false&fields=id,name,displayName,valueType,domainType',this.header)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    getIndicators() {
      return this.http.get(this.baseURL + '/indicators.json?fields=id,displayName',this.header)
      .pipe(retry(1),
      catchError(this.handleError))
    }
    
    getOrganisationUnits() {
      return this.http.get(this.baseURL + '/organisationUnits.json?fields=id,displayName',this.header)
      .pipe(retry(1),
      catchError(this.handleError))
    }


     // Error handling
  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
function base64encode(username: any, password: any) {
  throw new Error('Function not implemented.');
}

