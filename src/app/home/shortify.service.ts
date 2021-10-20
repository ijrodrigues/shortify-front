import { Injectable } from '@angular/core';
import {ShortifyRequest} from "./ShortifyRequest";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {ShortifyResponse} from "./ShortifyResponse";

@Injectable({
  providedIn: 'root'
})
export class ShortifyService {

  apiUrl: string = environment.shortifyManagerUrl

  constructor(private http: HttpClient) { }

  create(todo : ShortifyRequest) : Observable<ShortifyResponse>{
    return this.http.post<ShortifyResponse>(this.apiUrl, todo)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.error.message;
    return throwError(errorMessage);
  };
}
