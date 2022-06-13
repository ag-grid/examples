import React, { useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";

const App = () => {
  const containerStyle = useMemo(
    () => ({ width: "1000px", height: "1000px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: "athlete", minWidth: 150 },
    { field: "age", maxWidth: 90 },
    {
      field: "country",
      minWidth: 150,
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      chartDataType: "category",
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: [
          "English",
          "Spanish",
          "French",
          "Portuguese",
          "Chocolate Island",
          "(other)",
        ],
        cellHeight: 20,
        formatValue: (value) => value.toUpperCase(),
        searchDebounceDelay: 500,
      },
    },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          rowGroupPanelShow={"always"}
          groupDisplayType={"groupRows"}
          cacheBlockSize={5}
          animateRows={true}
          suppressAggFuncInHeader={true}
          pagination
          paginationPageSize={25}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default App;
