import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";


@Component({
  selector: "my-app",
  template: `
    <button (click)="setDatasource()">Set Datasource</button>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [datasource]="datasource"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 220 },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowModelType: "clientSide" | "infinite" | "viewport" | "serverSide" =
    "serverSide";
  public serverSideStoreType: ServerSideStoreType = "partial";
  public rowData!: any[];
  public datasource: any;
  public gridApi: any;


  constructor(public http: HttpClient) {}

  setDatasource() {
    let data = this.datasource;

    var fakeServer = createFakeServer(data);
    var datasource = createServerSideDatasource(fakeServer);

    this.gridApi.setServerSideDatasource(datasource);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.datasource = data;
      });
  }
}

const createServerSideDatasource = (server: any): IServerSideDatasource => {

  return {
    getRows: (params) => {
      console.log(
        "getRows is called"
      );

      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
};
function createFakeServer(allData: any[]) {
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      // in this simplified fake server all rows are contained in an array

      var requestedRows = allData.slice(request.startRow, request.endRow);
      // here we are pretending we don't know the last row until we reach it!
      var lastRow = getLastRowIndex(request, requestedRows);
      return {
        success: true,
        rows: requestedRows,
        lastRow: lastRow,
      };
    },
  };
}
function getLastRowIndex(request: IServerSideGetRowsRequest, results: any[]) {
  if (!results) return undefined;
  var currentLastRow = (request.startRow || 0) + results.length;
  // if on or after the last block, work out the last row, otherwise return 'undefined'
  return currentLastRow < (request.endRow || 0) ? currentLastRow : undefined;
}
