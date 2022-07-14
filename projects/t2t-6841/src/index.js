'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import data from './data.json';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [shouldBatchUpdate, setShouldBatchUpdate] = useState(false);
  const [updatedBatch, setUpdatedBatch] = useState({
    startRowIndex: 0,
    endRowIndex: 0,
    colIds: [],
    gridApi: null,
  });
  const editValueRef = useRef('');
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(data);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'country' },
    { field: 'age' },
    { field: 'year' },
    { field: 'sport' },
  ]);

  const editSelectedCells = (start, end, columns, gridApi, value) => {
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
          newRow[colId] = value;
        });

        return newRow;
      })
    );
  };

  const onSuppressKeyboardEvent = (params) => {
    let isCtrlKey = params.event.ctrlKey;
    let isEnterKey = params.event.key === 'Enter';

    let selectedRows = params.api.getCellRanges();

    let isEditing = params.editing;

    // toggle shouldBatchUpdate to true here

    if (isEditing) {
      if (isCtrlKey && isEnterKey) {
        selectedRows.forEach((range) => {
          let colIds = range.columns.map((col) => col.colId);

          let startRowIndex = Math.min(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );
          let endRowIndex = Math.max(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );

          //send editSelectedCells to oncelleditingstopped

          setUpdatedBatch({
            startRowIndex: startRowIndex,
            endRowIndex: endRowIndex,
            colIds: colIds,
            gridApi: params.api,
          });
        });

        setShouldBatchUpdate(true);
      }
    }
  };

  const onCellEditingStopped = (params) => {
    editValueRef.current = params.newValue;
    if (shouldBatchUpdate) {
      editSelectedCells(
        updatedBatch.startRowIndex,
        updatedBatch.endRowIndex,
        updatedBatch.colIds,
        updatedBatch.gridApi,
        editValueRef.current
      );

      setShouldBatchUpdate(false);
    }

    console.log(updatedBatch, 'updatedBatchState');
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      suppressKeyboardEvent: onSuppressKeyboardEvent,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    const listener = (event, eventType) => {
      console.log(event, eventType);
    };
    // params.api.addGlobalListener(listener);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, []);

  return (
    <>
      There is {rowData.length} rows
      <div style={containerStyle}>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            getRowId={({ data }) => data.id}
            rowSelection='multiple'
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection
            onCellEditingStopped={onCellEditingStopped}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
