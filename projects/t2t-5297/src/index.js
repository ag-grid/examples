import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";


class CustomNoRowsOverlay {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `<div class="noRowsOverlay-custom">${this.getMessage(params)}</div>`
  }
  getMessage(params) {
    let filterModel = params.api.getFilterModel();
    if (Object.keys(filterModel).length > 0) {
      return 'No Filter Results';
    }
    return 'No Rows To Show'
  }
  getGui() {
    return this.eGui;
  }
}

const columnDefs = [
  { field: 'country', width: 120 },
];

const gridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },

  // set rowData to null or undefined to show loading panel by default
  rowData: [],
  columnDefs: columnDefs,
  noRowsOverlayComponent: CustomNoRowsOverlay,
  onFilterChanged: params => {
    let filterModel = params.api.getFilterModel();
    if (filterModel.country && filterModel.country.values.length === 0) {
      params.api.showNoRowsOverlay();
    }
  }
};




document.querySelector('#addRowData').addEventListener('click', () => {
  agGrid
    .simpleHttpRequest({
      url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
    })
    .then((data) => {
      gridOptions.api.setRowData(data);
    });
})

document.querySelector('#filterByNoCountry').addEventListener('click', () => {
  gridOptions.api.setFilterModel({
    country: {
      filterType: "set",
      values: []
    }
  })
})

const gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);


