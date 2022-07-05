import React, { useMemo, useState, forwardRef, useCallback, useImperativeHandle } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CustomCellEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return value;
      }
    }
  })

  return (<div style={{ width: '100%', padding: '8px' }}><Autocomplete
    id="combo-box-demo"
    value={value}
    onChange={({ target }) => setValue(target.innerHTML)}
    isOptionEqualToValue={({ label }) => (label === value)}
    options={countries}
    sx={{ width: '100%' }}
    renderInput={(params) => <TextField {...params} label="Country" />}
  /></div>)
});

const countries = [
  { label: 'United States' },
  { label: 'Australia' },
  { label: 'United Kingdom' },
  { label: 'Ireland' },
];

const App = () => {
  const containerStyle = useMemo(() => ({ width: '100vh', padding: '24px', height: '100vh' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', cellStyle: { height: '100%' }, cellEditor: CustomCellEditor, minWidth: 150 }
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);


  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          onGridReady={onGridReady}
          rowHeight={75}
        ></AgGridReact>
      </div>
    </div>
  );
}


export default App;
