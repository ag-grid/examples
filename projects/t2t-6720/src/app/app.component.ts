import { Component } from "@angular/core";
import "ag-grid-enterprise";
import { HttpClient } from "@angular/common/http";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, GridOptions } from "ag-grid-enterprise";

const comparatorA = (aV: any, bV: any) => {
  if (aV == null && bV == null) {
    return 0;
  } else if (aV == null || bV == null) {
    return aV == null ? 1 : -1;
  }

  console.log("called");
  return aV.localeCompare(bV);
};

const comparatorB = (aV: any, bV: any, inv: any) => {
  if (aV == null && bV == null) {
    return 0;
  } else if (aV == null || bV == null) {
    return aV == null ? 1 : -1;
  }

  const diff = aV.localeCompare(bV);
  return inv ? -1 * diff : diff;
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
      { field: "sport", comparator: comparatorB },
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
      .subscribe((data: any) => {
        this.rowData = data.slice(0, 10);
      });
  }
}
