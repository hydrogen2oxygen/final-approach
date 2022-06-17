import {Component, OnInit} from '@angular/core';
import {Congregation, Preacher, RegistryEntry, Territory} from "../../domains/Congregation";
import {CongregationService} from "../../services/congregation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TerritoryDetailComponent} from "../territory-detail/territory-detail.component";
import {environment} from "../../../environments/environment";
import {ManageGroupMemberComponent} from "../manage-group-member/manage-group-member.component";
import {FormControl} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {SettingsService} from "../../services/settings.service";
import {Settings} from "../../domains/Settings";

@Component({
  selector: 'app-territories-overview',
  templateUrl: './territories-overview.component.html',
  styleUrls: ['./territories-overview.component.scss']
})
export class TerritoriesOverviewComponent implements OnInit {

  imageUrlBase = `${environment.serverUrl}/congregation/image/`;
  congregation: Congregation = new Congregation();
  lastRegistryEntries: RegistryEntry[] = [];
  archivedTerritories: Territory[] = [];
  territoriesWithoutContacts:number = 0;
  preacherWithoutTerritories:number = 0;

  fourMonths: Date = new Date();
  eightMonths: Date = new Date();
  twelveMonths: Date = new Date();
  datepipe: DatePipe = new DatePipe('en-US');

  newPreacherName = new FormControl('');
  showNamesInTerritoryButton:boolean = false;
  searchText: string = '';
  searchResult:string[] = [];
  settings:Settings|null = null;

  constructor(
    private congregationService: CongregationService,
    private settingsService:SettingsService,
    private modalService: NgbModal,
    private toastr:ToastrService
  ) {
  }

  ngOnInit(): void {

    this.settingsService.getSettings().subscribe( s => {
      console.log(s);
      this.settings = s;
    });
    this.fourMonths.setMonth(this.fourMonths.getMonth() - 4);
    this.eightMonths.setMonth(this.eightMonths.getMonth() - 8);
    this.twelveMonths.setMonth(this.twelveMonths.getMonth() - 12);

    this.loadCongregationData();
  }

  private loadCongregationData() {
    this.congregationService.getCongregation().subscribe(c => {
      this.congregation = c;
      this.collectLastRegistryEntries();
    });
  }

  collectLastRegistryEntries() {

    this.lastRegistryEntries = [];
    this.archivedTerritories = [];

    this.preacherWithoutTerritories = this.congregation.preacherList.length;
    this.congregation.preacherList.forEach(p => {
      if (p.territoryListNumbers.length == 0) this.preacherWithoutTerritories -= 1;
    });

    this.congregation.territoryList.forEach(t => {

      if (t.archive) {
        this.archivedTerritories.push(t);
        return;
      }
      if (t.registryEntryList == null || t.registryEntryList.length == 0) return;

      let registryEntry = t.registryEntryList[t.registryEntryList.length - 1];
      registryEntry.territoryName = t.name;
      registryEntry.territory = t; // just a reference, this will not be persisted
      this.lastRegistryEntries.push(registryEntry);

      if (registryEntry.territory.noContacts) this.territoriesWithoutContacts += 1;
    });

    this.lastRegistryEntries.sort((a: RegistryEntry, b: RegistryEntry) => {
      if (a.assignDate < b.assignDate) return -1;
      if (a.assignDate > b.assignDate) return 1;
      return 0;
    });

    console.log(this.lastRegistryEntries)
  }

  openTerritoryByNumber(territoryNumber: string) {
    this.congregation.territoryList.forEach(territory => {
      if (territory.number == territoryNumber) {
        this.openTerritory(territory);
        return;
      }
    })
  }

  openTerritory(territory: Territory) {

    const modalRef = this.modalService.open(TerritoryDetailComponent);
    modalRef.componentInstance.territory = territory;
    modalRef.componentInstance.preacherList = this.congregation.preacherList;
    modalRef.componentInstance.noContacts.setValue(territory.noContacts);
    modalRef.componentInstance.intoArchive.setValue(territory.archive);
    modalRef.componentInstance.url.setValue(territory.url);

    modalRef.closed.subscribe(e => {
      if (e != 'Close click') return;

      // SAVE TERRITORY
      territory.noContacts = modalRef.componentInstance.noContacts.value;
      territory.archive = modalRef.componentInstance.intoArchive.value;

      this.congregationService.saveCongregation(this.congregation).subscribe(c => {
        this.congregation = c;
        this.collectLastRegistryEntries();

        if (modalRef.componentInstance.territory.newPreacherAssigned) {
          this.congregationService.exportTerritoryData(territory.number).subscribe( e => {
            this.toastr.success("Territory online map exported!","Export Service");
            this.loadCongregationData();
          });
        }
      })
    });
  }

  openPreacher(preacher: Preacher) {
    preacher.showPreacherActions = !preacher.showPreacherActions;
  }

  deletePreacher(preacher: Preacher) {

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

  cssAccordingDate(assignDate: Date): string {

    let checkDate = new Date(assignDate);
    let css = '';

    if (checkDate < this.fourMonths) {
      css = 'olderFourMonths';
    }
    if (checkDate < this.eightMonths) {
      css = 'olderEightMonths';
    }
    if (checkDate < this.twelveMonths) {
      css = 'olderTwelveMonths';
    }

    return css;
  }

  addGroupMember(preacher: Preacher) {
    const modalRef = this.modalService.open(ManageGroupMemberComponent);
    modalRef.componentInstance.preacher = preacher;
    modalRef.componentInstance.preacherList = this.congregation.preacherList;

    modalRef.closed.subscribe(e => {

      console.log(e);
      if (e != 'Close click') return;

      this.congregationService.saveCongregation(this.congregation).subscribe(c => {
        this.congregation = c;
        this.collectLastRegistryEntries();
      })
    });
  }

  addNewPreacher() {

    if (this.newPreacherName.value == null || this.newPreacherName.value.length == 0) return;

    let newPreacher: Preacher = new Preacher();
    newPreacher.name = this.newPreacherName.value;
    this.congregation.preacherList.push(newPreacher);

    this.congregationService.saveCongregation(this.congregation).subscribe(c => {
      this.congregation = c;
      this.collectLastRegistryEntries();
    });
  }

  cssAccordingPreacher(preacher: Preacher): string {

    let css = 'btn btn-primary btn-sm buttonPreacher ';

    if (preacher.group.length > 0) {
      css += 'buttonPreacherGroupLeader';
    } else if (preacher.territoryListNumbers.length > 0 && !preacher.softdelete) {
      css += 'buttonPreacherWithTerritories';
    }

    if (preacher.softdelete) css += 'buttonPreacherDeleted';

    return css;
  }

  cssAccordingRegistryEntry(registryEntry: RegistryEntry) {
    let css = 'btn btn-primary btn-sm buttonTerritory';

    if (registryEntry.preacher.name == 'Congregazione' && registryEntry.territory.noContacts) {
      css += ' inCongregationEmpty';
    } else if (registryEntry.preacher.name == 'Congregazione' && !registryEntry.territory.noContacts) {
      css += ' inCongregation';
    } else if (registryEntry.territory.noContacts) {
      css += ' buttonTerritoryEmpty';
    }

    return css;
  }

  getCurrentTimeStamp() {
    return Math.floor(Date.now() / 1000)
  }

  copyMessage(val: string){
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

  getWhatsAppMessage(preacher: Preacher) {

    let message = '=============================\n'
      + preacher.name
      + ' ( '+ this.datepipe.transform(new Date(), 'dd.MM.yyyy')
      + ' ),\nuna lista dei tuoi territori online:\n\n';

    preacher.territoryListNumbers.forEach(territoryNumber => {

      let territory: Territory | undefined = this.getTerritoryByNumber(territoryNumber);

      if (territory != undefined && territory.uuid != undefined) {

        let assignDate:Date|undefined = this.getAssignDateFromTerritory(territory);
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

        territory.notes.forEach( note => {
          message += note + '\n';
        });

        message += '\n';
      }

    });

    message += '\n=============================';

    this.copyMessage(message);
  }

  getAssignDateFromTerritory(territory: Territory):Date|undefined {

    if (territory.registryEntryList.length == 0) return undefined;

    return territory.registryEntryList[territory.registryEntryList.length - 1].assignDate;
  }

  getTerritoryByNumber(number: string): Territory | undefined {

    let territory: Territory | undefined = undefined;

    this.congregation.territoryList.forEach(t => {
      if (t.number == number) territory = t;
    });

    return territory;
  }

  toggleNamesForTerritoryButtons() {
    this.showNamesInTerritoryButton = !this.showNamesInTerritoryButton;
  }

  searchTextChanged($event: any) {

    let searchText = $event.originalTarget.value;
    if ($event.key.length == 1) {
      searchText = searchText + $event.key;
    }

    searchText = searchText.toLowerCase()

    if (searchText.length < 3) {
      this.searchResult = [];
      return;
    }

    this.congregationService.search(searchText).subscribe( result => {
      console.log(result);
      this.searchResult = result;
    })

  }
}
