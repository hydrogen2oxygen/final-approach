import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {

  constructor() { }

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
}
