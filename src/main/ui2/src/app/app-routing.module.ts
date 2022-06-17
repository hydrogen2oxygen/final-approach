import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TerritoriesComponent} from "./components/territories/territories.component";
import {PreachersComponent} from "./components/preachers/preachers.component";
import {DesignerComponent} from "./components/designer/designer.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UtilsComponent} from "./components/utils/utils.component";

const routes: Routes = [
  {path: '', redirectTo: 'TERRITORIES', pathMatch: 'full'},
  {path: 'TERRITORIES', component:TerritoriesComponent},
  {path: 'PREACHERS', component:PreachersComponent},
  {path: 'DESIGNER', component:DesignerComponent},
  {path: 'UTILS', component:UtilsComponent},
  {path: 'SETTINGS', component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
