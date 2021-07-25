import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {Settings} from "../../domains/Settings";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings:Settings|null = null;
  ftpUser = new FormControl('');

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe( s => {
      this.settings = s;
      if (this.settings != null) {
        // @ts-ignore
        this.ftpUser.setValue(s.settings['ftp.user']);
      }
    });
  }

  public save():void {
    if (this.settings != null) {
      this.settingsService.saveSettings(this.settings).subscribe(s => this.settings = s);
    }
  }
}
