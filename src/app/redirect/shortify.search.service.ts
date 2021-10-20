import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ShortifyRequest} from "../home/ShortifyRequest";

@Injectable({
  providedIn: 'root'
})
export class ShortifySearchService {

  apiUrl: string = environment.shortifySearchUrl

  constructor(private http: HttpClient) { }

  findById(id: string | null) : Observable<ShortifyRequest>{
    return this.http.get<ShortifyRequest>(`${this.apiUrl}/${id}`)
  }
}
