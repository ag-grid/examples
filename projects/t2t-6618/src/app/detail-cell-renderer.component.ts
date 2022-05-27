import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';

const SELECTION_STATES = {
  PARTIAL: undefined,
  ALL_SELECTED: true,
  NONE_SELECTED: false,
};

@Component({
  selector: 'app-detail-cell-renderer',
  template: ` <div class="full-width-panel">
    <ag-grid-angular
      #agGrid
      style="height: 100%;"
      id="detailGrid"
      class="full-width-grid ag-theme-alpine"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
      [rowSelection]="'multiple'"
      [suppressRowClickSelection]="true"
      (rowSelected)="onRowSelected($event)"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    >
    </ag-grid-angular>
  </div>`,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  masterGridApi!: GridApi;
  rowId!: string;
  colDefs!: ColDef[];
  defaultColDef!: ColDef;
  rowData!: any[];
  masterRowAccountNo: any;
  masterNode: any;
  detailRowSelectedHandler: any;

  // called on init
  agInit(params): void {
    this.params = params;
    this.masterGridApi = params.api;
    this.masterRowAccountNo = params.data.account;
    this.masterNode = params.node.parent;
    this.rowId = params.node.id!;
    this.detailRowSelectedHandler = params.detailRowSelectedHandler;
    this.colDefs = [
      { field: 'callId', checkboxSelection: true },
      { field: 'direction' },
      { field: 'number' },
      { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
      { field: 'switchCode' },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
    };

    this.rowData = params.data.callRecords;
  }

  // called when the cell is refreshed
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  onGridReady(params: GridReadyEvent) {
    var gridInfo = {
      id: this.rowId,
      api: params.api,
      columnApi: params.columnApi,
    };

    console.log('adding detail grid info with id: ', this.rowId);
    this.masterGridApi.addDetailGridInfo(this.rowId, gridInfo);
  }

  onRowSelected(params) {
    // Called when detail grid is opened and a seelction event occurs.
    const selectedNodes = params.api.getSelectedNodes();

    let selectionState;
    if (this.rowData.length === selectedNodes.length) {
      selectionState = SELECTION_STATES.ALL_SELECTED;
    } else if (selectedNodes.length === 0) {
      selectionState = SELECTION_STATES.NONE_SELECTED;
    } else {
      selectionState = SELECTION_STATES.PARTIAL;
    }

    // Set the type of selection on master node.
    this.detailRowSelectedHandler(
      this.masterNode,
      selectionState,
      selectedNodes.map((node) => node.id)
    );
  }

  ngOnDestroy(): void {
    // detail grid is automatically destroyed as it is an Angular component

    console.log('removing detail grid info with id: ', this.rowId);
    this.masterGridApi.removeDetailGridInfo(this.rowId);
  }
}
