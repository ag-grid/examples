import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';

const App = forwardRef(function (props, ref) {
    const columnDefs = [
        {
            field: 'country',
        },
        { field: 'athlete' },
    ];
    const [api, setApi] = useState(null);
    const onGridReady = (params) => {
        setApi(params.api);
    };
    const [rowData, setRowData] = useState(null);
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => {
                setRowData(data);
            });
    }, [])


    useImperativeHandle(ref, () => {
        return {
            getApi() {
                return api;
            }
        }
    });

    return (
        <div>
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '600px'
                }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    rowData={rowData}
                />
            </div>
        </div>
    );
});


export default App;
