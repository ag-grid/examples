import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';


const MedalCellRenderer = props => {

  return <div>{new Array(parseInt(props.value,10)).fill('#').join('')}</div>
}

const App = () => {

  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState();

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json').then(response => response.json()).then(response => setRowData(response)
    )
  }, [])

  const columnDefs = [
    {
      field: "athlete",
    },
    {
      field: 'age',
    },
    {
      field: 'country',
    },
    {
      field: 'year',
    },
    {
      field: 'date',
    },
    {
      field: 'sport',
    },
    { field: 'gold', cellRendererFramework: MedalCellRenderer },
    { field: 'silver', cellRendererFramework: MedalCellRenderer},
    { field: 'bronze', cellRendererFramework: MedalCellRenderer },
    { field: 'total', cellRendererFramework: MedalCellRenderer },
    {
      field: "athlete",
    },
    { field: 'gold', cellRendererFramework: MedalCellRenderer },
    { field: 'silver', cellRendererFramework: MedalCellRenderer},
    { field: 'bronze', cellRendererFramework: MedalCellRenderer },
    { field: 'total', cellRendererFramework: MedalCellRenderer },
    {
      field: 'age',
    },
    {
      field: 'country',
    },
    {
      field: 'year',
    },
    {
      field: 'date',
    },
    {
      field: 'sport',
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable:true
  };

  const onGridReady = (params) => {
    setGridApi(params.api)
  }

  return (
    <div style={{ width: '90%', height: '500px', margin: 'auto', marginTop: "50px" }}>
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
          reactUi={true}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      </div>
    </div>
  );

}

export default App;