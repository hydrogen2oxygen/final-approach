import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapDesign} from "../domains/MapDesign";

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

    const getCircularReplacer = () => {
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

    let stringMapDesign = JSON.stringify(mapDesign, getCircularReplacer());
    let uncycledMapDesign = JSON.parse(stringMapDesign);

    return this.http.put<MapDesign>(`${MapDesignService.url}`,uncycledMapDesign);
  }

  deleteTerritoryMap(territoryNumber:number):Observable<any> {
    return this.http.delete<any>(`${MapDesignService.url}territoryMap/${territoryNumber}`);
  }

  exportKml():Observable<void> {
    return this.http.get<any>(`${MapDesignService.url}exportKml`);
  }

  importStreetNames():Observable<void> {
    return this.http.get<any>(`${MapDesignService.url}importStreetNames`);
  }

  setActiveTerritory(territoryNumber:string,name:string):Observable<void> {
    return this.http.get<any>(`${MapDesignService.url}setActiveTerritory/${territoryNumber}/${name}`);
  }
}
