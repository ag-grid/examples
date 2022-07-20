import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';

const App = () => {
    const [gridLoaded, setGridLoaded] = useState(false);
    const [cellFocused, setCellFocused] = useState(false);
    const columnDefs = [{ field: 'make', editable: true, },
    { field: 'model' },
    { field: 'price' }];

    const rowData = [{ make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }];

    const onGridReady = (params) => {
        setGridLoaded(true);
        console.log('onGridReady');
        params.api.setFocusedCell(0, 'make', null);
        // params.api.startEditingCell({ rowIndex: 0, colKey: 'make' });
    }

    const onCellFocused = params => {
        console.log('onCellFocused');
        setCellFocused(true);
    }

    return (
        <div>
            <p data-testid="api">{gridLoaded ? 'the grid API has been loaded' : null}</p>
            <p data-testid="cell-focused-text">{cellFocused ? 'toyota has been focused' : null}</p>
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '600px'
                }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    enableRangeSelection={true}
                    onCellFocused={onCellFocused}
                    rowData={rowData}
                />
            </div>
        </div>
    );
}

// const App = forwardRef(function (props, ref) {
//     const columnDefs = [
//         {
//             field: 'country',
//         },
//         { field: 'athlete' },
//     ];
//     const [api, setApi] = useState(null);
//     const onGridReady = (params) => {
//         setApi(params.api);
//     };
//     const [rowData, setRowData] = useState(null);
//     useEffect(() => {
//         fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//             .then((resp) => resp.json())
//             .then((data) => {
//                 setRowData(data);
//             });
//     }, [])


//     useImperativeHandle(ref, () => {
//         return {
//             getApi() {
//                 return api;
//             }
//         }
//     });

// return (
//     <div>
//         <div
//             className="ag-theme-balham"
//             style={{
//                 height: '500px',
//                 width: '600px'
//             }}>
//             <AgGridReact
//                 columnDefs={columnDefs}
//                 onGridReady={onGridReady}
//                 rowData={rowData}
//             />
//         </div>
//     </div>
// );
// });


export default App;
