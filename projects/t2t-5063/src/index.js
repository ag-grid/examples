import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import './styles.css';

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Age - NumberFormat(0)',
      field: 'age',
      cellClass: 'numberType',
      cellClassRules: {
        magentaBackground: () => true,
      },
    },
    {
      headerName: 'Age - twoDP',
      field: 'age',
      cellClass: 'twoDecimalPlaces',
      cellClassRules: {
        greenBackground: function (params) {
          return params.value < 23;
        },
        redFont: function (params) {
          return params.value < 20;
        },
      },
    },
    {
      field: 'date',
      minWidth: 150,
      cellClass: 'dateFormat',
      valueGetter: function (params) {
        var val = params.data.date;

        if (val.indexOf('/') < 0) {
          return val;
        }

        var split = val.split('/');

        return split[2] + '-' + split[1] + '-' + split[0];
      },
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const onBtExport = () => {
    gridApi.exportDataAsExcel();
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="container">
        <div>
          <button
            onClick={() => onBtExport()}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
        </div>
        <div className="grid-wrapper">
          <div
            id="myGrid"
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={AllModules}
              defaultColDef={{
                cellClassRules: {
                  darkGreyBackground: function (params) {
                    return params.node.rowIndex % 2 == 0;
                  },
                },
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 100,
                flex: 1,
              }}
              excelStyles={[
                {
                  id: 'numberType',
                  numberFormat: {
                    format: '0',
                  },
                },
                {
                  id: 'twoDecimalPlaces',
                  numberFormat: {
                    format: '#,##0.00',
                  },
                },
                {
                  id: 'dateFormat',
                  dataType: 'dateTime',
                  numberFormat: {
                    format: 'mm/dd/yyyy;@',
                  },
                },
              ]}
              onGridReady={onGridReady}
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
