import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

// the 10 athletes with the most medals
let top10Athletes = [];

var gridOptions = {
  columnDefs: [
    {
      field: 'athlete',
      rowGroup: true,
      hide: true,
      valueGetter: params => {
        if (params.node.group) {
          return params.node.key;
        }
        let cellValue = params.data[params.column.colId];
        if (top10Athletes.includes(cellValue)) {
          return cellValue;
        } else {
          return 'Other';
        }
      },
      minWidth: 150
    },
    { field: 'total', aggFunc: 'sum', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
  },
  autoGroupColumnDef: {
    minWidth: 200
  }
};




var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);

agGrid
  .simpleHttpRequest({
    url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
  })
  .then(function (data) {
    let sortedData = data.sort((a, b) => b.total - a.total);

    let i = 0;
    let top10AthletesSet = new Set();
    while (top10AthletesSet.size < 10) {
      top10AthletesSet.add(sortedData[i].athlete);
      i++
    }
    top10Athletes = Array.from(top10AthletesSet);

    gridOptions.api.setRowData(data);
  });
