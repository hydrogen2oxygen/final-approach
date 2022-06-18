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
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AutocompleteLibModule} from "angular-ng-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    TerritoriesComponent,
    PreachersComponent,
    DesignerComponent,
    UtilsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
