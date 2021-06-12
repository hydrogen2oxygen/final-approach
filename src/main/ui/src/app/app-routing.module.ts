import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TerritoriesOverviewComponent} from "./components/territories-overview/territories-overview.component";
import {MapsCollectionComponent} from "./components/maps-collection/maps-collection.component";
import {DesignerComponent} from "./components/designer/designer.component";

const routes: Routes = [
  { path: 'home', component: TerritoriesOverviewComponent },
  { path: 'maps', component: MapsCollectionComponent },
  { path: 'designer', component: DesignerComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
