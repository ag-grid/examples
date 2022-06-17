import { Component } from "@angular/core";
import "ag-grid-enterprise";
import { HttpClient } from "@angular/common/http";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
@Component({
  selector: "my-app",
  templateUrl: "./main.component.html",
})
export class AppComponent {
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowData: any;

  itemlist: number[] = [1, 2, 3, 4, 5];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: "athlete",
        minWidth: 150,
      },
      {
        field: "age",
        maxWidth: 90,
      },
      {
        field: "country",
        minWidth: 150,
      },
      {
        field: "year",
        maxWidth: 90,
      },
      {
        field: "date",
        minWidth: 150,
      },
      {
        field: "sport",
        minWidth: 150,
      },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
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
