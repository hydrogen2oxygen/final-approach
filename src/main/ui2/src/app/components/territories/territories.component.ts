import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CongregationService} from "../../services/congregation.service";
import {Congregation, Territory} from "../../domains/Congregation";
import {FormControl} from "@angular/forms";
import {Preacher, RegistryEntry} from "../../../../../ui/src/app/domains/Congregation";
import {ToastrService} from "ngx-toastr";
import {Message} from "../../domains/Message";

@Component({
  selector: 'app-territories',
  templateUrl: './territories.component.html',
  styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {

  congregation: Congregation = new Congregation();
  territory: Territory | null = null;
  preacherList: Preacher[] = [];
  selectedPreacher: any = null;
  keyword: string = "name";

  @Input() noContacts = new FormControl(false);
  @Input() intoArchive = new FormControl(false);
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
  }

  onChangeSearch($event: any) {
  }

  onFocused($event: any) {
  }

  saveTerritory() {

    if (this.territory != null && this.intoArchive.value != null) {
      this.territory.archive = this.intoArchive.value;
    }

    if (this.territory != null && this.noContacts.value != null) {
      this.territory.noContacts = this.noContacts.value;
    }

    this.congregationService.saveCongregation(this.congregation).subscribe((c: Congregation) => {
      this.congregation = c;
      this.preacherList = c.preacherList;

      if (this.territory == null) return;

      if (this.territory.newPreacherAssigned) {

        console.log("Trying to export territory " + this.territory.number)
        let that = this;

        this.congregationService.exportTerritoryData(this.territory.number).subscribe({
          next(m) {
            console.log(m.msg);
            that.toastr.success(m.msg, "Export Service");
          },
          error(err) {
            console.error(err.message);
            that.toastr.error(err.message, "Error trying to export territory")
          }
        });
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
}
