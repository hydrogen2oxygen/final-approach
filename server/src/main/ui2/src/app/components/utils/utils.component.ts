import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {UtilityService} from "../../services/utility.service";
import {MapDesignService} from "../../services/map-design.service";

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {

  constructor(
    private utilityService:UtilityService,
    private mapDesignService:MapDesignService
  ) { }

  ngOnInit(): void {
  }

  refresh() {
    if(environment.production) {
      const form = document.createElement('form');
      form.method = "GET";
      form.action = location.href;
      document.body.appendChild(form);
      form.submit();
    } else {
      window.location.reload();
    }
  }

  uploadTerritoryMapUI() {
    this.utilityService.uploadTerritoryMapApplication().subscribe( result => {
      console.log(result);
    })
  }

  downloadMapDesign() {
    this.mapDesignService.downloadMapDesign().subscribe( ()=> {
      console.log("done")
    })
  }
}
