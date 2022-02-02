import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

@Component({
  selector: 'my-app',
  template: `<div style="height: 500px; box-sizing: border-box;">
    <ag-grid-angular
      #agGrid
      style="width: 100%; height: 100%;"
      id="myGrid"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [masterDetail]="true"
      [cacheBlockSize]="200"
      [detailCellRendererParams]="detailCellRendererParams"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public serverSideStoreType: any;
  public detailCellRendererParams;
  public rowData: [] = [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'accountId',
        cellRenderer: 'agGroupCellRenderer',
      },
      { field: 'name' },
      { field: 'country' },
      { field: 'calls' },
      { field: 'totalDuration' },
    ];
    this.defaultColDef = { flex: 1 };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.detailCellRendererParams = {
      detailGridOptions: {
        rowModelType: 'serverSide',
        serverSideStoreType: 'partial',
        columnDefs: [
          { field: 'accountId' },
          { field: 'name' },
          { field: 'country' },
          { field: 'calls' },
          { field: 'totalDuration' },
        ],
        cacheBlockSize: 200,
        defaultColDef: { flex: 1 },
        onGridReady: (params: any) => {
          this.http
            .get('https://www.ag-grid.com/example-assets/call-data.json')
            .subscribe((data: any) => {
              var server = new (FakeServer as any)(data);
              var datasource = new (ServerSideDatasource as any)(server);
              params.api.setServerSideDatasource(datasource);
            });
        },
      },
      getDetailRowData: function () {},
    };
  }

  onGridReady(params: any) {

    setTimeout(function () {
      var someRow = params.api.getRowNode('1');
      if (someRow) {
        someRow.setExpanded(true);
      }
    }, 1000);

    this.http
      .get('https://www.ag-grid.com/example-assets/call-data.json')
      .subscribe((data: any) => {
        var server = new (FakeServer as any)(data);
        var datasource = new (ServerSideDatasource as any)(server);
        params.api.setServerSideDatasource(datasource);
      });
  }
}

function ServerSideDatasource(server: any): any {
  return {
    getRows: function (params: any) {
      setTimeout(function () {
        var response = server.getResponse(params.request);
        if (response.success) {
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
}
function FakeServer(allData: any) {
  return {
    getResponse: function (request: any) {
      console.log(
        'asking for rows: ' + request.startRow + ' to ' + request.endRow
      );
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
      var lastRow = allData.length;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
}
