import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    #agGrid
    style="width: 500px; height: 500px;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
  ></ag-grid-angular>`
})
export class AppComponent {
  public columnDefs: any = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];

  public rowData: any = [{ make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 }];
}
