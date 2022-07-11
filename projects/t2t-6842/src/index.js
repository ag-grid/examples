'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PictureCellRenderer = (props) => {
  const { animal } = props.data;

  const link = `https://www.pexels.com/search/${animal}/`;

  return (
    <a href={link} target='_blank'>
      {animal}
    </a>
  );
};

const dummyData = [
  {
    animal: 'Cat',
  },
  {
    animal: 'Horse',
  },
  {
    animal: 'Cow',
  },
];

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(dummyData);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'animal', cellRenderer: PictureCellRenderer },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
