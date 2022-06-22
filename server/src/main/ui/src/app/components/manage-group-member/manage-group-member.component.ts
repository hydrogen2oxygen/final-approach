import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Preacher} from "../../domains/Congregation";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-manage-group-member',
  templateUrl: './manage-group-member.component.html',
  styleUrls: ['./manage-group-member.component.scss']
})
export class ManageGroupMemberComponent implements OnInit {

  @Input() preacherList:Preacher[] = [];
  selectedPreacher:any = null;
  keyword: string = "name";
  preacher:Preacher = new Preacher();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  selectEvent(selectedPreacher: Preacher) {
    this.selectedPreacher = selectedPreacher;
  }

  onChangeSearch($event: any) {

  }

  onFocused($event: void) {

  }

  addPreacher() {

    if (this.selectedPreacher == null) return;
    this.preacher.group.push(this.selectedPreacher.name);
  }
}
