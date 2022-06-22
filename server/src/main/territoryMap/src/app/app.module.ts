import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from "@angular/common/http";
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import {ReactiveFormsModule} from "@angular/forms";
import { StreetsOverviewComponent } from './components/streets-overview/streets-overview.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StreetsOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxBootstrapIconsModule.forRoot(allIcons),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
