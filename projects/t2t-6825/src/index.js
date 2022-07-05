'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridRef = useRef();
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
    { headerName: 'Second Gold', field: 'gold' },
    { headerName: 'Second Silver', field: 'silver' },
    { headerName: 'Second Bronze', field: 'bronze' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      // flex: 1,
      minWidth: 100,
    };
  }, []);

  const onBodyScroll = (e) => {
    let direction = e.direction === 'horizontal';
    let left = e.left > 100;
    if (direction && left) {
      gridRef.current.columnApi.applyColumnState({
        state: [{ colId: 'athlete', pinned: 'left' }],
        defaultState: { pinned: null },
      });
    } else if (!left)
      gridRef.current.columnApi.applyColumnState({
        defaultState: { pinned: null },
      });
  };

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection
          onGridReady={onGridReady}
          onBodyScroll={onBodyScroll}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
