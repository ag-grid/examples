"use strict";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";


const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const GridExample = () => {

  // let quickFilter = null;


  const gridRef = useRef();
  const [quickFilter, setQuickFilter] = useState("");
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 220 },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        // setup the fake server with entire dataset
        var fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = createServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  const onQuickFilterGetChanged = useCallback((e) => {
    setQuickFilter(e.target.value);
  }, []);

  const previousFilter = usePrevious(quickFilter);

  // useEffect(() => {
  //   let quickFilterValueChanged =
  //     previousFilter !== quickFilter;

  //   if (quickFilterValueChanged === true) {
  //     // debounce or throttle this
  //     gridRef.current.api.refreshServerSideStore({ purge: true });
  //   }
  // }, []);

  return (
    <div style={containerStyle}>
      <input onChange={onQuickFilterGetChanged} />
      <h3>previous value is: {previousFilter}</h3>
      <h3>search value is: {quickFilter}</h3>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

const createServerSideDatasource = (server) => {
  return {
    getRows: (params) => {
      params.request.quickFilter = "";
      console.log(
        "[Datasource] - rows requested by grid: startRow = " +
          params.request.startRow +
          ", endRow = " +
          params.request.endRow
      );
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
};

const createFakeServer = (allData) => {
  return {
    getData: (request) => {
      let filteredData = allData;
      console.log(request, "***request");

      if (request.quickFilter.length > 0) {
        filteredData = allData.filter((row) => {
          for (let key in row) {
            let value = row[key] + "";
            if (value.toLowerCase().includes(request.quickFilter)) return true;
          }
          return false;
        });
      }

      let results = filteredData.slice(request.startRow, request.endRow);

      return {
        success: true,
        rows: results,
        lastRow: results.length - 1,
      };
    },
  };
};

render(<GridExample></GridExample>, document.querySelector("#root"));
