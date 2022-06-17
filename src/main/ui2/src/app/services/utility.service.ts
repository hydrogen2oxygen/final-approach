import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ImportPath} from "../domains/ImportPath";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public static url = `${environment.serverUrl}/utility/`;

  constructor(private http:HttpClient) { }

  importTerritoriesFromText(filePath:string|null):Observable<void> {
      let importPath = new ImportPath();
      if (filePath != null) {
        importPath.importPath = filePath;
      }
      return this.http.post<void>(`${UtilityService.url}importTerritoriesFromText`, importPath);
  }
}
