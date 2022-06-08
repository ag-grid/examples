import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { RowDropZoneEvents } from 'ag-grid-community/dist/lib/gridBodyComp/rowDragFeature';
import 'ag-grid-enterprise';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

public rowData;
public columnDefs;
public defaultColDef;
public autoGroupColumnDef;
leftGridApi: any;
rightGridApi: any;

constructor() {
this.rowData = [];
this.columnDefs = [{
field: 'category',
rowGroup: true,
hide: true,
},];

this.defaultColDef = {
flex: 1,
minWidth: 100,
floatingFilter: true
} as ColDef;

this.autoGroupColumnDef = {
headerName: 'Column',
field: 'name',
sortable: true,
sort: 'asc',
cellRenderer: 'agGroupCellRenderer',
cellRendererParams: { checkbox: true },
rowDrag: true,
filter: 'agTextColumnFilter',
filterParams: { applyMiniFilterWhileTyping: true, debounceMs: 350 }
} as ColDef;

const rows: any[] = [];
rows.push({ category: 'Default', name: 'Col 1' });
rows.push({ category: 'Default', name: 'Col 2' });
rows.push({ category: 'Default', name: 'Col 3' });
rows.push({ category: 'New cat', name: 'Col 4' });
rows.push({ category: 'New cat', name: 'Col 5' });

this.rowData = rows;
}

ngOnInit(): void {

setTimeout(() => this.addZones(), 1000);
}

private addZones() {

console.log("adding", this.rightGridApi, this.leftGridApi);

const dropZoneParams = this.rightGridApi.getRowDropZoneParams({
onDragStop: () => {
alert('Record Dropped!');
}
} as RowDropZoneEvents);

this.leftGridApi.addRowDropZone(dropZoneParams);
}

onRowDragMove(event){
    console.log(event)
}

onRowDragEnd(event){
    console.log(event)
}

onLeftGridReady(params) {
this.leftGridApi = params.api;
console.log("onLeftGridReady");
}

onRightGridReady(params) {
this.rightGridApi = params.api;
console.log("onRightGridReady");
}
}