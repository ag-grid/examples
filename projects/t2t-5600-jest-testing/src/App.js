import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=HERMES INTERNATIONAL,LicensedApplication=HERMES DIGITAL BO 1,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-021408,ExpiryDate=22_October_2022_[v2]_MTY2NjM5MzIwMDAwMA==6c0ebe050fe6ab7d2249bf5c36bf1f7d')


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'make',
        },
        {
          field: 'model',
        },
        {
          field: 'price',
        },],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowData: [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: '90%', height: '500px', margin: 'auto', marginTop: "100px" }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}
