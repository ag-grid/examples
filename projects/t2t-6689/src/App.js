import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "country",
          minWidth: 150,
          enableRowGroup: true,
          enablePivot: true,
          pivot: true,
        },
        {
          field: "year",
          maxWidth: 90,
          enableRowGroup: true,
          enablePivot: true,
          pivot: true,
        },
        {
          field: "date",
          minWidth: 150,
        },
        {
          field: "age",
          maxWidth: 90,
        },
        {
          field: "sport",
          minWidth: 150,
        },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      rowData: null,
      groupDisplayState: "singleColumn",
      isDestroyed: false,
      counter: 0,
    };
  }

  destroyGrid(columnState) {
    let newState = {
      ...this.state,
      counter: this.state.counter + 1,
      groupDisplayState: columnState,
      isDestroyed: true,
    };
    console.log("new column state", newState.groupDisplayState);
    this.setState(newState);
    setTimeout(() => this.recreateGrid(), 0);
  }

  recreateGrid() {
    console.log(this.state.counter);
    let newState = {
      ...this.state,
      isDestroyed: false,
    };
    console.log("new state", newState);
    this.setState(newState);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      this.setState({ rowData: data.slice(0, 20) });
    };

    httpRequest.open(
      "GET",
      "https://www.ag-grid.com/example-assets/olympic-winners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return !this.state.isDestroyed ? (
      <div
        style={{
          width: "90%",
          height: "1000px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          displayType: <strong> {this.state.groupDisplayState} </strong>
          <br />
          <div>
            <button onClick={() => this.destroyGrid("singleColumn")}>
              Single Column
            </button>
            <button onClick={() => this.destroyGrid("multipleColumns")}>
              Multiple Columns
            </button>
          </div>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            sideBar={"columns"}
            groupDisplayType={this.state.groupDisplayState}
            rowGroupPanelShow={"always"}
          />
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}
