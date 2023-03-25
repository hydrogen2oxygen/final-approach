import {Component} from '@angular/core';
import {Link} from "../../domains/Link";
import {ActivatedRoute, Router} from "@angular/router";
import {CongregationService} from "../../services/congregation.service";
import {Version} from "../../domains/Congregation";
import {NavigationService} from "../../services/navigation.service";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TERRITORIES';
  links: Link[] = this.getLinks();
  version: Version|null = null;
  internetOffline:boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private congregationService:CongregationService,
    private navigationService:NavigationService,
    private settingsService:SettingsService
  ) {
    let currentUrl = window.location.href;
    currentUrl = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    this.activateCurrentLink(currentUrl);
    this.checkVersion();

    this.navigationService.navigate.subscribe( (url:string) => {
      this.navigate(url);
    });

    this.settingsService.isInternetAvailable().subscribe( result => {
      let strResult:string = result.toString();
      if (strResult == "true") {
        this.internetOffline = false;
      } else {
        this.internetOffline = true;
      }

    })
  }

  checkVersion() {
    this.congregationService.version().subscribe(
        (v: Version | null) => this.version = v,
      () => this.version = null);
    setTimeout(() => {
      this.checkVersion();
    }, 5000);
  }

  navigate(navigationPath: string) {
    this.activateCurrentLink(navigationPath);
    this.router.navigate([navigationPath], {relativeTo: this.route});
  }

  private getLinks():Link[] {
    return [
      new Link("TERRITORIES", true),
      new Link("PREACHERS"),
      new Link("DESIGNER"),
      new Link("UTILS"),
      new Link("SETTINGS"),
      new Link("BACKUPS"),
      new Link("VIDEOS")
    ]
  }

  private activateCurrentLink(navigationPath?: string) {

    if (navigationPath?.length === 0) {
      navigationPath = 'TERRITORIES';
    }

    this.links.forEach(link => {
      link.active = false;

      if (link.title === navigationPath) {
        link.active = true;
      }
    });
  }
}
