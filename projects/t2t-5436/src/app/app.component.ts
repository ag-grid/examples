import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';

ModuleRegistry.registerModules([
  ServerSideRowModelModule, ExcelExportModule
  ]);

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public serverSideStoreType;
  public rowData: any;

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        minWidth: 220,
      },
      {
        field: 'country',
        minWidth: 200,
      },
      { field: 'year' },
      {
        field: 'sport',
        minWidth: 200,
      },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        var fakeServer = createFakeServer(data);
        var datasource = createServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
      });
  }
}

function createServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log(
        '[Datasource] - rows requested by grid: startRow = ' +
          params.request.startRow +
          ', endRow = ' +
          params.request.endRow
      );
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
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
}
function createFakeServer(allData) {
  return {
    getData: function (request) {
      var requestedRows = allData.slice(request.startRow, request.endRow);
      var lastRow = getLastRowIndex(request, requestedRows);
      return {
        success: true,
        rows: requestedRows,
        lastRow: lastRow,
      };
    },
  };
}
function getLastRowIndex(request, results) {
  if (!results) return undefined;
  var currentLastRow = request.startRow + results.length;
  return currentLastRow < request.endRow ? currentLastRow : undefined;
}
