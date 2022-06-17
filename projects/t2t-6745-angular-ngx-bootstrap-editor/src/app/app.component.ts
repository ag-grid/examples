import { Component } from "@angular/core";
import "ag-grid-enterprise";
import { HttpClient } from "@angular/common/http";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColumnApi, GridApi } from "ag-grid-enterprise";
import { CustomCellEditorComponent } from "./custom-cell-editor/custom-cell-editor.component";
@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    #agGrid
    style="width: 90%; height: 500px;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`
})
export class AppComponent {
  public gridApi!: GridApi;
  public gridColumnApi!: ColumnApi;
  public columnDefs: ColDef[];
  public defaultColDef: ColDef;
  public rowData: any;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: "athlete",
        minWidth: 150
      },
      {
        field: "date",
        cellEditor: CustomCellEditorComponent,
        editable:true,
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100
    };
  }

  onGridReady(params: { api: any; columnApi: any }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get("https://www.ag-grid.com/example-assets/olympic-winners.json").subscribe((data) => {
      this.rowData = data;
    });
  }
}
