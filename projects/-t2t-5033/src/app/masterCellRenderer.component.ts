import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'master-cell-renderer',
  template: `<div class="master-container"><button class={{class}} (click)="chevronEventHandler($event)">Open Detail</button><span>{{value}}</span></div>`,
})
export class MasterCellRenderer implements ICellRendererAngularComp {
  params: any;
    id: any;
    value: any;
    class: any;
  agInit(params: any): void {
      this.params = params;
      this.id = params.node.data.rowIndex;
      this.class = `row-${this.id} pointer-class`
    this.value = params.valueFormatted ? params.valueFormatted : params.value

  }

  chevronEventHandler = (event) => {
    let col = this.params.column;
    this.openDetail(this.params, col, event);
  };

  openDetail = (params, column, cellRenderer) => {
    let gridOptions = params.api.gridOptionsWrapper.gridOptions;
    gridOptions.context = { ...gridOptions.context, selectedDetail: column };
    params.node.setExpanded(true);
    if (gridOptions.context.chevKeyMap) {
      gridOptions.context.chevKeyMap[cellRenderer.className] = column;
    } else {
      gridOptions.context.chevKeyMap = {};
      gridOptions.context.chevKeyMap[cellRenderer.className] = column;
    }
    if (params.node.detailNode)
      params.api.redrawRows({ rowNodes: [params.node.detailNode] });
  };

  refresh(params: any): boolean {
    return false;
  }
}
