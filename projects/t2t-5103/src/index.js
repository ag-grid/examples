'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import FakeServer from './fakeServer';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'athlete',
          headerComponentParams: {
            template:
              '<div class="ag-cell-label-container" role="presentation">' +
              '<input type="checkbox" id="header-checkbox"></input>'+
              '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
              '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
              '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
              '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
              '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
              '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
              '  <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
              '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
              '  </div>' +
              '</div>',
          },
        },
        {
          field: 'country',
        },
        { field: 'sport' },
        {
          field: 'gold',
          aggFunc: 'sum',
        },
        {
          field: 'silver',
          aggFunc: 'sum',
        },
        {
          field: 'bronze',
          aggFunc: 'sum',
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        flex: 1,
        minWidth: 180,
      },
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
      rowSelection: 'multiple',
    };
  }

  selectVisibleRows = () =>{
    this.gridApi.forEachNode(node=>{
      node.setSelected(true)
    })
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let headerCheckbox = document.querySelector('#header-checkbox')
    headerCheckbox.addEventListener('change', (event)=>{
      params.api.forEachNode(node=>{
        if(event.target.checked){
        node.setSelected(true)
        }else{
          node.setSelected(false)
        }
      })
    })
    const updateData = (data) => {
      var fakeServer = new FakeServer(data);
      var datasource = new ServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));


  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            rowModelType={this.state.rowModelType}
            serverSideStoreType={this.state.serverSideStoreType}
            rowSelection={this.state.rowSelection}
            animateRows={true}
            suppressAggFuncInHeader={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function ServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 200);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
