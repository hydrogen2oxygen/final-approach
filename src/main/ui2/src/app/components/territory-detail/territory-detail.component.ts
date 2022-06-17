import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Preacher, RegistryEntry, Territory} from "../../domains/Congregation";
import {FormControl} from "@angular/forms";
import {CongregationService} from "../../services/congregation.service";

@Component({
  selector: 'app-territory-detail',
  templateUrl: './territory-detail.component.html',
  styleUrls: ['./territory-detail.component.scss']
})
export class TerritoryDetailComponent implements OnInit {

  @Input() territory:Territory = new Territory();
  @Input() preacherList:Preacher[] = [];
  @Input() noContacts = new FormControl(false);
  @Input() intoArchive = new FormControl(false);
  @Input() url = new FormControl('');
  selectedPreacher:any = null;
  keyword: string = "name";
  note = new FormControl('');

  constructor(
    public activeModal: NgbActiveModal,
    private congregationService: CongregationService
  ) { }

  ngOnInit(): void {

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

    let registryEntry:RegistryEntry = new RegistryEntry();
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

  addNote() {
    if (this.note.value != null) {
      this.territory.notes.push(this.note.value);
    }
    this.note.setValue('');
  }

  removeNote(note: string) {
    let newNotes:string[] = [];

    this.territory.notes.forEach( n => {
      if (n != note) newNotes.push(n);
    });

    this.territory.notes = newNotes;
  }

  setUrl() {
    this.territory.url = this.url.value;
  }

  exportTerritoryMap(territory: Territory) {
    this.congregationService.exportTerritoryData(territory.number).subscribe(e => {
    })
  }
}
