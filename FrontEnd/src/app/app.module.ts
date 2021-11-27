import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { CreateTitleComponent } from './create-title/create-title.component';
import { TitleListComponent } from './title-list/title-list.component';
import { TitleInfoComponent } from './title-info/title-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from './../material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMarketMaterialComponent } from './market-material/add-market-material.component';
import { MarketMaterialAssignmentComponent } from './market-material-assignment/market-material-assignment.component';
import { MarketAssignmentComponent } from './market-assignment/market-assignment.component';
import { MarketMaterialListComponent } from './market-material-list/market-material-list.component';
import { MarketerListComponent } from './marketer-list/marketer-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertDialogComponent } from './alter-dialog/alert-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { AddAnalystComponent } from './market-analyst/add-analyst.component';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTitleComponent,
    TitleListComponent,
    TitleInfoComponent,
    PageNotFoundComponent,
    DashboardComponent,
    AddAnalystComponent,
    MarketMaterialAssignmentComponent,
    MarketAssignmentComponent,
    MarketMaterialListComponent,
    MarketerListComponent,
    AddMarketMaterialComponent,
    AlertDialogComponent,
    AddAnalystComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
