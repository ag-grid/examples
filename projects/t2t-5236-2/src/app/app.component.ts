import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import rowData from './rowData';

import { ToggleSwitchRenderer } from './toggle-switch-renderer.component';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    [gridOptions]="gridOptions"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData: any;

  public gridOptions: any;

  constructor(public http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Visible',
        field: 'visibility',
        cellRenderer: 'toggleSwitchRenderer',
        // width: 150
        minWidth: 200
      },
      {
        headerName: 'Field',
        field: 'field'
      },
      {
        headerName: 'Header Name',
        field: 'headerName',
        editable: true
      },
      {
        headerName: 'Enable Row Group',
        field: 'enableRowGroup',
        cellRenderer: 'toggleSwitchRenderer',
        width: 250
      },
      {
        headerName: 'Row Grouping index',
        field: 'rowGroupIndex',
        editable: true,
        cellEditor: 'numericEditor',
        width: 250
      },
      {
        headerName: 'Agg Function',
        field: 'aggFunc',
        cellRenderer: 'dropdownRenderer',
      },
      {
        headerName: 'Pinned',
        field: 'pinned',
        cellRenderer: 'dropdownRenderer',
      }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.gridOptions = {
      // rowData: this.data.columnState,
      // columnDefs: this.createColumnDefs(),
      // onGridReady: (parms) => {
      //   this.gridReady(parms);
      // },
      rowHeight: 48,
      frameworkComponents: {
        toggleSwitchRenderer: ToggleSwitchRenderer,
        // checkboxRenderer: MatCheckboxComponent,
        // dropdownRenderer: MatSelectComponentComponent,
        // numericEditor: NumericEditorComponent,
        //colorPicker: ColorPickerEditorComponent
      },
      suppressContextMenu: true
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // this.http
    //   .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .subscribe((data) => {
    //     this.rowData = data;
    //   });

    // console.log('rowData', rowData);
    // this.rowData = rowData;

    this.rowData = this.getRowData();
  }

  getRowData() {
    return ROW_DATA
  }
}

const ROW_DATA = [
  {
    "headerName": "ScopeListKey",
    "name": "ScopeListKey",
    "field": "ScopeListKey",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "CorrelationId",
    "name": "CorrelationId",
    "field": "CorrelationId",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ObjectGroup",
    "name": "ObjectGroup",
    "field": "ObjectGroup",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SnapshotDate",
    "name": "SnapshotDate",
    "field": "SnapshotDate_master",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "PublishMethod",
    "name": "PublishMethod",
    "field": "PublishMethod_master",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "PublishVersion",
    "name": "PublishVersion",
    "field": "PublishVersion_master",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "PublishDescription",
    "name": "PublishDescription",
    "field": "PublishDescription_master",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SiteId",
    "name": "SiteId",
    "field": "SiteId",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Source",
    "name": "Source",
    "field": "Source",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SourceUniqueId",
    "name": "SourceUniqueId",
    "field": "SourceUniqueId",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Project",
    "name": "Project",
    "field": "Project",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ItemType",
    "name": "ItemType",
    "field": "ItemType",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Area",
    "name": "Area",
    "field": "Area",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SubArea",
    "name": "SubArea",
    "field": "SubArea",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "System",
    "name": "System",
    "field": "System",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Module",
    "name": "Module",
    "field": "Module",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SubModule",
    "name": "SubModule",
    "field": "SubModule",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "FBSCode",
    "name": "FBSCode",
    "field": "FBSCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ClientWBS",
    "name": "ClientWBS",
    "field": "ClientWBS",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "EWP",
    "name": "EWP",
    "field": "EWP",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "AssetTagTrain",
    "name": "AssetTagTrain",
    "field": "AssetTagTrain",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "AssetTagUnit",
    "name": "AssetTagUnit",
    "field": "AssetTagUnit",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "AssetTagTypeCode",
    "name": "AssetTagTypeCode",
    "field": "AssetTagTypeCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "TagNo",
    "name": "TagNo",
    "field": "TagNo",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Description",
    "name": "Description",
    "field": "Description",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "PowerVoltage",
    "name": "PowerVoltage",
    "field": "PowerVoltage",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "CableType",
    "name": "CableType",
    "field": "CableType",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "DesignedQty",
    "name": "DesignedQty",
    "field": "DesignedQty",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "UOM",
    "name": "UOM",
    "field": "UOM",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Project07",
    "name": "Project07",
    "field": "Project07",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Project08",
    "name": "Project08",
    "field": "Project08",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ConstructionType",
    "name": "ConstructionType",
    "field": "ConstructionType",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "KeyDocument",
    "name": "KeyDocument",
    "field": "KeyDocument",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SLD",
    "name": "SLD",
    "field": "SLD",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Revision",
    "name": "Revision",
    "field": "Revision",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ConnectionSide1",
    "name": "ConnectionSide1",
    "field": "ConnectionSide1",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ConnectionSide2",
    "name": "ConnectionSide2",
    "field": "ConnectionSide2",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "CommodityCode",
    "name": "CommodityCode",
    "field": "CommodityCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "StockCode",
    "name": "StockCode",
    "field": "StockCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "CWP",
    "name": "CWP",
    "field": "CWP",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "LastUpdate",
    "name": "LastUpdate",
    "field": "LastUpdate",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "RelatedTag",
    "name": "RelatedTag",
    "field": "RelatedTag",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "JunctionBox",
    "name": "JunctionBox",
    "field": "JunctionBox",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "From",
    "name": "From",
    "field": "From",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "To",
    "name": "To",
    "field": "To",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Remarks",
    "name": "Remarks",
    "field": "Remarks",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "CableDrumCode",
    "name": "CableDrumCode",
    "field": "CableDrumCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Discipline",
    "name": "Discipline",
    "field": "Discipline",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Material",
    "name": "Material",
    "field": "Material",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Size",
    "name": "Size",
    "field": "Size",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Classification",
    "name": "Classification",
    "field": "Classification",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SpecCode",
    "name": "SpecCode",
    "field": "SpecCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "RoutingPath",
    "name": "RoutingPath",
    "field": "RoutingPath",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Location",
    "name": "Location",
    "field": "Location",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Capacity",
    "name": "Capacity",
    "field": "Capacity",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "NoOfCablesInBundle",
    "name": "NoOfCablesInBundle",
    "field": "NoOfCablesInBundle",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "TechnicalData",
    "name": "TechnicalData",
    "field": "TechnicalData",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ScopeResponsibility",
    "name": "ScopeResponsibility",
    "field": "ScopeResponsibility",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "DesStatus",
    "name": "DesStatus",
    "field": "DesStatus",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "EngStatus",
    "name": "EngStatus",
    "field": "EngStatus",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ConstructionModule",
    "name": "ConstructionModule",
    "field": "ConstructionModule",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "QtyBasis",
    "name": "QtyBasis",
    "field": "QtyBasis",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "EstimatingCode",
    "name": "EstimatingCode",
    "field": "EstimatingCode",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "EnquiryNo",
    "name": "EnquiryNo",
    "field": "EnquiryNo",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "PurchaseOrder",
    "name": "PurchaseOrder",
    "field": "PurchaseOrder",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "SupplyResponsibility",
    "name": "SupplyResponsibility",
    "field": "SupplyResponsibility",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Model",
    "name": "Model",
    "field": "Model",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Stage",
    "name": "Stage",
    "field": "Stage",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "DataQualityCheck02",
    "name": "DataQualityCheck02",
    "field": "DataQualityCheck02",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "DataQualityCheck03",
    "name": "DataQualityCheck03",
    "field": "DataQualityCheck03",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "ItemState",
    "name": "ItemState",
    "field": "ItemState",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  },
  {
    "headerName": "Project Number",
    "name": "Project Number",
    "field": "Project Number",
    "enableRowGroup": false,
    "enableValue": false,
    "visibility": true,
    "rowGroup": false,
    "rowGroupIndex": null,
    "pinned": null
  }
]