import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowSelectedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { DetailCellRenderer } from './detail-cell-renderer.component';
declare var window: any;

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="printDetailGridInfo()">Print Detail Grid Info</button>
      <button (click)="expandCollapseAll()">Toggle Expand / Collapse</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [masterDetail]="true"
      [detailRowHeight]="detailRowHeight"
      [detailCellRenderer]="detailCellRenderer"
      [detailCellRendererParams]="detailCellRendererParams"
      [rowData]="rowData"
      [rowSelection]="'multiple'"
      [suppressRowClickSelection]="true"
      [getRowId]="getRowId"
      (rowSelected)="onRowSelected($event)"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer', cellRendererParams: { checkbox: true }, },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailRowHeight = 310;
  public detailCellRenderer: any = DetailCellRenderer;
  public rowData!: any[];
  public getRowId = (params) => {
    return params.data.account;
  };
  detailCellRendererParams = (params) => ({
    detailRowSelectedHandler: this.onDetailRowsSelectionChanged,
    initialIds: params.node.data.childIdsSelected || [],
  });

  constructor(public http: HttpClient) { }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  

  expandCollapseAll() {
    this.gridApi.forEachNode(function (node) {
      node.expanded = !!window.collapsed;
    });
    window.collapsed = !window.collapsed;
    this.gridApi.onGroupExpandedOrCollapsed();
  }

  printDetailGridInfo() {
    console.log("Currently registered detail grid's: ");
    this.gridApi.forEachDetailGridInfo(function (detailGridInfo) {
      console.log(detailGridInfo);
    });
  }

  onRowSelected(params: RowSelectedEvent) {
    if (params.node.data.updatingFromDetails) {
      return;
    } else {
      this.onParentNodeSelected(params.node)
    }
  }
  onDetailRowsSelectionChanged(node, parentSelectionState, idsSelected) {
    node.data.childIdsSelected = idsSelected;
    node.data.updatingFromDetails = true;
    node.selectThisNode(parentSelectionState);

    setTimeout(() => (node.data.updatingFromDetails = false), 0);
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/master-detail-data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
  onParentNodeSelected(node) {
    node.data.childIdsSelected = node.selected
    ? node.data.callRecords.map((_, ind) => ind)
    : [];
    // ABOVE: build an array of child indexes that need to be selected.
    const detailGridId = 'detail_' + node.data.account;

    const detailGrid = this.gridApi.getDetailGridInfo(detailGridId);

    if (detailGrid) {
      // detail grid is open.
      detailGrid.api?.forEachNode((detailNode) =>
        detailNode.setSelected(node.selected)
      );
    }
  }
}

