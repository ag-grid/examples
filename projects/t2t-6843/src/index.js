import React, { useCallback, useMemo, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CheckboxRenderer from './CheckboxRenderer';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: 'athlete', minWidth: 150 },
    {
      headerName: 'Registered - Checkbox',
      field: 'registered',
      cellRenderer: CheckboxRenderer,
    },
    {
      headerName: 'Registered - Boolean',
      field: 'registered',
      valueGetter: (params) =>
        params.data.registered === true ? 'is true' : 'is false',
    },
    {
      headerName: 'POC - false',
      valueGetter: () => false,
    },
    {
      headerName: 'POC - true',
      valueGetter: () => true,
    },
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
      .then((data) =>
        setRowData(
          data
            .map((d) => ({
              ...d,
              registered: Math.random() < 0.5,
            }))
            .slice(0, 3)
        )
      );
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
