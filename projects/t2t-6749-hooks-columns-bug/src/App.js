import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

const App = () => {

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const [count, setCount] = useState(0);
  const gridRef = useRef();
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  useEffect(() => {
    if (gridRef.current.columnApi) {
      gridRef.current.columnApi.setColumnsVisible([columnDefs[count].field], false);
    }
  });


  return (
    <div style={{ width: '1000px', height: '1000px' }}>
      <button onClick={() => setCount(count + 1)}>Update Component</button>
      {count}
      <div style={{ height: '100%', width: '100%' }} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}


export default App;
