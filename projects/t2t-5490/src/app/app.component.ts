import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [postProcessPopup]="postProcessPopup"
    [getMainMenuItems]="getMainMenuItems"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public postProcessPopup;
  public rowData: any;

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        minWidth: 200,
      },
      { field: 'age' },
      {
        field: 'country',
        minWidth: 200,
      },
      { field: 'year' },
      {
        field: 'date',
        minWidth: 180,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
      },
      {
        field: 'sport',
        minWidth: 200,
        menuTabs: ['filterMenuTab', 'columnsMenuTab'],
      },
      {
        field: 'gold',
        menuTabs: ['generalMenuTab', 'gibberishMenuTab'],
      },
      {
        field: 'silver',
        menuTabs: [],
      },
      { field: 'bronze' },
      { field: 'total' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      filter: true,
    };
    this.postProcessPopup = function (params) {
      if (params.type !== 'columnMenu') {
        return;
      }
      var columnId = params.column.getId();
      if (columnId === 'gold') {
        var ePopup = params.ePopup;
        var oldTopStr = ePopup.style.top;
        oldTopStr = oldTopStr.substring(0, oldTopStr.indexOf('px'));
        var oldTop = parseInt(oldTopStr);
        var newTop = oldTop + 25;
        ePopup.style.top = newTop + 'px';
      }
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }

  getMainMenuItems(params) {
    switch (params.column.getId()) {
      case 'athlete':
        var athleteMenuItems = params.defaultItems.slice(0);
        athleteMenuItems.push({
          name: 'AG Grid Is Great',
          action: function () {
            console.log('AG Grid is great was selected');
          },
        });
        athleteMenuItems.push({
          name: 'Casio Watch',
          action: function () {
            console.log('People who wear casio watches are cool');
          },
        });
        athleteMenuItems.push({
          name: 'Custom Sub Menu',
          subMenu: [
            {
              name: 'Black',
              action: function () {
                console.log('Black was pressed');
              },
            },
            {
              name: 'White',
              action: function () {
                console.log('White was pressed');
              },
            },
            {
              name: 'Grey',
              action: function () {
                console.log('Grey was pressed');
              },
            },
          ],
        });
        return athleteMenuItems;
      case 'age':
        return [
          {
            name: 'Joe Abercrombie',
            action: function () {
              console.log('He wrote a book');
            },
            icon:
              '<img src="https://www.ag-grid.com/example-assets/lab.png" style="width: 14px;" />',
          },
          {
            name: 'Larsson',
            action: function () {
              console.log('He also wrote a book');
            },
            checked: true,
          },
          'resetColumns',
        ];
      case 'country':
        var countryMenuItems: any[] = [];
        var itemsToExclude = ['separator', 'pinSubMenu', 'valueAggSubMenu'];
        params.defaultItems.forEach(function (item) {
          if (itemsToExclude.indexOf(item) < 0) {
            countryMenuItems.push(item);
          }
        });
        return countryMenuItems;
      default:
        return params.defaultItems;
    }
  }
}
