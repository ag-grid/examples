import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "./App.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const containerStyle = useMemo(
    () => ({ width: "1000px", height: "1000px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    {
      make: "a-1",
      model: "b-1",
      price: "c-1",
    },
    {
      make: "a-2",
      model: "b-2",
      price: "c-2",
    },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const getRowId = useCallback((rowData) => rowData.data.price, []);

  return (
    <div style={containerStyle}>
      <input onChange={onChange} />
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          getRowId={getRowId}
          quickFilterText={searchValue}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default App;
