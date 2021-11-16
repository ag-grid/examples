import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { CustomHeader } from './custom-header.component';
@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [suppressMenuHide]="true"
    [frameworkComponents]="frameworkComponents"
    [defaultColDef]="defaultColDef"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData: any;
  frameworkComponents

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        suppressMenu: true,
        minWidth: 120,
      },
      {
        field: 'age',
        sortable: false,
        headerComponentParams: { menuIcon: 'fa-external-link-alt' },
      },
      {
        field: 'country',
        suppressMenu: true,
        minWidth: 120,
      },
      {
        field: 'year',
        sortable: false,
      },
      {
        field: 'date',
        suppressMenu: true,
      },
      {
        field: 'sport',
        sortable: false,
      },
      {
        field: 'gold',
        headerComponentParams: { menuIcon: 'fa-cog' },
        minWidth: 120,
      },
      {
        field: 'silver',
        sortable: false,
      },
      {
        field: 'bronze',
        suppressMenu: true,
        minWidth: 120,
      },
      {
        field: 'total',
        sortable: false,
      },
    ];
    this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.defaultColDef = {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      headerComponentParams: { menuIcon: 'fa-bars' },
    };
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
