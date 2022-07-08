import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import * as agGrid from 'ag-grid-community';

class ReversedRenderer {
  init(params) {
    this.eGui = document.createElement('span');

    this.eGui.innerHTML = params.value
      .toUpperCase()
      .split('')
      .reverse()
      .join('');
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

class DoublingEditor {
  init(params) {
    this.value = params.value;

    this.input = document.createElement('input');
    this.input.id = 'input';
    this.input.value = this.value;

    this.input.addEventListener('input', (event) => {
      this.value = event.target.value;
    });
  }

  /* Component Editor Lifecycle methods */
  // gets called once when grid ready to insert the element
  getGui() {
    return this.input;
  }

  getValue() {
    return this.value + this.value;
  }

  // Gets called once before editing starts, to give editor a chance to
  // cancel the editing before it even starts.
  isCancelBeforeStart() {
    return false;
  }

  // after this component has been created and inserted into the grid
  afterGuiAttached() {
    this.input.focus();
  }
}

var gridOptions = {
  columnDefs: [
    {
      field: 'athlete',
      minWidth: 150,
      cellRenderer: ReversedRenderer,
      cellEditor: DoublingEditor,
    },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    editable: true,
  },
  enableRangeSelection: true,
  singleClickEdit: true,
  stopEditingWhenCellsLoseFocus: true,
  editType: 'fullRow',
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api.setRowData(data.slice(0, 5)));
