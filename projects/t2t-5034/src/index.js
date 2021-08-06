import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";
let draggedOverNodeHandler = (() => {
  let nodeChildrenList = null;
  let nodeId = null;

  return function (newNodeChildren, newNodeId, dragHasEnded = false) {
    if (dragHasEnded) {
      nodeChildrenList.forEach(child => {
        child.classList.remove('hover-over');
      });

      nodeChildrenList = null;
      nodeId = null;

      return;
    }

    // if hovering over same thing
    let isSameNode = nodeId === newNodeId;
    if (isSameNode) return;

    if (nodeId === null) {
      nodeId = newNodeId;
      nodeChildrenList = newNodeChildren;

      nodeChildrenList.forEach(child => {
        child.classList.add('hover-over');
      });
    }

    // if not the same node and node id already exists

    if (nodeId !== newNodeId) {
      nodeChildrenList.forEach(child => {
        child.classList.remove('hover-over');
      });

      nodeChildrenList = newNodeChildren;
      nodeId = newNodeId;

      nodeChildrenList.forEach(child => {
        child.classList.add('hover-over');
      });
    }
  };
})();

var rowIdSequence = 100;

var leftColumnDefs = [
  { field: 'id', dndSource: true, rowDrag: true, },
  { field: 'color' },
  { field: 'value1' },
  { field: 'value2' }
];

var rightColumnDefs = [
  { field: 'id', dndSource: true, rowDrag: true, },
  { field: 'color' },
  { field: 'value1' },
  { field: 'value2' }
];

var leftGridOptions = {
  defaultColDef: {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true
  },
  rowClassRules: {
    'red-row': 'data.color == "Red"',
    'green-row': 'data.color == "Green"',
    'blue-row': 'data.color == "Blue"',
  },
  getRowNodeId: function (data) { return data.id; },
  rowData: createLeftRowData(),
  rowDragManaged: true,
  columnDefs: leftColumnDefs,
  animateRows: true,
  onRowDragMove: event => {
    if (event.overNode) {
      let rowNodeChildren = document.querySelectorAll(
        `#eLeftGrid [row-id="${event.overNode.id}"] > div`
      );
      draggedOverNodeHandler([...rowNodeChildren], event.overNode.id);
    }
  },
  onRowDragEnd: params => {
    draggedOverNodeHandler(null, null, true);
  }
};

var rightGridOptions = {
  defaultColDef: {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true
  },
  rowClassRules: {
    'red-row': 'data.color == "Red"',
    'green-row': 'data.color == "Green"',
    'blue-row': 'data.color == "Blue"',
  },
  getRowNodeId: function (data) { return data.id; },
  rowData: [],
  rowDragManaged: true,
  columnDefs: rightColumnDefs,
  animateRows: true,
  onRowDragMove: event => {
    if (event.overNode) {
      let rowNodeChildren = document.querySelectorAll(
        `#eRightGrid [row-id="${event.overNode.id}"] > div`
      );
      draggedOverNodeHandler([...rowNodeChildren], event.overNode.id);
    }
  },
  onRowDragEnd: params => {
    draggedOverNodeHandler(null, null, true);
  }
};

function createLeftRowData() {
  return ['Red', 'Green', 'Blue'].map(function (color) {
    return createDataItem(color);
  });
}

function createDataItem(color) {
  return {
    id: rowIdSequence++,
    color: color,
    value1: Math.floor(Math.random() * 100),
    value2: Math.floor(Math.random() * 100)
  };
}


function gridDragOver(event) {
  var dragSupported = event.dataTransfer.types.length;

  if (dragSupported) {
    event.dataTransfer.dropEffect = 'copy';
    event.preventDefault();
  }

}

function gridDrop(event, grid) {
  event.preventDefault();

  var userAgent = window.navigator.userAgent;
  var isIE = userAgent.indexOf('Trident/') >= 0;

  var jsonData = event.dataTransfer.getData(isIE ? 'text' : 'application/json');
  var data = JSON.parse(jsonData);

  // if data missing or data has no it, do nothing
  if (!data || data.id == null) { return; }

  var gridApi = grid == 'left' ? leftGridOptions.api : rightGridOptions.api;

  // do nothing if row is already in the grid, otherwise we would have duplicates
  var rowAlreadyInGrid = !!gridApi.getRowNode(data.id);
  if (rowAlreadyInGrid) {
    console.log('not adding row to avoid duplicates in the grid');
    return;
  }

  var transaction = {
    add: [data]
  };
  gridApi.applyTransaction(transaction);
}

var leftGridDiv = document.querySelector('#eLeftGrid');
new agGrid.Grid(leftGridDiv, leftGridOptions);

var rightGridDiv = document.querySelector('#eRightGrid');
new agGrid.Grid(rightGridDiv, rightGridOptions);

