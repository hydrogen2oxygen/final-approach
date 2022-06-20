import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Congregation, Preacher, Territory} from "../../domains/Congregation";
import {CongregationService} from "../../services/congregation.service";
import {ToastrService} from "ngx-toastr";
import {FormControl} from "@angular/forms";
import {DatePipe, formatDate} from "@angular/common";
import {Settings} from "../../domains/Settings";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-preachers',
  templateUrl: './preachers.component.html',
  styleUrls: ['./preachers.component.scss']
})
export class PreachersComponent implements OnInit {

  congregation: Congregation = new Congregation();
  preacher: Preacher | null = null;
  settings: Settings | null = null;
  newPreacherName = new FormControl('');
  datepipe: DatePipe = new DatePipe('en-US');

  constructor(
    private congregationService: CongregationService,
    private settingsService: SettingsService,
    private toastr: ToastrService,
    @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.reloadCongregation();
  }

  private reloadCongregation() {
    this.congregationService.getCongregation().subscribe((c: Congregation) => {
      this.congregation = c;
    });
  }

  saveNewPreacher() {
    let preacherName = this.newPreacherName.value;
    this.newPreacherName.setValue('');

    if (preacherName == null || preacherName.length == 0) return;

    if (this.congregation.preacherList.find(p => p.name === preacherName)) {
      this.toastr.warning(preacherName + " already exists!", "Data Service");
      return;
    }

    let newPreacher: Preacher = new Preacher();
    newPreacher.name = preacherName;
    this.congregation.preacherList.push(newPreacher);

    this.congregationService.saveCongregation(this.congregation).subscribe((c: Congregation) => {
      this.toastr.success(preacherName + " saved as a new preacher", "Data Service")
    });
  }

  openTerritoryByNumber(territoryNumber: string) {

  }

  getWhatsAppMessage(preacher: Preacher) {
    let message = '=============================\n'
      + preacher.name
      + ' ( ' + this.datepipe.transform(new Date(), 'dd.MM.yyyy')
      + ' ),\nuna lista dei tuoi territori online:\n\n';

    preacher.territoryListNumbers.forEach(territoryNumber => {

      let territory: Territory | undefined = this.getTerritoryByNumber(territoryNumber);

      if (territory != undefined && territory.uuid != undefined) {

        let assignDate: Date | undefined = this.getAssignDateFromTerritory(territory);
        let formattedDate = this.datepipe.transform(assignDate, 'dd.MM.yyyy')

        message += territory.number + ' - ' + territory.name + ' (' + formattedDate + ')\n';

        if (this.settings != null) {
          // @ts-ignore
          let host = this.settings.settings['ftp.httpHost'];
          message += host + '?id=' + territory.uuid + '\n';
        }

        if (territory.notes.length > 0) {
          message += 'NOTE:\n'
        }

        territory.notes.forEach(note => {
          message += note + '\n';
        });

        message += '\n';
      }

    });

    message += '\n=============================';

    this.copyMessage(message);
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getAssignDateFromTerritory(territory: Territory): Date | undefined {

    if (territory.registryEntryList.length == 0) return undefined;

    return territory.registryEntryList[territory.registryEntryList.length - 1].assignDate;
  }

  deletePreacher(preacher: Preacher) {

    if (preacher.name === "Congregazione") return;

    if (!preacher.harddelete) {
      preacher.softdelete = !preacher.softdelete;
    }

    preacher.showPreacherActions = false;

    let i = 0;

    this.congregation.preacherList.forEach(p => {
      if (p.name == preacher.name) {
        this.congregation.preacherList[i] = preacher;
        console.log('update done');
      }
      i++;
    });

    console.log(this.congregation.preacherList);
    this.congregationService.saveCongregation(this.congregation).subscribe(c => this.congregation = c)
  }

  harddeletePreacher(preacher: Preacher) {
    preacher.harddelete = true;
    this.deletePreacher(preacher);
  }

  openPreacher(preacher: Preacher) {
    this.preacher = preacher;
  }

  returnTerritoryByNumber(territoryNumber: string) {

  }

  getTerritoryNameAndDetails(territoryNumber:string):string {

    let territory = this.getTerritoryByNumber(territoryNumber);

    if (territory) {
      let date = formatDate(Date.now(),'dd-MM-yy',this.locale);
      return `${territory.name} (${date})`;
    }
    return "nee";
  }

  getTerritoryByNumber(territoryNumber: string): Territory | undefined {
    let territoryList: Territory[] = [];
    territoryList = territoryList.concat(this.congregation.territoriesAssigned);
    territoryList = territoryList.concat(this.congregation.territoriesOlder4Months);
    territoryList = territoryList.concat(this.congregation.territoriesOlder8Months);
    territoryList = territoryList.concat(this.congregation.territoriesNoContacts);
    territoryList = territoryList.concat(this.congregation.territoriesToBeAssigned);
    return territoryList.find(t => t.number === territoryNumber);
  }

  cssAccordingToTerritory(territoryNumber:string):string {
    let territory = this.getTerritoryByNumber(territoryNumber);

    if (territory) {

    }

    return ""
  }
}
