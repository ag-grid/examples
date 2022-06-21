'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
  constructor(props) {
    super(props);
    this.onQuickFilterChanged = this.onQuickFilterChanged.bind(this);
    this.state = {
      quickFilter: '',
      modules: [ServerSideRowModelModule, MenuModule, ColumnsToolPanelModule],
      columnDefs: [
        {
          field: 'athlete',
          minWidth: 220,
        },
        {
          field: 'country',
          minWidth: 200,
        },
        { field: 'year' },
        {
          field: 'sport',
          minWidth: 200,
        },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowModelType: 'serverSide',
    };
  }

  onQuickFilterChanged(e) {
    this.setState({ ...this.state, quickFilter: e.target.value });
  }

  componentDidUpdate(_, prevState) {
    let quickFilterValueChanged =
      prevState.quickFilter !== this.state.quickFilter;

    if (this.gridApi && quickFilterValueChanged === true) {
      // debounce or throttle this
      this.gridApi.refreshServerSideStore({ purge: true });
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      var fakeServer = new FakeServer(data);
      var datasource = this.createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    httpRequest.open(
      'GET',
      'https://www.ag-grid.com/example-assets/olympic-winners.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  createServerSideDatasource(server) {
    return {
      getRows: (params) => {
        params.request.quickFilter = this.state.quickFilter;
        console.log('[Datasource] - rows requested by grid: ', params.request);
        var response = server.getData(params.request);
        setTimeout(function () {
          if (response.success) {
            params.success({ rowData: response.rows });
          } else {
            params.fail();
          }
        }, 500);
      },
    };
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <input onChange={this.onQuickFilterChanged} />
        <br />
        quickFilter : {this.state.quickFilter}
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowModelType={this.state.rowModelType}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function FakeServer(allData) {
  return {
    getData: (request) => {
      let filteredData = allData;

      if (request.quickFilter.length > 0) {
        filteredData = allData.filter((row) => {
          for (let key in row) {
            let value = row[key] + '';
            if (value.toLowerCase().includes(request.quickFilter)) return true;
          }
          return false;
        });
      }

      let results = filteredData.slice(request.starrtRow, request.endRow);

      return {
        success: true,
        rows: results,
        lastRow: results.length - 1,
      };
    },
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
