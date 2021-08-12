import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-cell-renderer',
  template: `<div class="">
  <h1 style="padding: 20px;">{{message}}</h1>
  <ag-grid-angular
      #agGrid
      style="height: 150px;"
      id="detailGrid"
      class="full-width-grid ag-theme-alpine"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    >
    </ag-grid-angular></div>`,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
    constructor(http: HttpClient){
    this.http = http
    }
    
    message: string;
     http: HttpClient;
    colDefs: ({ field: string; valueFormatter?: undefined; } | { field: string; valueFormatter: string; })[];
    defaultColDef: { flex: number; minWidth: number; };
    rowData: any;
    masterGridApi: any;
    rowId: any;

  agInit(params: any): void {
    this.message = `Selected Column: ${params.context.selectedDetail.colId}`

    this.masterGridApi = params.api;
    this.rowId = params.node.id;


    this.colDefs = [
        { field: 'athlete' },
        { field: 'sport' },
        { field: 'year' },
        { field: 'gold' },
        { field: 'date' },
      ];
  
      this.defaultColDef = {
        flex: 1,
        minWidth: 120,
      };
  
    //   this.rowData = [];
  }
    

  onGridReady(params) {
    var gridInfo = {
      api: params.api,
      columnApi: params.columnApi,
    };
    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
    console.log('adding detail grid info with id: ', this.rowId);
    this.masterGridApi.addDetailGridInfo(this.rowId, gridInfo);
  }

  refresh(params: any): boolean {
    return false;
  }

}
