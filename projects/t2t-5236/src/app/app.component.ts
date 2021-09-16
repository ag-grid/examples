import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import rowData from './rowData';

import { ToggleSwitchRenderer } from './toggle-switch-renderer.component';

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
    (gridReady)="onGridReady($event)"
    [gridOptions]="gridOptions"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData: any;

  public gridOptions: any;

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Visible',
        field: 'visibility',
        cellRenderer: 'toggleSwitchRenderer',
        // width: 150
        minWidth: 200
      },
      {
        headerName: 'Field',
        field: 'field'
      },
      {
        headerName: 'Header Name',
        field: 'headerName',
        editable: true
      },
      {
        headerName: 'Enable Row Group',
        field: 'enableRowGroup',
        cellRenderer: 'toggleSwitchRenderer',
        width: 250
      },
      {
        headerName: 'Row Grouping index',
        field: 'rowGroupIndex',
        editable: true,
        cellEditor: 'numericEditor',
        width: 250
      },
      {
        headerName: 'Agg Function',
        field: 'aggFunc',
        cellRenderer: 'dropdownRenderer',
      },
      {
        headerName: 'Pinned',
        field: 'pinned',
        cellRenderer: 'dropdownRenderer',
      }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.gridOptions = {
      // rowData: this.data.columnState,
      // columnDefs: this.createColumnDefs(),
      // onGridReady: (parms) => {
      //   this.gridReady(parms);
      // },
      rowHeight: 48,
      frameworkComponents: {
        toggleSwitchRenderer: ToggleSwitchRenderer,
        // checkboxRenderer: MatCheckboxComponent,
        // dropdownRenderer: MatSelectComponentComponent,
        // numericEditor: NumericEditorComponent,
        //colorPicker: ColorPickerEditorComponent
      },
      suppressContextMenu: true
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // this.http
    //   .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .subscribe((data) => {
    //     this.rowData = data;
    //   });

    this.rowData = rowData;
  }
}
