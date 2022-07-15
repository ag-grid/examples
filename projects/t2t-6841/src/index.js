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
  const [rowData, setRowData] = useState(data);
  const [columnDefs] = useState([
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
    let isEditing = params.editing;

    if (isEditing) {
      if (isCtrlKey && isEnterKey) {
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

          setUpdatedBatch({
            startRowIndex,
            endRowIndex,
            colIds,
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
      const { startRowIndex, endRowIndex, colIds, gridApi } = updatedBatch;

      editSelectedCells(
        startRowIndex,
        endRowIndex,
        colIds,
        gridApi,
        editValueRef.current
      );

      setShouldBatchUpdate(false);
    }
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      suppressKeyboardEvent: onSuppressKeyboardEvent,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          getRowId={({ data }) => data.id}
          rowSelection='multiple'
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection
          enableCellChangeFlash
          onCellEditingStopped={onCellEditingStopped}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
