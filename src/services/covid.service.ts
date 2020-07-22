import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Data} from '../app/classes/data';
@Injectable({
  providedIn: 'root'
})
export class CovidService {
  apiUrl = 'https://api.covid19api.com/world/total';
  constructor(private http:HttpClient) { }
  
  getData():Observable<Data>{
    return this.http.get<Data>(this.apiUrl);
  }
}
