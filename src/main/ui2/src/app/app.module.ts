import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TerritoriesOverviewComponent} from './components/territories-overview/territories-overview.component';
import {HttpClientModule} from "@angular/common/http";
import {TerritoryDetailComponent} from './components/territory-detail/territory-detail.component';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {ManageGroupMemberComponent} from './components/manage-group-member/manage-group-member.component';
import {MapsCollectionComponent} from './components/maps-collection/maps-collection.component';
import {NgxBootstrapIconsModule, allIcons} from 'ngx-bootstrap-icons';
import {DesignerComponent} from './components/designer/designer.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SettingsComponent } from './components/settings/settings.component';
import { UtilitiesComponent } from './components/utilities/utilities.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TerritoriesOverviewComponent,
    TerritoryDetailComponent,
    ManageGroupMemberComponent,
    MapsCollectionComponent,
    DesignerComponent,
    SettingsComponent,
    UtilitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //NgbModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
