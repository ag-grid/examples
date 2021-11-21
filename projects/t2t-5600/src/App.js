import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

const App = () => {

  const columnDefs = [
    {
      field: 'athlete',
      minWidth: 150,
    },
    {
      field: 'age',
      maxWidth: 90,
    },
    {
      field: 'country',
      minWidth: 150,
    },
    {
      field: 'year',
      maxWidth: 90,
    },
    {
      field: 'date',
      minWidth: 150,
    },
    {
      field: 'sport',
      minWidth: 150,
    },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  const [rowData, setRowData] = useState();


  const onGridReady = (params) => {


    const updateData = (data) => {
      setRowData(data)
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json').then(res => res.json()).then(data => updateData(data))


  };



  return (
    <div style={{ width: '90%', height: '500px', margin: 'auto', marginTop: "100px" }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      </div>
    </div>
  );

}
export default App;