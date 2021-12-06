import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowHeight]="rowHeight"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData: any;
  public rowHeight;

  constructor(public http: HttpClient) {
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

  onGridReady(params) {
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
  function generateRandomSentence(row, col) {
    var wordCount = ((row + 1) * (col + 1) * 733 * 19) % latinWords.length;
    var parts: any = [];
    for (var i = 0; i < wordCount; i++) {
      parts.push(latinWords[i]);
    }
    var sentence = parts.join(' ');
    return sentence + '.';
  }
  for (var i = 0; i < 100; i++) {
    var item = {
      rowNumber: 'Row ' + i,
      autoA: generateRandomSentence(i, 1),
      autoB: generateRandomSentence(i, 2),
      autoC: generateRandomSentence(i, 3),
    };
    rowData.push(item);
  }
  return rowData;
}
