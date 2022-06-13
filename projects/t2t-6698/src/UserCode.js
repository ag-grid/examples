import { paramCase } from "change-case";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";



export default function DuplicateMeasure() {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [openDialog, setOpenDialog] = useState(false);

  const [viewData, setViewData] = useState();

  const onclickEdit = (e) => {
    setViewData(e);
    setOpenDialog(true);
  };

  const [assignedUser, setAssignedUser] = useState([]);



  const userNameDropdown = () => {
    return (
      <select style={{ width: "100%" }}>
        {assignedUser?.map((data) => {
          return <option value={data?.id}>{data?.userName}</option>;
        })}
      </select>
    );
  };
  const onsharePoint = (e) => {
    alert(e);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const options = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const measureOptions = [
    { label: "New", value: 0 },
    { label: "Assigned", value: 1 },
    { label: "Processing", value: 2 },
    { label: "Query", value: 3 },
    { label: "Review", value: 4 },
    { label: "TM", value: 5 },
    { label: "Ready", value: 6 },
    { label: "Batch Delayed", value: 7 },
    { label: "Rejected by Anesco", value: 8 },
    { label: "Completed", value: 9 },
    { label: "Error", value: 10 },
    { label: "Rejected by Utility", value: 11 },
    { label: "Invoiced", value: 12 },
    { label: "Assigned", value: 13 },
    { label: "Duplicate", value: 14 },
  ];

  const [valchk, setvalchk] = React.useState("");

  const valuePossible = (e) => {
    console.log("e-0-0-0-0-0-0-0-0--0", e);
  };

  const [isActivate, setisActivate] = useState(true);

  const [isActivateVl, setisActivateVl] = useState(true);

  const [measureStatusVal, setmeasureStatusVal] = useState([]);


  const [columnDefs] = useState([
    {
      headerName: "Measure ID",
      field: "measureId",
      minWidth: 150,
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      chartDataType: "category",
      cellRenderer: (params) => {
        return (
          <a
            href={params?.data?.measureFolderpath}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {params.data.measureId}{" "}
          </a>
        );
      },
    },
    {
      headerName: "Installer Name",
      field: "installerName",
      minWidth: 250,
      resizable: true,
      autoHeight: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      chartDataType: "category",
      cellClass: ["blackFont", "greenBackground"],
    },
    {
      headerName: "Address",
      field: "address",
      minWidth: 300,
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      chartDataType: "category",
      autoHeight: true,
    },

    {
      headerName: "Measure",
      field: "measure",
      floatingFilter: true,
      minWidth: 200,
      resizable: true,
      filter: "agTextColumnFilter",
      chartDataType: "category",
      autoHeight: true,
    },

    {
      headerName: "Submission #",
      field: "submissionNumber",
      floatingFilter: true,
      minWidth: 130,
      resizable: true,
      filter: "agTextColumnFilter",
      chartDataType: "category",
    },

    {
      headerName: "Current LTS",
      field: "currentLTS",
      floatingFilter: true,
      minWidth: 130,
      resizable: true,
      filter: "agTextColumnFilter",
      chartDataType: "category",
    },
    {
      field: "country",
      minWidth: 150,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: [
          "English",
          "Spanish",
          "French",
          "Portuguese",
          "Chocolate Island",
          "(other)",
        ],
        cellHeight: 20,
        formatValue: (value) => value.toUpperCase(),
        searchDebounceDelay: 500,
      },
    },
    {
      headerName: "Measure Status",
      field: "measureStatusID",
      minWidth: 130,
      resizable: true,
      filter: false,
      chartDataType: "category",
      rowGroup: false,
      cellRenderer: (params) => {
        return (
          <select
            value={params.data.measureStatusID}
            style={{ width: "100%" }}
            onChange={(e) => handleMeasureStatus(e, params.data.measureId)}
          >
            {measureStatusVal.map((item) => (
              <option key={item.measureStatus_ID} value={item.measureStatus_ID}>
                {item.status}
              </option>
            ))}
          </select>
        );
      },
    },

    {
      headerName: "Possible Duplicate?",
      field: "possibeleDuplicate",
      minWidth: 130,
      resizable: false,
      sortable: false,
      filter: false,
      chartDataType: "category",
      cellRenderer: (params) => {
        return (
          <select
            value={params.data.possibeleDuplicate}
            style={{ width: "100%" }}
            onChange={(e) => handlePossible(e, params.data.measureId)}
          >
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}

            {/* <option value="1" >Yes</option>
<option value="0">No</option> */}
          </select>
        );
      },
    },
    {
      headerName: "",
      filter: false,
      minWidth: 80,
      sortable: false,
      resizable: false,
      cellRenderer: (params) => {
        return (
          <>
            <Iconify
              icon={"bi:eye-fill"}
              style={{ fontSize: "18px", color: "#637381" }}
              onClick={() => onclickEdit(params.data)}
            />
          </>
        );
      },
    },
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 250,
      // field: 'installerName',
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
      enableRowGroup: true,
      // editable: true,
      // filter: true,
      // floatingFilter: true,
    };
  }, []);

  const [dupCount, setdupCount] = useState("");

  const NormalOnGridReady = useCallback(
    (params) => {
      instance
        .acquireTokenSilent({
          ...accessToken,
          account: accounts[0],
        })
        .then((response) => {
          // GetSubmissionListByUser(response.accessToken, accounts[0].username)
          getDuplicateMeasureList(
            response.accessToken,
            accounts[0].name,
            0
          ).then((data) => {
            console.log("data---chk---", data);
            console.log("data---chk---", data);
            setdupCount(data.length);
            // const fakeServer = createFakeServer(data);
            valuePossible(data);
            const fakeServer = new FakeServer(data);
            const datasource = createServerSideDatasource(fakeServer);
            params.api.setServerSideDatasource(datasource);
          });
        });
    },
    [isActivate]
  );

  // const getChildCount = useCallback((data) => {
  // return data ? data.childCount : undefined;
  // }, []);

  const [submissionPopup, setSubmissionPopup] = useState(false);
  const [poPopup, setPoPopup] = useState(false);
  const [queryNoteError, setQueryNoteError] = useState(false);

  const animateRowsVl = true;
  const suppressAggFuncInHeaderVl = true;
  const debug = true;

  // const getServerSideStoreParams = useCallback((params) => {
  // const noGroupingActive = params.rowGroupColumns.length == 0;
  // const res;
  // if (noGroupingActive) {
  // res = {
  // // infinite scrolling
  // storeType: 'partial',
  // // 100 rows per block
  // cacheBlockSize: 100,
  // // purge blocks that are not needed
  // maxBlocksInCache: 2,
  // };
  // } else {
  // var topLevelRows = params.level == 0;
  // res = {
  // storeType: topLevelRows ? 'full' : 'partial',
  // cacheBlockSize: params.level == 1 ? 5 : 2,
  // maxBlocksInCache: -1, // never purge blocks
  // };
  // }
  // console.log('############## NEW STORE ##############');
  // // console.log(
  // // 'getServerSideStoreParams, level = ' +
  // // params.level +
  // // ', result = ' +
  // // JSON.stringify(res)
  // // );
  // return res;
  // }, []);

  const onPageSizeChanged = useCallback(() => {
    const value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const getChildCount = useCallback((data) => {
    console.log("checkdata------1-----", data);
    return data.childCount;
  }, []);

  const serverSideSortingAlwaysResets = true;
  const serverSideFilteringAlwaysResets = true;
  const enableRangeSelection = true;
  return (
    <>
      <Page title="Installer Submission">
        <Container className={classes.containerTable}>
          <HeaderBreadcrumbs
            heading={`Duplicate Measure (${dupCount})`}
            links={[{ name: "" }]}
          />

          <Card>
            <div style={containerStyle}>
              <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                  ref={gridRef}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  autoGroupColumnDef={autoGroupColumnDef}
                  rowModelType={"serverSide"}
                  serverSideStoreType={"full"}
                  rowGroupPanelShow={"always"}
                  groupDisplayType={"groupRows"}
                  cacheBlockSize={5}
                  getChildCount={getChildCount}
                  enableRangeSelection={enableRangeSelection}
                  serverSideSortingAlwaysResets={serverSideSortingAlwaysResets}
                  serverSideFilteringAlwaysResets={
                    serverSideFilteringAlwaysResets
                  }
                  // debug={debug}
                  animateRows={animateRowsVl}
                  suppressAggFuncInHeader={suppressAggFuncInHeaderVl}
                  // getServerSideStoreParams={getServerSideStoreParams}
                  // excelStyles={excelStyles}
                  // animateRows
                  pagination
                  // domLayout={'autoHeight'}
                  paginationPageSize={25}
                  onGridReady={NormalOnGridReady}
                />
              </div>
              <div className={`${classes.pagination} example-header`}>
                Page Size :
                <select onChange={onPageSizeChanged} id="page-size">
                  <option value="25" selected>
                    25
                  </option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </Card>
        </Container>
      </Page>
    </>
  );
}
