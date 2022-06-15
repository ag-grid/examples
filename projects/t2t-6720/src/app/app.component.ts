import { Component } from "@angular/core";
import "ag-grid-enterprise";
import { HttpClient } from "@angular/common/http";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, GridOptions } from "ag-grid-enterprise";
import { unwrapUserComp } from "ag-grid-community/dist/lib/gridApi";

const comparatorA = (aV: any, bV: any) => {
  if (aV == null && bV == null) {
    return 0;
  } else if (aV == null || bV == null) {
    return aV == null ? 1 : -1;
  }
  return aV.localeCompare(bV);
};

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    #agGrid
    style="width: 90%; height: 500px;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [animateRows]="true"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    [gridOptions]="gridOptions"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowData: any;
  public autoGroupColumnDef: ColDef;
  public gridOptions: GridOptions;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { field: "country" },
      { field: "year" },
      { field: "athlete", comparator: comparatorA },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
      enableRowGroup: true,
    };
    this.autoGroupColumnDef = {
      minWidth: 200,
    };
    this.gridOptions = {
      rowGroupPanelShow: "always",
    };
  }

  onGridReady(params: { api: any; columnApi: any }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
