import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div class="wrapper" style="height: 80%">
  <ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [gridOptions]="gridOptions"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>
  <div id="myChart" class="my-chart"></div>
</div>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;
  public gridOptions;
  public columnDefs;
  public defaultColDef;
  public rowData: any;

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        field: 'country',
        minWidth: 150,
      },
      {
        field: 'year',
        maxWidth: 90,
      },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.gridOptions = {
  popupParent: document.body,
  rowData: this.createRowData(),
  enableRangeSelection: true,
  enableCharts: true,
  onFirstDataRendered: this.onFirstDataRendered,
  chartThemeOverrides: {
    scatter: {
      axes: {
            number: {
              label: {
                formatter: (params) => {
                  if(params.axis.direction == 'y'){
                    return params.value + '%'
                  }else{
                    return  params.value
                  }

                },
              },
            },
      },
      fillOpacity: 0.7,
      strokeOpacity: 0.6,
      strokeWidth: 2,
      highlightStyle: {
        fill: 'red',
        stroke: 'yellow',
      },
      marker: {
        enabled: true,
        shape: 'square',
        size: 5,
        maxSize: 12,
        strokeWidth: 4,
      },
      paired: true,
      tooltip: {
        renderer: function (params) {
          var label = params.datum[params.labelKey];
          var size = params.datum[params.sizeKey];

          return {
            content:
              (label != null
                ? '<b>' +
                  params.labelName.toUpperCase() +
                  ':</b> ' +
                  label +
                  '<br/>'
                : '') +
              '<b>' +
              params.xName.toUpperCase() +
              ':</b> ' +
              params.xValue +
              '<br/>' +
              '<b>' +
              params.yName.toUpperCase() +
              ':</b> ' +
              params.yValue +
              (size != null
                ? '<br/><b>' + params.sizeName.toUpperCase() + ':</b> ' + size
                : ''),
          };
        },
      },
    },
  },
    }
  }

  onFirstDataRendered(params) {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'total', 'gold', 'silver', 'bronze'],
    };
  
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: 'scatter',
    };
  
    params.api.createRangeChart(createRangeChartParams);
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
  createRowData() {
    var countries = [
      'Ireland',
      'Spain',
      'United Kingdom',
      'France',
      'Germany',
      'Luxembourg',
      'Sweden',
      'Norway',
      'Italy',
      'Greece',
      'Iceland',
      'Portugal',
      'Malta',
      'Brazil',
      'Argentina',
      'Colombia',
      'Peru',
      'Venezuela',
      'Uruguay',
      'Belgium',
    ];
  
    return countries.map(function (country, index) {
      var datum = {
        country: country,
        gold: Math.floor(((index + 1 / 7) * 333) % 100),
        silver: Math.floor(((index + 1 / 3) * 555) % 100),
        bronze: Math.floor(((index + 1 / 7.3) * 777) % 100),
      };
  
      datum['total'] = datum.gold + datum.silver + datum.bronze;
  
      return datum;
    });
  }
}
