import { Component } from '@angular/core';
import {CongregationService} from "../../../../../ui/src/app/services/congregation.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  printingInProgress = '';
  exportInProgress = '';

  constructor(
    private congregationService:CongregationService,
    private toastr: ToastrService
  ) { }

  exportPDF() {
    this.printingInProgress = ' ... in progress ...'

    this.congregationService.printCongregation().subscribe( v => {
      this.printingInProgress = '';
      this.toastr.info("Congregation PDF generated!","Print Service")
    })
  }

  exportDatabase() {
    this.exportInProgress = ' ... in progress ...';

    this.congregationService.exportDatabase().subscribe( v => {
      this.exportInProgress = '';
      this.toastr.info("Congregation data exported!","Export Service")
    })
  }

  exportTerritoryData() {
    this.congregationService.exportTerritoryData().subscribe( v => {
      this.toastr.info("Territory data exported!","Export Service")
    })
  }

  repairMaps() {
    this.congregationService.repairExports().subscribe( e => {
      this.toastr.info("Territory Maps repaired!","Export Service")
    })
  }

  exportAllTerritoryData() {
    this.congregationService.exportAllTerritoryData().subscribe( v => {
      this.toastr.info("All territory data exported!","Export Service")
    })
  }
}
