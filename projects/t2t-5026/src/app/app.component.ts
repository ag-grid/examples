import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import {LicenseManager} from "@ag-grid-enterprise/core";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

LicenseManager.setLicenseKey("license key goes here");
@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    [modules]="modules"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;
  public modules;

  public columnDefs;
  public defaultColDef;
  public rowData: any;

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        minWidth: 150,
      },
      {
        field: 'age',
        maxWidth: 90,
      },
      {
        field: 'country',
        minWidth: 150,
      },
      {
        field: 'year',
        maxWidth: 90,
      },
      {
        field: 'date',
        minWidth: 150,
      },
      {
        field: 'sport',
        minWidth: 150,
      },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };

    this.modules = AllModules;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
