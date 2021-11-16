'use strict';

import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

export default function  App() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

    const onRowDragMove = (params) =>{
    const movingNode = params.node;
    const overNode = params.overNode;
    if (movingNode === overNode || overNode == null) {
      return;
    }

    const fromIndex = rowData.indexOf(movingNode.data);
    const toIndex = rowData.indexOf(overNode.data);

    const newRowData = rowData.slice();
    newRowData.splice(fromIndex, 1);
    newRowData.splice(toIndex, 0, movingNode.data);

    setRowData(newRowData);
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      data.length = 100
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={[
            ClientSideRowModelModule,
          ]}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
          }}
          enableRangeSelection={true}
          onGridReady={onGridReady}
          rowData={rowData}
          onRowDragMove={onRowDragMove}
          reactUI="true"
        >
          <AgGridColumn field="athlete" minWidth={150} rowDrag />
          <AgGridColumn field="age" maxWidth={90} />
          <AgGridColumn field="country" minWidth={150} />
          <AgGridColumn field="year" maxWidth={90} />
          <AgGridColumn field="date" minWidth={150} />
          <AgGridColumn field="sport" minWidth={150} />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
};


