import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Data} from '../app/classes/data';
import {turkeyData} from '../app/classes/turkey';
import {country} from '../app/classes/country';
@Injectable({
  providedIn: 'root'
})
export class CovidService {
  apiUrl = 'https://api.covid19api.com/world/total';
  countUrl = 'https://api.covid19api.com/total/country/';
  constructor(private http:HttpClient) { }
  
  getCountry(){
    return this.http.get<country[]>('https://api.covid19api.com/countries');
  }
  getData():Observable<Data>{
    return this.http.get<Data>(this.apiUrl);
  }
  getDataTurkey(country):Observable<turkeyData[]>{
    return this.http.get<turkeyData[]>(this.countUrl + country);
  }
  // getCountry():Observable<Data>{

  // }
}
