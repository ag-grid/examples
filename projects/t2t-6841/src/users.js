import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import data from './data.json';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const columnDefs = [
    [
      {
        field: 'athlete',
        minWidth: 150,
        checkboxSelection: true,
      },
      { field: 'age', maxWidth: 90 },
      { field: 'country', minWidth: 150 },
      { field: 'sport', minWidth: 150 },
      { field: 'gold' },
    ],
  ];

  const [rowData, setRowData] = useState(data);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const clearCells = (start, end, columns, gridApi) => {
    let rowIds = {}; // only update rows that ids exists within this obj

    for (let i = start; i <= end; i++) {
      let rowId = gridApi.rowModel.rowsToDisplay[i].id;
      rowIds[rowId] = true;
    }

    setRowData((prevRowData) =>
      prevRowData.map((row) => {
        if (!rowIds[row.id]) return row;

        let newRow = { ...row };

        columns.forEach((colId) => {
          newRow[colId] = '';
        });

        return newRow;
      })
    );
  };

  const onSuppressKeyboardEvent = (params) => {
    if (!params.editing) {
      let isBackspaceKey = params.event.keyCode === 8;
      let isDeleteKey = params.event.keyCode === 46;

      // Delete selected rows with back space

      if (isBackspaceKey) {
        const selectedRows = params.api.getSelectedRows();

        setRowData(
          rowData.filter((row) => {
            return selectedRows.indexOf(row) == -1; // filter out selected rows
          })
        );

        return true;
      }

      // delete range selected cell values

      if (isDeleteKey) {
        // for each of our range selection

        params.api.getCellRanges().forEach((range) => {
          let colIds = range.columns.map((col) => col.colId);

          let startRowIndex = Math.min(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );
          let endRowIndex = Math.max(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );

          clearCells(startRowIndex, endRowIndex, colIds, params.api);
        });
      }

      return false;
    }
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 600 }}>
      <AgGridReact
        getRowNodeId={(n) => n.id}
        immutableData={true}
        rowSelection={'multiple'}
        enableRangeSelection={true}
        onGridReady={onGridReady}
        rowData={rowData}
        defaultColDef={{
          suppressKeyboardEvent: onSuppressKeyboardEvent,
        }}
      >
        <AgGridColumn field='athlete' minWidth={150} checkboxSelection={true} />
        <AgGridColumn field='age' />
        <AgGridColumn field='country' />
        <AgGridColumn field='sport' />
        <AgGridColumn field='gold' />
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));
