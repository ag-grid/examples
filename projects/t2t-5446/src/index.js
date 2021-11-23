import "./styles.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

// specify the columns
const columnDefs = [
  { field: "make", cellRenderer: 'customCellRenderer'},
  { field: "model" },
  { field: "price" }
];

// let the grid know which columns to use
const gridOptions = {
  columnDefs: columnDefs,
  wrapText: true,
  autoHeight: true,
  components: {
    customCellRenderer: CustomCellRenderer
  }
};

// lookup the container we want the Grid to use
const eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns &amp; data we want to use
new agGrid.Grid(eGridDiv, gridOptions);

agGrid.simpleHttpRequest({ url: 'https://www.ag-grid.com/example-assets/row-data.json' }).then(data => {
  gridOptions.api.setRowData(data);
});

function CustomCellRenderer(){
  this.container = null
}
CustomCellRenderer.prototype.init = function(params){
  this.container = document.createElement('div');
  this.container.innerText = `\n${params.value}`
}

CustomCellRenderer.prototype.getGui = function(){
  return this.container  
}
