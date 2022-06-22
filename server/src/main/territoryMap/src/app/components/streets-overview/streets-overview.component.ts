import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OsmStreet, TerritoryData} from "../../domains/TerritoryData";
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-streets-overview',
  templateUrl: './streets-overview.component.html',
  styleUrls: ['./streets-overview.component.scss']
})
export class StreetsOverviewComponent implements OnInit {

  @Input() territoryData:TerritoryData = new TerritoryData(undefined);
  today:Date = new Date();
  territoryGreenPercent: number = 15;
  territoryBluePercent: number|undefined = 15;
  territoryYellowPercent: number|undefined = undefined;
  territoryRedPercent: number|undefined = undefined;
  dateBlue:Date|undefined;
  dateYellow:Date|undefined;
  dateRed:Date|undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private local: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  calculateDate() {

    // TEST
    //let newDate = new Date(this.today.setMonth(this.today.getMonth()+12));
    //console.log(newDate.getTime());
    //this.today = newDate;
    // @ts-ignore
    let difference = this.today - this.territoryData?.assignDate;
    let months = difference / 1000 / 60 / 60 / 24 / 30;

    // after a month blue = 15 (30) - 50%
    this.territoryBluePercent = 15 + (20 / 4 * months);
    if (this.territoryBluePercent > 35) {
      this.territoryBluePercent = 35;
    }
    this.dateBlue = this.today;

    // four months => yellow = 50 - 80%
    if (months > 4) {
      this.territoryYellowPercent = 15 + (15 / 8 * months);
      if (this.territoryYellowPercent > 35) {
        this.territoryYellowPercent = 30;
      }
      this.dateBlue = undefined;
      this.dateYellow = this.today;
    }
    // after a year => red = 80 - 100%
    if (months > 12) {
      this.territoryRedPercent = 20;
      this.dateYellow = undefined;
      this.dateRed = this.today;
    }
  }

  checkBoxStreet(street: OsmStreet) {
    street.checked = !street.checked;
    this.local.set(this.territoryData.number + ' ' + street.streetName, street.checked);
  }

  checkBoxHousenumber(street: OsmStreet, streetAndHouseNumber: string) {

    let value:boolean = this.local.get(streetAndHouseNumber);

    if (value == null) {
      value = false;
    }

    value = !value;

    this.local.set(streetAndHouseNumber, value);

    if (!street.checked) {
      if (this.allStreetHouseNumbersChecked(street)) {
        this.checkBoxStreet(street);
      }
    }
  }

  allStreetHouseNumbersChecked(street:OsmStreet):boolean {
    let allChecked = true;

    for (let i=0; i<street.houseNumbers.length; i++) {

      let value:boolean = this.local.get(this.territoryData.number + ' ' + street.streetName + ' ' + street.houseNumbers[i]);

      if (!value) {
        allChecked = false;
        console.log("all checked")
      }
    }

    console.log(allChecked)
    return allChecked;
  }

  getStreetRowClass(street: OsmStreet):string {
    if (street.checked) {
      return 'table-success';
    }

    return '';
  }

  getStreetHouseClass(streetAndHouseNumber: string) {
    let value:boolean = this.local.get(streetAndHouseNumber);

    if (value == null) {
      value = false;
    }

    if (value) {
      return 'badge btn-success text-dark btn-sm';
    }

    return 'badge bg-dark text-light btn-sm';
  }
}
