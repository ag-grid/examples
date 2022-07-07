import { Component, ViewEncapsulation } from '@angular/core';
import 'ag-grid-enterprise';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { ICellEditorAngularComp } from 'ag-grid-angular';
import {
  ColDef,
  GridOptions,
  ICellEditorParams,
  ICellRendererParams,
} from 'ag-grid-community';

@Component({
  selector: 'app-form-cell-editor',
  template: `
    <input type="text" (input)="onInputChanged($event)" [value]="value" />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CellEditorComponent implements ICellEditorAngularComp {
  value!: string;

  agInit(params: ICellEditorParams): void {
    this.value = params.value;
  }

  onInputChanged(e: any) {
    this.value = e.target.value;
  }

  getValue() {
    return this.value;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    [gridOptions]="gridOptions"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    style="width: 700px; height: 500px;"
    class="ag-theme-alpine"
  >
  </ag-grid-angular>`,
})
export class AppComponent {
  gridOptions: GridOptions = {
    singleClickEdit: true,
    stopEditingWhenCellsLoseFocus: true,
    editType: 'fullRow',
  };

  defaultColDef: ColDef = {
    editable: true,
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'Make',
      field: 'make',
      cellEditor: CellEditorComponent,
    },
    {
      headerName: 'Model',
      field: 'model',
      cellEditor: CellEditorComponent,
    },
    {
      headerName: 'Price',
      field: 'price',
      cellEditor: CellEditorComponent,
    },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ];

  x(e: any) {
    console.log(e);
  }
}
