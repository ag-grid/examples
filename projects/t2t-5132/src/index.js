import "./styles.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

function MyCheckboxRenderer() { }

MyCheckboxRenderer.prototype.init = function (params) {
  this.params = params;
  this.node = this.params.node;
  this.colId = this.params.column.colId;
  this.parentNode = this.node.parent;

  this.eCheckbox = document.createElement('input');
  this.eCheckbox.setAttribute('type', 'checkbox');
  this.eCheckbox.indeterminate = params.value === 'indeterminate';
  this.eCheckbox.checked = params.value;

  this.eCheckbox.addEventListener('change', this.changeHandler.bind(this));
}

MyCheckboxRenderer.prototype.changeHandler = function (e) {
  let checked = e.target.checked;
  if (this.node.group) {
    this.node.setDataValue(this.colId, checked);
    this.node.allLeafChildren.forEach(childNode => {
      childNode.setDataValue(this.colId, checked);
    })
  } else {
    this.node.setDataValue(this.colId, checked);
    let allSiblingNodes = this.parentNode.allLeafChildren.filter(leafChild => leafChild.id !== this.node.id);
    let allSiblingsSameSelectionState = allSiblingNodes.every(node => node.data[this.colId] === checked);
    let parentSelectionState = allSiblingsSameSelectionState ? checked : 'indeterminate';
    this.parentNode.setDataValue(this.colId, parentSelectionState);
  }
  this.params.api.refreshCells({ columns: [this.params.column], force: true });
}

MyCheckboxRenderer.prototype.getGui = function () {
  return this.eCheckbox;

}


// specify the columns
const columnDefs = [
  { field: 'group', rowGroup: true, hide: true },
  { field: 'approverName' },
  { field: 'to', cellRenderer: MyCheckboxRenderer },
  { field: 'cc', cellRenderer: MyCheckboxRenderer },
  { field: 'bcc', cellRenderer: MyCheckboxRenderer },
];

const rowData = [
  { group: 1, approverName: 'User 1', to: false, cc: false, bcc: false },
  { group: 2, approverName: 'User 2', to: false, cc: false, bcc: false },
  { group: 3, approverName: 'User 3', to: false, cc: false, bcc: false },
  { group: 3, approverName: 'User 4', to: false, cc: false, bcc: false },
  { group: 3, approverName: 'User 5', to: false, cc: false, bcc: false },
  { group: 3, approverName: 'User 6', to: false, cc: false, bcc: false },
]

// let the grid know which columns to use
const gridOptions = {
  columnDefs,
  rowData,
  groupDefaultExpanded: -1
};

// lookup the container we want the Grid to use
const eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns &amp; data we want to use
new agGrid.Grid(eGridDiv, gridOptions);
