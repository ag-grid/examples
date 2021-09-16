
import { Component } from '@angular/core';

import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'toggle-switch-component',
  // template: `<span>{{ this.displayValue }}</span>`,
  template: `
    <span>
      <span class="my-value">{{ this.displayValue }}</span>
      <button class="btn-simple" (click)="clicked()">Click</button>
    </span>`
})
export class ToggleSwitchRenderer implements AgRendererComponent {
  public displayValue: string = '';
  public params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.displayValue = this.getValueToDisplay(params);
  }

  getValueToDisplay(params) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  clicked() {
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, !this.params.value);
  }

  refresh(params) {
    this.params = params;
    this.displayValue = this.getValueToDisplay(params);

    // return true to tell the grid we refreshed successfully
    return true;
  }

}