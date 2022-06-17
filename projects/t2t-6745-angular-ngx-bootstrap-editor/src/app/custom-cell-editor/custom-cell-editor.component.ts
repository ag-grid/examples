import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-custom-cell-editor',
  template: `<div class="row">
  <div class="col-xs-12 col-12 col-md-4 form-group">
      <input type="text" [(ngModel)]="value" placeholder="Datepicker" class="form-control"
          [bsConfig]="{withTimepicker: true, rangeInputFormat : 'MMMM Do YYYY, h:mm:ss a', dateInputFormat: 'MMMM Do YYYY, h:mm:ss a'}"
          bsDatepicker>
  </div>
</div>`
})
export class CustomCellEditorComponent implements AgEditorComponent {
  datepicker!: BsDatepickerDirective;

  @ViewChild(BsDatepickerDirective)
  set setPicker(directive: BsDatepickerDirective) {
    this.datepicker = directive;
  }

  public value!: Date;

  constructor() { }

  getValue() {
    const month = this.value.getMonth() + 1;
    const day = this.value.getDate();
    const year = this.value.getFullYear();
    return `${day}/${month}/${year}`;
  }
  agInit(params: ICellEditorParams): void {
    const dateParts = params.value.split('/');
    const day = Number(dateParts[0]);
    const month = Number(dateParts[1]) - 1;
    const year = Number(dateParts[2]);

    this.value = new Date(year, month, day);
    setTimeout(() => {
      this.datepicker.show()
    }, 0);
  }

}
