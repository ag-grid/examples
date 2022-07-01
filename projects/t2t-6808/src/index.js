'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      minWidth: 150,
      editable: true,
      suppressKeyboardEvent: (params) => suppressEnter(params),
    },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
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
      .then((data) => setRowData(data.slice(0, 15)));
  }, []);

  const suppressEnter = (params) => {
    const KEY_ENTER = 'Enter';

    const key = params.event.key;

    const suppress = key === KEY_ENTER;

    return suppress;
  };

  const onCellKeyDown = (params) => {
    const KEY_ENTER_PRESSED = params.event.key === 'Enter';
    const editable = params.colDef.editable === true;
    const colKey = params.colDef.field;

    if (KEY_ENTER_PRESSED && editable) {
      params.api.startEditingCell({
        rowIndex: params.rowIndex + 1,
        colKey: colKey,
      });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          ref={gridRef}
          onCellKeyDown={onCellKeyDown}
          animateRows
          singleClickEdit
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
