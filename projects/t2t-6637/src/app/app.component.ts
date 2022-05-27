import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150, filter: true },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowData!: any[];
  public gridApi: any;
  public loopIndex: number = 0;

  constructor(private http: HttpClient) {}

  addDataAsync(api, startIndex) {
    const data: {}[] = [];
    for (let i = startIndex; i < startIndex+10; i++) {
      const row: {} = { athlete: `new row ${i}` };
      data.push(row);
    }
    api.applyTransactionAsync({ add: data, addIndex: 0 });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
    setInterval(() => {
      this.addDataAsync(params.api, this.loopIndex );
      this.loopIndex += 10
    }, 1000);
  }
}
