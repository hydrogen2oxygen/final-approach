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
  ftpPassword = new FormControl('');
  ftpHost = new FormControl('');
  ftpPort = new FormControl('');
  knownHosts = new FormControl('');
  rootPath = new FormControl('');
  httpHost = new FormControl('');

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe( s => {
      this.settings = s;
      if (this.settings != null) {
        // @ts-ignore
        this.ftpUser.setValue(s.settings['ftp.user']);
        // @ts-ignore
        this.ftpPassword.setValue(s.settings['ftp.password']);
        // @ts-ignore
        this.ftpHost.setValue(s.settings['ftp.host']);
        // @ts-ignore
        this.ftpPort.setValue(s.settings['ftp.port']);
        // @ts-ignore
        this.knownHosts.setValue(s.settings['ftp.knownHosts']);
        // @ts-ignore
        this.rootPath.setValue(s.settings['ftp.rootPath']);
        // @ts-ignore
        this.httpHost.setValue(s.settings['ftp.httpHost']);
      }
    });
  }

  public save():void {
    if (this.settings != null) {
      // @ts-ignore
      this.settings.settings['ftp.user'] = this.ftpUser.value;
      // @ts-ignore
      this.settings.settings['ftp.password'] = this.ftpPassword.value;
      // @ts-ignore
      this.settings.settings['ftp.host'] = this.ftpHost.value;
      // @ts-ignore
      this.settings.settings['ftp.port'] = this.ftpPort.value;
      // @ts-ignore
      this.settings.settings['ftp.knownHosts'] = this.knownHosts.value;
      // @ts-ignore
      this.settings.settings['ftp.rootPath'] = this.rootPath.value;
      // @ts-ignore
      this.settings.settings['ftp.httpHost'] = this.httpHost.value;
      this.settingsService.saveSettings(this.settings).subscribe(s => this.settings = s);
    }
  }
}
