import { Component } from "@angular/core";
import "ag-grid-enterprise";
import { HttpClient } from "@angular/common/http";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { GridOptions } from "ag-grid-community";
@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 90%; height: 500px;"
    id="myGrid"
    class="ag-theme-alpine"
    [gridOptions]="gridOptionsFactory()"
  ></ag-grid-angular>
  <ag-grid-angular
    style="width: 90%; height: 500px;"
    id="myGrid2"
    class="ag-theme-alpine"
    [gridOptions]="gridOptionsFactory()"
  ></ag-grid-angular>
  <ag-grid-angular
    style="width: 90%; height: 500px;"
    id="myGrid3"
    class="ag-theme-alpine"
    [gridOptions]="gridOptionsFactory()"
  ></ag-grid-angular>`
})
export class AppComponent {
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public rowData: any;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { field: "make" },
      { field: "model" },
      { field: "price" },
    ];
    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ]
  }

  gridOptionsFactory():GridOptions  {
    return {
      columnDefs: this.columnDefs,
      rowData: this.rowData
    }
  }

}
