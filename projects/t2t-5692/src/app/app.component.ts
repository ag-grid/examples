import { Component } from "@angular/core";
import "ag-grid-enterprise";
import { HttpClient } from "@angular/common/http";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
@Component({
  selector: "my-app",
  template: `<ag-grid-angular
      #agGrid
      style="width: 90%; height: 500px;"
      id="myGrid"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowHeight]="rowHeight"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`
})
export class AppComponent {
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowData: any;
  public rowHeight;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Row #',
        field: 'rowNumber',
        width: 120,
      },
      {
        field: 'autoA',
        width: 300,
        wrapText: true,
        autoHeight: true,
        headerName: 'A) Auto Height',
      },
      {
        width: 300,
        field: 'autoB',
        wrapText: true,
        headerName: 'B) Normal Height',
      },
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };
    this.rowHeight = 150;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(function () {
      params.api.setRowData(createRowData());
    }, 500);
  }
}

function createRowData() {
  var latinSentence =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.';
  var latinWords = latinSentence.split(' ');
  var rowData: any = [];
  function generateRandomSentence(row: number, col: number) {
    var wordCount = ((row + 1) * (col + 1) * 733 * 19) % latinWords.length;
    var parts: any= [];
    for (var i = 0; i < wordCount; i++) {
      parts.push(latinWords[i]);
    }
    var sentence = parts.join(' ');
    return sentence + '.';
  }
  for (var i = 0; i < 100; i++) {
    var item: any = {
      rowNumber: 'Row ' + i,
      autoA: generateRandomSentence(i, 1),
      autoB: generateRandomSentence(i, 2),
      autoC: generateRandomSentence(i, 3),
    };
    rowData.push(item);
  }
  return rowData;
}
