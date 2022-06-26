import {Component} from '@angular/core';
import {Link} from "../../domains/Link";
import {ActivatedRoute, Router} from "@angular/router";
import {CongregationService} from "../../services/congregation.service";
import {Revision} from "../../domains/Congregation";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TERRITORIES';
  links: Link[] = this.getLinks();
  version: Revision|null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private congregationService:CongregationService,
    private navigationService:NavigationService
  ) {
    let currentUrl = window.location.href;
    currentUrl = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    this.activateCurrentLink(currentUrl);
    this.checkVersion();

    this.navigationService.navigate.subscribe( (url:string) => {
      this.navigate(url);
    });
  }

  checkVersion() {
    this.congregationService.version().subscribe(
      v => this.version = v,
      e => this.version = null);
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
      new Link("SETTINGS")
    ]
  }

  private activateCurrentLink(navigationPath?: string) {
    this.links.forEach(link => {
      link.active = false;

      if (link.title === navigationPath) {
        link.active = true;
      }
    });
  }
}
