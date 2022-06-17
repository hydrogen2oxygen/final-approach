import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

  @Input() importPath = new FormControl('');

  constructor(private utilityService:UtilityService) { }

  ngOnInit(): void {
  }

  import() {
    this.utilityService.importTerritoriesFromText(this.importPath.value).subscribe( (result: any) => {
      console.log(result);
    })
  }
}
