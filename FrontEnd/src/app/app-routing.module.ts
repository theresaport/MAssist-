import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { TitleListComponent } from './title-list/title-list.component';
import { CreateTitleComponent } from './create-title/create-title.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TitleInfoComponent } from '../app/title-info/title-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'element', component: CreateTitleComponent },
  { path: 'titleList', component: TitleListComponent }, //dashboard
  // { path: 'title', component: TitleComponent },
  { path: 'titleInfo/:Id', component: TitleInfoComponent },
  { path: '', redirectTo: '/titleList', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
