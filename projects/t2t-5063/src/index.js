import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

var columnDefs = [
  {
    headerName: 'Age - NumberFormat(0)',
    field: 'age',
    cellClass: 'numberType',
    cellClassRules: {
      magentaBackground: () => true,
    },
  },
  {
    headerName: 'Age - twoDP',
    field: 'age',
    cellClass: 'twoDecimalPlaces',
    cellClassRules: {
      greenBackground: function (params) {
        return params.value < 23;
      },
      redFont: function (params) {
        return params.value < 20;
      },
    },
  },
  {
    field: 'date',
    minWidth: 150,
    cellClass: 'dateFormat',
    valueGetter: function (params) {
      var val = params.data.date;

      if (val.indexOf('/') < 0) {
        return val;
      }

      var split = val.split('/');

      return split[2] + '-' + split[1] + '-' + split[0];
    },
  },
];

var gridOptions = {
  defaultColDef: {
    cellClassRules: {
      darkGreyBackground: function (params) {
        return params.node.rowIndex % 2 == 0;
      },
    },
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },
  columnDefs: columnDefs,
  excelStyles: [
    {
      id: 'numberType',
      numberFormat: {
        format: '0',
      },
    },
    {
      id: 'twoDecimalPlaces',
      numberFormat: {
        format: '#,##0.00',
      },
    },
    {
      id: 'dateFormat',
      dataType: 'dateTime',
      numberFormat: {
        format: 'mm/dd/yyyy;@',
      },
    },
  ],
};

document.querySelector('#exportBtn').addEventListener('click', function () {
  gridOptions.api.exportDataAsExcel();
});

var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);

agGrid
  .simpleHttpRequest({
    url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
  })
  .then(function (data) {
    gridOptions.api.setRowData(data);
  });