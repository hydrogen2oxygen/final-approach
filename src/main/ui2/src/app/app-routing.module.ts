import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TerritoriesOverviewComponent} from "../../../ui/src/app/components/territories-overview/territories-overview.component";
import {MapsCollectionComponent} from "../../../ui/src/app/components/maps-collection/maps-collection.component";
import {DesignerComponent} from "../../../ui/src/app/components/designer/designer.component";
import {UtilitiesComponent} from "../../../ui/src/app/components/utilities/utilities.component";
import {SettingsComponent} from "../../../ui/src/app/components/settings/settings.component";

const routes: Routes = [
  { path: 'home', component: TerritoriesOverviewComponent },
  { path: 'maps', component: MapsCollectionComponent },
  { path: 'designer', component: DesignerComponent },
  { path: 'utilities', component: UtilitiesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
