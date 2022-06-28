'use strict';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const GridExample = () => {
  const gridRef = useRef();
  const [quickFilterValue, setQuickFilterValue] = useState('');
  const quickFilterRef = useRef('');
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 220 },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
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
      .then((data) => {
        // setup the fake server with entire dataset
        var fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = createServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  const onQuickFilterGetChanged = useCallback((e) => {
    setQuickFilterValue(e.target.value);
  }, []);

  const debounce = (fn, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  useEffect(() => {
    if (gridRef.current.api == null) {
      return;
    }
    const refreshServer = gridRef.current.api.refreshServerSideStore({
      purge: true,
    });

    debounce(refreshServer, 5000);
  }, [quickFilterValue]);

  const createServerSideDatasource = (server) => {
    return {
      getRows: (params) => {
        params.request.quickFilter = quickFilterRef.current.value;

        var response = server.getData(params.request);

        setTimeout(function () {
          if (response.success) {
            params.success({
              rowData: response.rows,
              rowCount: response.lastRow,
            });
          } else {
            params.fail();
          }
        }, 1000);
      },
    };
  };

  const createFakeServer = (allData) => {
    return {
      getData: (request) => {
        let filteredData = allData;

        if (request.quickFilter.length > 0) {
          filteredData = allData.filter((row) => {
            for (let key in row) {
              let value = row[key] + '';
              if (value.toLowerCase().includes(request.quickFilter))
                return true;
            }
            return false;
          });
        }

        let results = filteredData.slice(request.startRow, request.endRow);

        return {
          success: true,
          rows: results,
          lastRow: results.length - 1,
        };
      },
    };
  };

  return (
    <div style={containerStyle}>
      <input ref={quickFilterRef} onChange={onQuickFilterGetChanged} />
      <br />
      <br />

      <div style={gridStyle} className='ag-theme-alpine-dark'>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={'serverSide'}
          serverSideStoreType={'partial'}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
