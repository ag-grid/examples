'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import numeral from 'numeral';
class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColDef: {
        flex: 1,
        width: 90,
        resizable: true
      },
      rowData: null,
      counter: 0
    };
  }

  numberValueFormatter = (params) => {
    return params.value ? numeral(params.value).multiply(100).format('0,0.000') : '--';
  }

  customSumFunction = (params) => {
    var sum = 0;
    //console.log(params);
    params.values.forEach(function (value) { sum += Number(value); });
    return sum;
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
        <button onClick={() => this.setState(state => ({ counter: state.counter + 1 }))}>Increment Counter</button>
        <p>counter: {this.state.counter}</p>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          >
            <AgGridColumn field='athlete' />
            <AgGridColumn field='country' rowGroup={true} />
            <AgGridColumn field='age' valueFormatter={this.numberValueFormatter} aggFunc={this.customSumFunction} />
            <AgGridColumn field='year' valueFormatter={this.numberValueFormatter} aggFunc={this.customSumFunction} />
            <AgGridColumn field='gold' valueFormatter={this.numberValueFormatter} aggFunc={this.customSumFunction} />
            <AgGridColumn field='silver' valueFormatter={this.numberValueFormatter} aggFunc={this.customSumFunction} />
            <AgGridColumn field='bronze' valueFormatter={this.numberValueFormatter} aggFunc={this.customSumFunction} />
            <AgGridColumn field='total' valueFormatter={this.numberValueFormatter} aggFunc={this.customSumFunction} />

          </AgGridReact>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
