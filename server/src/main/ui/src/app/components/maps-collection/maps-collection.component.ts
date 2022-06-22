import {Component, Input, OnInit} from '@angular/core';
import {Congregation, Territory} from "../../domains/Congregation";
import {CongregationService} from "../../services/congregation.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-maps-collection',
  templateUrl: './maps-collection.component.html',
  styleUrls: ['./maps-collection.component.scss']
})
export class MapsCollectionComponent implements OnInit {

  imageUrlBase = `${environment.serverUrl}/congregation/territoryImage/`;
  congregation:Congregation = new Congregation();

  constructor(private congregationService:CongregationService) { }

  ngOnInit(): void {
    this.congregationService.getCongregation().subscribe( c => {
      this.congregation = c;
    });
  }

}
