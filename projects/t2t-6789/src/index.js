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
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'country',
      headerName: '',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      suppressSizeToFit: true,
      minWidth: 100,
      maxWidth: 100,
    },
    {
      field: 'year',
      headerName: 'Yeaar!',
      hide: false,
      initialHide: false,
      minWidth: 110,
      maxWidth: 120,
    },
    {
      field: 'athlete',
      headerName: 'Athlete!',
      hide: false,
      initialHide: false,
      minWidth: 110,
      maxWidth: 120,
    },
    {
      field: 'sport',
      headerName: 'Sports!!',
      hide: false,
      initialHide: false,
      minWidth: 110,
      maxWidth: 110,
    },
    {
      field: 'gold',
      headerName: 'Golds!!',
      hide: false,
      initialHide: false,
    },
    {
      field: 'silver',
      headerName: 'Silver!!',
      hide: true,
      initialHide: true,
    },
    {
      field: 'silver',
      headerName: 'Silver!!',
      hide: false,
      initialHide: false,
    },
    {
      field: 'bronze',
      headerName: 'Bronzee!!',
      hide: false,
      initialHide: false,
    },
    {
      field: 'bronze',
      headerName: 'Bronzee!!',
      hide: true,
      initialHide: true,
    },
  ]);

  const WELDING_SORT_MODEL = [
    {
      colId: 'Category',
      sort: 'asc',
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const handleAutoSizeAllColumns = (skipHeader) => {
    let allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  const onFirstDataRendered = () => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }

    gridColumnApi.applyColumnState({
      state: WELDING_SORT_MODEL,
      defaultState: { sort: null },
    });

    setTimeout(() => handleAutoSizeAllColumns(), 1000);
  };

  const onSelectionChanged = () => {
    setSelectedRows(gridApi.getSelectedRows());
  };

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data.slice(0, 15)));

    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          onFirstDataRendered={onFirstDataRendered}
          enableCellTextSelection
          onSelectionChanged={onSelectionChanged}
          sortModel={WELDING_SORT_MODEL}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'multiple'}
          rowMultiSelectWithClick
          suppressMaxRenderedRowRestriction
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
