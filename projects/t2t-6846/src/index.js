'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import getData from './data';
import FullWidthCellRenderer from './fullWidthCellRenderer';

const isFullWidth = (data) => {
  if (data == null) {
    return false;
  }
  return ['Ireland', 'Spain', 'Italy'].indexOf(data.name) >= 0;
};

class CountryCellRenderer {
  init(params) {
    if (params.data) {
      const flag = `<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/${params.data.code}.png">`;

      const eTemp = document.createElement('div');
      eTemp.innerHTML = `<span style="cursor: default;">${flag} ${params.value}</span>`;
      this.eGui = eTemp.firstElementChild;
    }
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name', cellRenderer: CountryCellRenderer },
    { field: 'continent', rowGroup: true },
    { field: 'language', rowGroup: true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);
  const getRowHeight = useCallback((params) => {
    if (isFullWidth(params.data)) {
      return 100;
    }
  }, []);
  const isFullWidthRow = useCallback((params) => {
    return isFullWidth(params.rowNode.data);
  }, []);
  const fullWidthCellRenderer = useMemo(() => {
    return FullWidthCellRenderer;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowHeight={getRowHeight}
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRenderer}
          groupRowsSticky
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
