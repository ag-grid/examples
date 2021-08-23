import React, { Component } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Container } from 'react-bootstrap';
import ImageRenderer from './ImageRenderer';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css'

class Main extends Component {
    apiUrl = 'http://irights04.graymatterllc.com/libraryavails'
    state = {
        rowData: [],
        columnDefs: [
            //{headerName:"Picture", field:"propno",sortable:false,resizable:true,filter:false,width:140,cellRendererFramework:'imageRenderer'},
            {
                headerName: "Picture", field: "propno", sortable: false, resizable: true, cellClass: 'cell-wrap-text', autoHeight: true, filter: false, width: 140,
                cellRendererFramework: ImageRenderer
            },
            { headerName: "Property", field: "propname", sortable: true, resizable: true, filter: true, width: 200 },
            { headerName: "Territory", field: "terr", sortable: true, resizable: true, filter: true, width: 200 },

        ]

    }
    componentDidMount() {
        console.log('CDM')
        fetch(this.apiUrl + '/backend_grid_data.php?user=&terr=Cambodia&propno=&filterscount=0&groupscount=0&pagenum=0&pagesize=200&recordstartindex=0&recordendindex=200&_=1629659441909')
            .then(res => res.json())
            .then(resj => {
                this.setState({ rowData: resj })
                console.log(resj)
            })
            .catch(console.log)
    }

    componentDidUpdate() {
        console.log('CDU')
        // fetch(this.apiUrl+'/backend_grid_data.php?user=&terr=Cambodia&propno=&filterscount=0&groupscount=0&pagenum=0&pagesize=200&recordstartindex=0&recordendindex=200&_=1629659441909')
        // .then(res=>res.json())
        // .then(resj=>{
        //     this.setState({rowData:resj})
        //     console.log(resj)
        // })
        // .catch(console.log)
    }

    // imageRenderer=(propno) =>{
    //     let image = new Image()
    //     image.src='http://irights04.graymatterllc.com/releaseinfpic/pic2.php?skey=123&userid=&propno='+propno.toUpperCase()
    //     image.style.height='100%'
    //     return image;
    // }

    onGridReady = params => {
        console.log('OnGridReady')
        this.gridApi = params.api
        this.gridColumnApi = params.columnApi
    }

    render() {
        return (
            <>
                <h1>Library Avails</h1>
                <Container fluid className="ag-theme-balham m-0 p-0" style={{ height: '1030px', width: '100%' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        onGridReady={this.onGridReady}
                        //onSelectionChanged={onSelectionChanged}
                        //onRowDataChanged={onRowDataChanged}
                        rowSelection='single'
                        //pagination={false}
                        //paginationAutoPageSize={false}
                        //autoSize={true}
                        groupHeaderHeight={25}
                        headerHeight={30}
                        rowData={this.state.rowData}
                        enableCellTextSelection={true}
                        enableCharts={false}
                        enableRangeSelection={false}
                        //statusBar={stdStatusBar}
                        modules={AllModules}
                    >
                    </AgGridReact>
                </Container>
            </>
        )
    }
}

export default Main;
