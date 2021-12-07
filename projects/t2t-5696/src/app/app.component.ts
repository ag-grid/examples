import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
  <div style="margin-bottom: 1rem;">
    <button (click)="setPriceOnToyota()">Set Price on Toyota</button>
    <button (click)="setDataOnFord()">Set Data on Ford</button>
    <button (click)="updateSort()" style="margin-left: 15px">Sort</button>
    <button (click)="updateFilter()">Filter</button>
  </div>
  <ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-material"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [animateRows]="true"
    [rowData]="rowData"
    [getRowNodeId]="getRowNodeId"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;
  public getRowNodeId;
  public columnDefs;
  public defaultColDef;
  public rowData: any;

  constructor(public http: HttpClient) {
    this.rowData = [
      {
        id: 'aa',
        make: 'Toyota',
        model: 'Celica AB C HHHHHhhHHhhH  hbjhbbkjkjdcjksdc djcnsdkcj s dkjcnsdkj cskjdncksjdnc djcnsdkjcnsd kjnc skdjncsdc kjdncskndc kjnsdc dksjnc kjsndc dskjnc  cdjksncdksjc dkjnskdjc kjdncds',
        price: 35000,
      },
      {
        id: 'bb',
        make: 'Ford',
        model: 'Mondeo',
        price: 32000,
      },
      {
        id: 'cc',
        make: 'Porsche',
        model: 'Boxter',
        price: 72000,
      },
      {
        id: 'dd',
        make: 'BMW',
        model: '5 Series',
        price: 59000,
      },
      {
        id: 'ee',
        make: 'Dodge',
        model: 'Challanger',
        price: 35000,
      },
      {
        id: 'ff',
        make: 'Mazda',
        model: 'MX5',
        price: 28000,
      },
      {
        id: 'gg',
        make: 'Horse',
        model: 'Outside',
        price: 99000,
      },
    ];
    this.columnDefs = [
      { field: 'make' },
      { field: 'model' , 
      wrapText: true,
      autoHeight: true},
      {
        field: 'price',
        filter: 'agNumberColumnFilter',
      },
    ];
    this.defaultColDef = {
      flex: 1,
      editable: true,
      sortable: true,
      filter: true,
    };
    this.getRowNodeId = function (data) {
      return data.id;
    };
  }

  updateSort() {
    this.gridApi.refreshClientSideRowModel('sort');
  }

  updateFilter() {
    this.gridApi.refreshClientSideRowModel('filter');
  }

  setPriceOnToyota() {
    var rowNode = this.gridApi.getRowNode('aa');
    var newPrice = Math.floor(Math.random() * 100000);
    rowNode.setDataValue('price', newPrice);
  }

  setDataOnFord() {
    var rowNode = this.gridApi.getRowNode('bb');
    var newPrice = Math.floor(Math.random() * 100000);
    var newModel = 'T-' + Math.floor(Math.random() * 1000);
    var newData = {
      id: 'bb',
      make: 'Ford',
      model: newModel,
      price: newPrice,
    };
    rowNode.setData(newData);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
