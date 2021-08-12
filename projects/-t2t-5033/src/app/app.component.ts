import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DetailCellRenderer } from './detail-cell-renderer.component';
import { MasterCellRenderer } from './masterCellRenderer.component';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [masterDetail]="true"
    [detailCellRenderer]="detailCellRenderer"
    [frameworkComponents]="frameworkComponents"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [gridOptions]="gridOptions"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;
  public gridOptions;

  public detailCellRenderer;
  public frameworkComponents;
  public columnDefs;
  public defaultColDef;
  public rowData: any;

  constructor(private http: HttpClient) {
    this.detailCellRenderer = 'myDetailCellRenderer';
    this.frameworkComponents = { myDetailCellRenderer: DetailCellRenderer, masterCellRenderer: MasterCellRenderer };
    this.gridOptions = {context: {}}
    this.columnDefs = [
      {
        field: 'name',
        cellRenderer: 'masterCellRenderer',
      },
        { field: 'account', cellRenderer: 'masterCellRenderer' },
      { field: 'calls', cellRenderer: 'masterCellRenderer', },
      {
        field: 'minutes',
        valueFormatter: "x.toLocaleString() + 'm'",
        cellRenderer: 'masterCellRenderer',
      },
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
