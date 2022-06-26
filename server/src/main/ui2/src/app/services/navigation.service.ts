import {Injectable, Output} from '@angular/core';
import {EventEmitter} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navigate:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
