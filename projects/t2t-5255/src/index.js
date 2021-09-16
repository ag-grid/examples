import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

var columnDefs = [
  { field: 'employeeId', hide: true },
  { field: 'employeeName', hide: true },
  { field: 'jobTitle' },
  { field: 'employmentType' },
];

var gridOptions = {
  defaultColDef: {
    width: 240,
    filter: 'agTextColumnFilter',
    flex: 1,
  },
  autoGroupColumnDef: {
    field: 'employeeName',
    cellRenderer: CustomGroupRenderer,
    // cellRendererParams: {
    //   innerRenderer: function (params) {
    //     // display employeeName rather than group key (employeeId)
    //     return params.data.employeeName;
    //   },
    // },
  },
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',
  treeData: true,
  columnDefs: columnDefs,
  animateRows: true,
  groupDefaultExpanded: -1,
  isServerSideGroupOpenByDefault: function (params) {
    // open first two levels by default
    return params.rowNode.level < 2;
  },
  isServerSideGroup: function (dataItem) {
    // indicate if node is a group
    return dataItem.group;
  },
  getServerSideGroupKey: function (dataItem) {
    // specify which group key to use
    return dataItem.employeeId;
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);

agGrid
  .simpleHttpRequest({
    url: 'https://www.ag-grid.com/example-assets/small-tree-data.json',
  })
  .then(function (data) {
    var fakeServer = createFakeServer(data);
    var datasource = createServerSideDatasource(fakeServer);
    gridOptions.api.setServerSideDatasource(datasource);
  });

function createFakeServer(fakeServerData) {
  function FakeServer(allData) {
    this.data = allData;
  }

  FakeServer.prototype.getData = function (request) {
    function extractRowsFromData(groupKeys, data) {
      if (groupKeys.length === 0) {
        return data.map(function (d) {
          return {
            group: !!d.children,
            employeeId: d.employeeId,
            employeeName: d.employeeName,
            employmentType: d.employmentType,
            jobTitle: d.jobTitle,
          };
        });
      }

      var key = groupKeys[0];
      for (var i = 0; i < data.length; i++) {
        if (data[i].employeeId === key) {
          return extractRowsFromData(
            groupKeys.slice(1),
            data[i].children.slice()
          );
        }
      }
    }

    return extractRowsFromData(request.groupKeys, this.data);
  };

  return new FakeServer(fakeServerData);
}

function createServerSideDatasource(fakeServer) {
  function ServerSideDatasource(fakeServer) {
    this.fakeServer = fakeServer;
  }

  ServerSideDatasource.prototype.getRows = function (params) {
    // console.log('ServerSideDatasource.getRows: params = ', params);

    var allRows = this.fakeServer.getData(params.request);

    var request = params.request;
    var doingInfinite = request.startRow != null && request.endRow != null;
    var result = doingInfinite
      ? {
        rowData: allRows.slice(request.startRow, request.endRow),
        rowCount: allRows.length,
      }
      : { rowData: allRows };
    // console.log('getRows: result = ', result);
    setTimeout(function () {
      params.success(result);
    }, 200);
  };

  return new ServerSideDatasource(fakeServer);
}


function CustomGroupRenderer() { }

CustomGroupRenderer.prototype.init = function (params) {
  this.params = params;
  console.log(params.value, params);
  this.eGui = document.createElement('div');
  this.eGui.style.paddingLeft = this.params.node.uiLevel * 20 + 'px';
  if (!params.node.group) {
    this.eGui.innerHTML = `<span 
    style="padding-left: ${this.params.node.uiLevel > 0 ? 10 : 0}px"
    >${params.value ? params.value : ''}</span>`;
  } else {
    this.eGui.innerHTML = `
      <span class="group-control-container" style="padding: 10px; cursor: pointer">
        <i class="${params.node.expanded ? 'fas fa-caret-down' : 'fas fa-caret-right'}"></i>
      </span>
      <span>${params.value ? params.value : ''}</span>
    `;

    this.eGroupControlContainer = this.eGui.querySelector('.group-control-container');
    this.onGroupClicked = this.onGroupClicked.bind(this);
    this.eGroupControlContainer.addEventListener('click', this.onGroupClicked);
  }
}

CustomGroupRenderer.prototype.onGroupClicked = function () {
  this.params.node.setExpanded(!this.params.node.expanded);
  if (this.params.node.expanded) {
    this.eGroupControlContainer.innerHTML = '<i class="fas fa-caret-down"></i>';
  } else {
    this.eGroupControlContainer.innerHTML = '<i class="fas fa-caret-right"></i>';
  }
}

CustomGroupRenderer.prototype.getGui = function () {
  return this.eGui;
}

CustomGroupRenderer.prototype.destroy = function () {
  if (this.params.node.allChildrenCount > 1) {
    this.eGroupControlContainer.removeEventListener('click', this.onGroupClicked);
  }
}

