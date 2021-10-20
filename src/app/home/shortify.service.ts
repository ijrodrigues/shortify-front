import { Injectable } from '@angular/core';
import {Shortify} from "./Shortify";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShortifyService {

  apiUrl: string = environment.shortifyManagerUrl

  constructor(private http: HttpClient) { }

  create(todo : Shortify) : Observable<Shortify>{
    return this.http.post<Shortify>(this.apiUrl, todo)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.error.message;
    return throwError(errorMessage);
  };
}
