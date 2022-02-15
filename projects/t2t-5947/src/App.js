import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import {MasterDetailModule} from '@ag-grid-enterprise/master-detail';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const DetailCellRenderer = () => (
  <h1 style={{ padding: "20px" }}>My Custom Detail</h1>
);
 

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
   const [reactUi, setReactUi] = useState(false);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data.concat(data)));
  };


  const openDetailGrid = () =>{
    console.time (`open`)
    gridApi.forEachNode(function (node) {
      node.setExpanded(node.id === '1');
    });
  }

const onRowGroupOpened = params =>{
  console.timeEnd (`open`)
}  

  return (
    <div style={{ width: '500px', height: '500px' }}>
    <button onClick={()=>{
      openDetailGrid()
    }}>Open detail</button>
     <label><input
        type={'checkbox'}
        onChange={() => {
          setReactUi(!reactUi);
        }}
      ></input>Toggle ReactUi</label>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          masterDetail={true}
          modules={[ClientSideRowModelModule, MasterDetailModule]}
          detailCellRenderer={'myDetailCellRenderer'}
          components={{ myDetailCellRenderer: DetailCellRenderer }}
          onRowGroupOpened={onRowGroupOpened}
          onGridReady={onGridReady}
          rowData={rowData}
          suppressReactUi={reactUi}
        >
          <AgGridColumn
            field="athlete"
            minWidth={150}
            cellRenderer={'agGroupCellRenderer'}
          />
          <AgGridColumn field="age" maxWidth={90} />
          <AgGridColumn field="country" minWidth={150} />
        </AgGridReact>
      </div>
    </div>
  );
};

export default GridExample
