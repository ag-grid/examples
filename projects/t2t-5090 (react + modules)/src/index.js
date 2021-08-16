'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { LicenseManager } from '@ag-grid-enterprise/core';
import { AgGridReact } from '@ag-grid-community/react';
import { MenuModule } from '@ag-grid-enterprise/menu'
import { SideBarModule } from '@ag-grid-enterprise/side-bar'
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export'
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection'
import { CsvExportModule } from '@ag-grid-community/csv-export'
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel'
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel'
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

LicenseManager.setLicenseKey('license key goes here')

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: [MenuModule, SideBarModule, ExcelExportModule, RangeSelectionModule,
      CsvExportModule,ClientSideRowModelModule, ColumnsToolPanelModule, FiltersToolPanelModule],
      columnDefs: [
        {
          field: 'athlete',
          filter: 'agTextColumnFilter',
          minWidth: 200,
        },
        { field: 'age' },
        {
          field: 'country',
          minWidth: 180,
        },
        { field: 'year' },
        {
          field: 'date',
          minWidth: 150,
        },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
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
          className="ag-theme-alpine"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            sideBar={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
