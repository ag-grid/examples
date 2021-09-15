import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `
    <div class="example-wrapper">
      <div style="margin-bottom: 5px;">
      <button (click)="expandAll()">Expand All</button>
        
      </div>
      <ag-grid-angular
        #agGrid
        style="width: 100%; height: 100vh;"
        id="myGrid"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [autoGroupColumnDef]="autoGroupColumnDef"
        [sideBar]="true"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
				[processSecondaryColDef]="processSecondaryColDef"
        [groupDefaultExpanded]="groupDefaultExpanded"
      ></ag-grid-angular>
    </div>
  `,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public autoGroupColumnDef;
  public rowData: any[];
  public processSecondaryColDef: any;
  public groupDefaultExpanded;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'Object',
      },
      {
        field: 'Col1',
        enableRowGroup: true,
        rowGroup: true,
      },
      {
        field: 'Col2',
        enableRowGroup: true,
        rowGroup: true,
      },
      {
        field: 'Col3',
        enableRowGroup: true,
        rowGroup: true,
      },
      {
        field: 'Col4',
        enableRowGroup: true,
        rowGroup: true,
      },
      {
        field: 'Type',
        pivot: true,
        enablePivot: true,
      },
      {
        field: 'Amount1',
        aggFunc: 'sum',
        enableValue: true,
      },
      {
        field: 'Amount2',
        aggFunc: 'sum',
        enableValue: true,
      }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      filter: true,
      resizable: true,
    };
    this.groupDefaultExpanded = -1;
    this.autoGroupColumnDef = { minWidth: 300 };
    this.processSecondaryColDef = function (colDef) {
      if (colDef.pivotKeys[0] === 'Total') {
        colDef.cellStyle = params => {
          if (params.node.leafGroup) {
            let aggData = params.node.aggData;
            if (
              (colDef.headerName === 'Amount1' && (aggData.pivot_4 + aggData.pivot_7 !== aggData.pivot_1))
              || (colDef.headerName === 'Amount2' && (aggData.pivot_5 + aggData.pivot_8 !== aggData.pivot_2))
            ) {
              return {
                border: '4px solid red'
              }
            }
          }
        }
      }
    };
  }

  printState() {
    var state = this.gridColumnApi.getColumnState();
    console.log(state);
  }

  saveState() {
    savedState = this.gridColumnApi.getColumnState();
    savedPivotMode = this.gridColumnApi.isPivotMode();
    console.log('column state saved');
  }
  expandAll() {
    this.gridApi.expandAll();
  }
  restoreState() {
    if (savedState) {
      this.gridColumnApi.setColumnState(savedState);
      this.gridColumnApi.setPivotMode(savedPivotMode);
      console.log('column state restored');
    } else {
      console.log('no previous column state to restore!');
    }
  }

  togglePivotMode() {
    var pivotMode = this.gridColumnApi.isPivotMode();
    this.gridColumnApi.setPivotMode(!pivotMode);
  }

  resetState() {
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.setPivotMode(false);
    console.log('column state reset');
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setPivotMode(true);


    this.rowData = [
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B1",
        "Col3": "C1",
        "Col4": "D1",
        "Type": "Total",
        "Amount1": 100,
        "Amount2": 100
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B1",
        "Col3": "C1",
        "Col4": "D1",
        "Type": "Data1",
        "Amount1": 50,
        "Amount2": 49
      }, ,
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B1",
        "Col3": "C1",
        "Col4": "D1",
        "Type": "Data2",
        "Amount1": 49,
        "Amount2": 50
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B1",
        "Col3": "C2",
        "Col4": "",
        "Type": "Total",
        "Amount1": 120,
        "Amount2": 110
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B1",
        "Col3": "C2",
        "Col4": "",
        "Type": "Data1",
        "Amount1": 60,
        "Amount2": 55
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B1",
        "Col3": "C2",
        "Col4": "",
        "Type": "Data2",
        "Amount1": 61,
        "Amount2": 55
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B2",
        "Col3": "C2",
        "Col4": "D3",
        "Type": "Total",
        "Amount1": 130,
        "Amount2": 120
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B2",
        "Col3": "C2",
        "Col4": "D3",
        "Type": "Data1",
        "Amount1": 65,
        "Amount2": 54
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B2",
        "Col3": "C2",
        "Col4": "D3",
        "Type": "Data2",
        "Amount1": 65,
        "Amount2": 65
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B2",
        "Col3": "C3",
        "Col4": "",
        "Type": "Total",
        "Amount1": 140,
        "Amount2": 125
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B2",
        "Col3": "C3",
        "Col4": "",
        "Type": "Data1",
        "Amount1": 75,
        "Amount2": 60
      },
      {
        "Object": "Obj1",
        "Col1": "A1",
        "Col2": "B2",
        "Col3": "C3",
        "Col4": "",
        "Type": "Data2",
        "Amount1": 64,
        "Amount2": 64
      }
    ];
  }
}


var savedState;
var savedPivotMode;
