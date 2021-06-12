import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TerritoryData} from "../domains/TerritoryData";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  loadTerritoryData(uuid:string):Observable<TerritoryData> {
    return this.http.get<TerritoryData>(`assets/data/${uuid}.json`);
  }
}
