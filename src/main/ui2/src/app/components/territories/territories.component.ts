import { Component, OnInit } from '@angular/core';
import {CongregationService} from "../../services/congregation.service";
import {Congregation} from "../../domains/Congregation";

@Component({
  selector: 'app-territories',
  templateUrl: './territories.component.html',
  styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {

  congregation:Congregation = new Congregation();
  constructor(private congregationService:CongregationService) { }

  ngOnInit(): void {
    this.reloadCongregation();
  }

  private reloadCongregation() {
    this.congregationService.getCongregation().subscribe(c => this.congregation = c);
  }
}
