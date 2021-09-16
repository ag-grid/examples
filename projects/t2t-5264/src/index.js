import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

function ButtonCellRenderer() { }

ButtonCellRenderer.prototype.init = function (params) {
  this.eButton = document.createElement('button');
  this.eButton.textContent = params.buttonText;
  this.eButton.addEventListener('click', () => params.clicked(params.node));
}

ButtonCellRenderer.prototype.getGui = function () {
  return this.eButton;
}
var gridOptions = {
  columnDefs: [
    {
      headerName: 'Change Editable',
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: {
        buttonText: 'click me',
        clicked: node => node.setDataValue('editable', !node.data.editable)
      }
    },
    {
      headerName: 'Is Editable',
      field: 'editable',
      valueFormatter: params => params.value.toString(),
      editable: false
    },
    {
      field: 'athlete',
      minWidth: 150,
      editable: params => params.data.editable
    }
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
  },
};

var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);

agGrid
  .simpleHttpRequest({
    url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
  })
  .then(function (data) {
    data.forEach(row => row.editable = true);
    gridOptions.api.setRowData(data);
  });
