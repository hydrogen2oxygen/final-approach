import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { TerritoriesComponent } from './components/territories/territories.component';
import { PreachersComponent } from './components/preachers/preachers.component';
import { DesignerComponent } from './components/designer/designer.component';
import { UtilsComponent } from './components/utils/utils.component';
import { SettingsComponent } from './components/settings/settings.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {allIcons, NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import { BackupComponent } from './components/backup/backup.component';

@NgModule({
  declarations: [
    AppComponent,
    TerritoriesComponent,
    PreachersComponent,
    DesignerComponent,
    UtilsComponent,
    SettingsComponent,
    BackupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgxBootstrapIconsModule.pick(allIcons),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    CommonModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
