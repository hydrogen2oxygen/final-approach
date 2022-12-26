import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Dashboard} from "../../domains/Dashboard";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard:Dashboard = new Dashboard();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['id'])
      if (params['id']) {
        this.dataService.loadDashboardData(params['id']).subscribe( d => this.dashboard = d );
      }
    });
  }

}
