import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';


import 'ag-grid-enterprise'
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=Softchoice LP (Toronto)_on_behalf_of_Mother Parkers Tea & Coffee Inc,LicensedApplication=Alletec,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-016255,ExpiryDate=9_June_2022_[v2]_MTY1NDcyOTIwMDAwMA==4eb0bc07d3b0c703072add2e87e682e5');


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
