import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Shortify} from "../home/Shortify";

@Injectable({
  providedIn: 'root'
})
export class ShortifySearchService {

  apiUrl: string = environment.shortifySearchUrl

  constructor(private http: HttpClient) { }

  findById(id: string | null) : Observable<Shortify>{
    return this.http.get<Shortify>(`${this.apiUrl}/${id}`)
  }
}
