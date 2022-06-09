import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import './App.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
    ClientSideRowModelModule
]);


const App = () => {
    const containerStyle = useMemo(() => ({ width: '1000px', height: '1000px' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
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
  
  
    return (
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
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