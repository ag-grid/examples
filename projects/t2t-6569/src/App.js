import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import dummyData from "./rowData.js";
import moment from 'moment-timezone/moment-timezone';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "name" },
        {
          headerName: "On",
          field: "addeddate",
          sortable: true,
          resizable: true,
          filter: true,
          width: 30,
          valueFormatter: (params) => this.formatDateTime(params.value),
          flex: 1,
        },
        {
          headerName: "Quote",
          field: "quote",
          minWidth: 150,
          sortable: true,
          resizable: true,
          filter: true,
          width: 275,
          autoHeight: true,
          flex: 1,
          cellClass: "cell-wrap-text",
        },
      ],
      defaultColDef: {
        minWidth: 100,
        resizable: true,
      },
      rowData: dummyData,
      rowClassRules: {
        // row style function
        "sick-days-warning": (params) => {
          const name = params.data.name;
          return name === "Kiz";
        },
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onColumnResized = (params) => {
    params.api.resetRowHeights();
  };

  formatDateTime = (dateTimeString) => {
    if (dateTimeString) {
      return moment(dateTimeString)
        .tz("America/Chicago")
        .format("MM/DD/YYYY h:mm:ss A");
    } else {
      return "";
    }
  };


  render() {
    return (
      <div style={{ width: "100%", height: "1000px" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            //onColumnResized={this.onColumnResized.bind(this)}
            rowClassRules={this.state.rowClassRules}
          />
        </div>
      </div>
    );
  }
}

export default App;
