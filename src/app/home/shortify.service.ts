import { Injectable } from '@angular/core';
import {Shortify} from "./Shortify";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShortifyService {

  apiUrl: string = environment.shortifyManagerUrl

  constructor(private http: HttpClient) { }

  create(todo : Shortify) : Observable<Shortify>{
    return this.http.post<Shortify>(this.apiUrl, todo)
  }
}
