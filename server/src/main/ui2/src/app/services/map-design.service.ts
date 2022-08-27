import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapDesign, TerritoryMap} from "../domains/MapDesign";

@Injectable({
  providedIn: 'root'
})
export class MapDesignService {

  public static url = `${environment.serverUrl}/map/`;

  constructor(private http:HttpClient) { }

  getMapDesign():Observable<MapDesign> {
    return this.http.get<MapDesign>(`${MapDesignService.url}`);
  }

  saveMapDesign(mapDesign:MapDesign):Observable<MapDesign> {

    let stringMapDesign = JSON.stringify(mapDesign, this.getCircularReplacer());
    let uncycledMapDesign = JSON.parse(stringMapDesign);

    return this.http.put<MapDesign>(`${MapDesignService.url}`,uncycledMapDesign);
  }

  saveTerritoryMap(territoryMap:TerritoryMap):Observable<TerritoryMap> {

    let stringMapDesign = JSON.stringify(territoryMap, this.getCircularReplacer());
    let uncycledTerritoryMap = JSON.parse(stringMapDesign);

    return this.http.put<TerritoryMap>(`${MapDesignService.url}territoryMap`,uncycledTerritoryMap);
  }

  deleteTerritoryMap(territoryNumber:string):Observable<MapDesign> {
    return this.http.delete<MapDesign>(`${MapDesignService.url}territoryMap/${territoryNumber}`);
  }

  exportKml():Observable<void> {
    return this.http.get<any>(`${MapDesignService.url}exportKml`);
  }

  importStreetNames():Observable<void> {
    return this.http.get<any>(`${MapDesignService.url}importStreetNames`);
  }

  setActiveTerritory(territoryNumber:string,name:string):Observable<MapDesign> {
    return this.http.get<MapDesign>(`${MapDesignService.url}setActiveTerritory/${territoryNumber}/${name}`);
  }

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key:any, value:any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
}
