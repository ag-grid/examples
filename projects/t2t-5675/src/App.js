import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
  };

  return (
      <div style={{ width: '600px', height: '550px' }}>
        <div
            id="myGrid"
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
        >
          <AgGridReact
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              groupDisplayType={'custom'}
              enableRangeSelection={true}
              animateRows={true}
              onGridReady={onGridReady}
              rowData={rowData}
              // autoGroupColumnDef={{pinned: true}}
              reactUi={true}
          >
            <AgGridColumn
                headerName="Group"
                cellRenderer="agGroupCellRenderer"
                showRowGroup={true}
                pinned={'left'}
            />
            <AgGridColumn field="country" rowGroup={true} hide={true}/>
            <AgGridColumn field="year" rowGroup={true} hide={true} />
            <AgGridColumn field="athlete" />
            <AgGridColumn field="gold" />
            <AgGridColumn field="silver" />
            <AgGridColumn field="bronze" />
          </AgGridReact>
        </div>
      </div>
  );
};
