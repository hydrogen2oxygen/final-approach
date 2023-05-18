import {Component, OnInit} from '@angular/core';
import {CongregationService} from "../../services/congregation.service";
import {Congregation, Preacher, RegistryEntry, Territory} from "../../domains/Congregation";
import {FormControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-territories',
  templateUrl: './territories.component.html',
  styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {

  loading:boolean=false;
  congregation: Congregation = new Congregation();
  territory: Territory | null = null;
  preacherList: Preacher[] = [];
  selectedPreacher: any = null;
  keyword: string = "name";

  noContacts = new FormControl(false);
  intoArchive = new FormControl(false);
  note = new FormControl('');

  constructor(
    private congregationService: CongregationService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.reloadCongregation();
  }

  private reloadCongregation() {
    this.congregationService.getCongregation().subscribe((c: Congregation) => {
      this.congregation = c;
      this.preacherList = c.preacherList;
    });
  }

  showTerritoryDetails(territory: Territory) {
    console.log(territory)
    this.territory = territory;
    this.intoArchive.setValue(territory.archive);
    this.noContacts.setValue(territory.noContacts);
  }

  addNote() {
    if (this.territory == null || this.note.value == null) return;

    this.territory.notes.push(this.note.value);
    this.note.setValue('');
  }

  removeNote(note: string) {
    if (this.territory == null) return;

    let newNotes: string[] = [];

    this.territory.notes.forEach(n => {
      if (n != note) newNotes.push(n);
    });

    this.territory.notes = newNotes;
  }

  selectEvent(selectedPreacher: Preacher) {

    if (this.territory == null) {
      console.error('territory object is null');
      return;
    }

    if (this.territory.registryEntryList.length > 0) {
      let lastEntry = this.territory.registryEntryList[this.territory.registryEntryList.length - 1];
      lastEntry.returnDate = new Date();
    }

    let copyOfPreacher = new Preacher();
    copyOfPreacher.name = selectedPreacher.name;

    let registryEntry: RegistryEntry = new RegistryEntry();
    registryEntry.territoryName = this.territory.name;
    registryEntry.territoryNumber = this.territory.number;
    registryEntry.preacher = copyOfPreacher;
    registryEntry.returnDate = null;
    this.territory.registryEntryList.push(registryEntry);
    this.territory.newPreacherAssigned = true;
    this.congregation.protocol.push(new Date().toLocaleString() + " - Territory " + this.territory.number + " - " + this.territory.name + " assigned to " + copyOfPreacher.name);
    if (this.congregation.protocol.length > 50) {
      this.congregation.protocol.shift();
    }
    console.log("New preacher assigned to territory " + this.territory.number + " " + copyOfPreacher.name)
  }

  onChangeSearch($event: any) {
  }

  onFocused($event: any) {
  }

  saveTerritory() {

    this.loading = true;

    if (this.territory != null && this.intoArchive.value != null) {
      this.territory.archive = this.intoArchive.value;
    }

    if (this.territory != null && this.noContacts.value != null) {
      this.territory.noContacts = this.noContacts.value;
    }

    this.congregationService.saveCongregation(this.congregation).subscribe((c: Congregation) => {
      this.congregation = c;
      this.preacherList = c.preacherList;
      this.loading = false;
      if (this.territory == null) return;

      if (this.territory.newPreacherAssigned) {
        this.toastr.success('Territory ' + this.territory.number + " " + this.territory.name
          + " exported successfully for "
          + this.territory.registryEntryList[this.territory.registryEntryList.length -1].preacher.name, "Export Service");
      }

      this.territory = null;
    })
  }

  deleteTerritory(number: string) {
    this.congregationService.deleteTerritory(number).subscribe((c: Congregation) => {
      this.congregation = c;
      this.preacherList = c.preacherList;
      this.territory = null;
    });
  }

  repairTerritory(territory: Territory) {
    this.congregationService.exportTerritoryData(territory.number,true).subscribe( () => {
      this.toastr.info('Territory repaired','Export Service')
    });
  }

  printPDF() {
    this.congregationService.printCongregation().subscribe( () => {
      this.toastr.success("S-16 was created inside root folder!","PDF PRINT SERVICE")
    });
  }

  registerTerritory(territory: Territory) {
    this.congregationService.registerTerritory(territory.number).subscribe( () => {
      this.toastr.info('Territory registered!','Territory Service')
    });
  }
}
