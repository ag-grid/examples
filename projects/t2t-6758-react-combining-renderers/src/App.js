import React, { useMemo, useState, useCallback, Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';


const ReactFunctionalCellRenderer = props => {
  return (<div style={{ border: '2px solid purple' }}>{props.value}</div>)
}

class JsCellRenderer {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.style.border = '2px solid blue';
    this.eGui.innerHTML = params.value;
  }

  getGui() {
    return this.eGui;
  }
}

class ReactClassCellRenderer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div style={{ border: '2px solid purple' }}>{this.props.value}</div>)
  }
}

const App = () => {
  const containerStyle = useMemo(() => ({ width: '1000px', height: '1000px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "React Functional", field: 'athlete', cellRenderer: ReactFunctionalCellRenderer, },
    { headerName: "JS Class", field: 'age', cellRenderer: JsCellRenderer, },
    { headerName: "React Class", field: 'country', cellRenderer: ReactClassCellRenderer }
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data.slice(0, 5)));
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
        ></AgGridReact>
      </div>
    </div>
  );
}


export default App;
