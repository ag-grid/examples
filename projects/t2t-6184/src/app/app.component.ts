import { ColDef, GetDataPath, Module, RowClickedEvent, ValueGetterParams } from '@ag-grid-community/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map, mergeMap } from 'rxjs/operators';

// const settings = require('../../configuration/settings?v=1.0.0');
declare var $: any;

@Component({
  selector: 'app-strawman-grid',
  templateUrl: './strawman-grid.component.html',
})
export class AppComponent implements OnInit {
  settings: any;
  
  valueGetterMap = {
    "PLANNING PRODUCT GROUP DESCRIPTION": function (params: ValueGetterParams) {
      return typeof params.data != "undefined" ? params.data["PLANNING PRODUCT GROUP DESCRIPTION"] : "UNDEFINED"
    },
    "LY vs 2LY DNREv Chg": function (params: ValueGetterParams) {
      return params.data["LY DNRev"] - params.data["2LY DNRev"]
    }
  };

  public gridApi!: { forEachNode: (arg0: (node: any) => void) => void; refreshCells: () => void; onGroupExpandedOrCollapsed: () => void; getFocusedCell: () => { (): any; new(): any; column: { (): any; new(): any; colDef: { (): any; new(): any; headerName: string; }; }; }; getSelectedRows: () => any; };
  public gridColumnApi!: { setColumnsVisible: (arg0: string[], arg1: boolean) => void; };
  public modules: any[] = AllModules;

  public originalData: any;
  public rowData: any[] = [];
  public columnDefs: any[];
  public defaultColDef;
  public columnTypes;
  public frameworkComponents;
  public sideBar;
  public allColumns: any[] = []; 

  public autoGroupColumnDef = {
    field: 'PLANNING PRODUCT GROUP DESCRIPTION',
    headerName: 'Planning Product Group',
    cellRendererParams: {
      suppressCount: true,
    },
    suppressPaste: true,
    pinned: 'left',
    cellClassRules: {
      "non-editable-cell": function (params: any) {
        return true;
      },
      "cell-border-right": "true",
      "text-right": "false"
    },
    valueGetter: this.valueGetterMap["PLANNING PRODUCT GROUP DESCRIPTION"],
    width: 200,
  };
    
  public getDataPath: GetDataPath = function (data) {
    return data.Parent;
  };

  rowClassRules: any;
  undoRedoCellEditingLimit = 5;

  public pinnedTopRowData: any = null;

  planningChannelsControl = new FormControl();

  public planningChannels = [];
  filteredPlanningChannels!: Observable<string[]>;
  selectedPlanningChannel = null;

  showAllColumns = true;
  showAllRows = true;

  filters: FormGroup;
  defaultFilter = [
    "PY DNRev",
    "PY vs LY DNREv Chg",
    "PY vs LY DNRev %",
    "PY vs 2LY DNRev %",
    "PY Volume (Base)",
    "PY vs LY Volume",
    "PY vs LY Volume %",
    "PY vs 2LY Volume %",
    "PY DNGP",
    "PY vs LY DNGP Chg",
    "PY vs LY DNGP %",
    "PY vs 2LY DNGP %",
    "PY PS COGS",
    "PY vs LY PS COGS Chg",
    "PY vs LY PS COGS %",
    "PY DNNSI",
    "Calculated: Carry-Over",
    "Addl PY Jan Rate",
    "Final: PY vs LY DNNSI Chg",
    "Input: PY vs LY DNNSI Chg",
    "Input: PY vs LY DNNSI %",
    "PY vs LY DNNSI %",
    "PY vs 2LY DNNSI %",
    "PY COGS/cs",
    "PY vs LY COGS/cs Chg",
    "PY vs LY COGS/cs %",
    "Input: PY vs LY Fixed COGS/cs %",
    "Input: PY vs LY Fixed COGS/cs",
    "PY GM %",
    "PY vs LY GM % Chg pp",
    "DNNSI 'True Rate'/cs Chg vs LY",
    "DNNSI 'True Rate' % vs LY",
    "DNNSI Mix/cs Chg vs LY",
    "DNNSI Mix/cs % vs LY",
    "Implied Elasticity PY vs LY"
  ]
  trueRateMixFilter = [
    "PY DNRev",
    "PY vs LY DNREv Chg",
    "PY vs LY DNRev %",
    "PY Volume (Base)",
    "PY vs LY Volume",
    "PY vs LY Volume %",
    "PY DNNSI",
    "Calculated: Carry-Over",
    "Addl PY Jan Rate",
    "Final: PY vs LY DNNSI Chg",
    "Input: PY vs LY DNNSI Chg",
    "Input: PY vs LY DNNSI %",
    "PY vs LY DNNSI %",
    "DNNSI 'True Rate'/cs Chg vs LY",
    "DNNSI 'True Rate' % vs LY",
    "DNNSI Mix/cs Chg vs LY",
    "DNNSI Mix/cs % vs LY",
    "Implied Elasticity PY vs LY",
  ]
  cogsFilter = [
    "PY DNRev",
    "PY vs LY DNREv Chg",
    "PY vs LY DNRev %",
    "PY Volume (Base)",
    "PY vs LY Volume",
    "PY vs LY Volume %",
    "PY COGS/cs",
    "PY vs LY COGS/cs Chg",
    "PY vs LY COGS/cs %",
    "PY IP COGS/cs",
    "PY vs LY IP COGS/cs Chg",
    "PY vs LY IP COGS/cs %",
    "PY Fixed COGS/cs",
    "PY vs LY Fixed COGS/cs Chg",
    "Input: PY vs LY Fixed COGS/cs %",
    "Input: PY vs LY Fixed COGS/cs",
    "Addl Fixed COGS Entry",
  ]
  inputOnlyFilter = [
    "PY DNRev",
    "PY vs LY DNREv Chg",
    "PY vs LY DNRev %",
    "PY Volume (Base)",
    "PY vs LY Volume",
    "PY vs LY Volume %",
    "PY vs LY DNGP Chg",
    "PY DNNSI",
    "Calculated: Carry-Over",
    "Addl PY Jan Rate",
    "Final: PY vs LY DNNSI Chg",
    "Input: PY vs LY DNNSI Chg",
    "Input: PY vs LY DNNSI %",
    "PY vs LY DNNSI %",
    "PY vs LY Fixed COGS/cs Chg",
    "Input: PY vs LY Fixed COGS/cs %",
    "Input: PY vs LY Fixed COGS/cs",
    "PY GM %",
    "PY vs LY GM % Chg pp",
    "DNNSI 'True Rate'/cs Chg vs LY",
    "DNNSI Mix/cs Chg vs LY",
    "Addl Fixed COGS Entry",
  ]
  stoolFilter = [
    "PY DNRev",
    "PY vs LY DNREv Chg",
    "PY vs LY DNRev %",
    "PY Volume (Base)",
    "PY vs LY Volume",
    "PY vs LY Volume %",
    "PY DNGP",
    "PY vs LY DNGP Chg",
    "PY vs LY DNGP %",
    "PY PS COGS",
    "PY vs LY PS COGS Chg",
    "PY vs LY PS COGS %",
    "PY DNNSI",
    "Calculated: Carry-Over",
    "Addl PY Jan Rate",
    "Final: PY vs LY DNNSI Chg",
    "PY vs LY DNNSI %",
    "PY DNGP/cs",
    "PY vs LY DNGP/cs",
    "PY vs LY DNGP/cs %",
    "PY COGS/cs",
    "PY vs LY COGS/cs Chg",
    "PY vs LY COGS/cs %",
    "PY GM %",
    "PY vs LY GM % Chg pp",
    "DNNSI 'True Rate'/cs Chg vs LY",
    "DNNSI 'True Rate' % vs LY",
    "DNNSI Mix/cs Chg vs LY",
    "DNNSI Mix/cs % vs LY",
    "Implied Elasticity PY vs LY",
  ]

  constructor(
    public _router: Router,
    public dialog: MatDialog,
    fb: FormBuilder
    ) { 

    this.columnDefs = [];

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.columnTypes = {
      gridValue: {
        valueFormatter: gridFormatter,
      },
    };

    this.frameworkComponents = {};
    this.sideBar = 'filters';

    this.filters = fb.group({
      default: true,
      inputOnly: false,
      cogs: false,
      trueRateMix: false,
      stool: false
    });
    
    this.rowClassRules = {
      "grand-total-row": "data['PLANNING PRODUCT GROUP DESCRIPTION'] === 'Grand Total B/C/P'",
      "total-less-row": "data['PLANNING PRODUCT GROUP DESCRIPTION'] === 'TOTAL B/C/P LESS BA/MEC'",
      "total-row": "data['PLANNING PRODUCT GROUP DESCRIPTION'].includes('Total') && data['PLANNING PRODUCT GROUP DESCRIPTION'] != 'Grand Total B/C/P' && data['PLANNING PRODUCT GROUP DESCRIPTION'] != 'TOTAL B/C/P LESS BA/MEC'"
    };

    // this._dataService.getPlanningChannels().subscribe((ret) => {
    //   let temp: any;
    //   temp = ret;
    //   if (temp.result) {
    //     this.planningChannels = temp.data;
    //     console.log(this.planningChannels)

    //     this.filteredPlanningChannels = this.planningChannelsControl.valueChanges
    //       .pipe(
    //         startWith(''),
    //         map(value => typeof value === 'string' ? value : value.Retailer),
    //         map(mb => mb ? this._filterPlanningChannels(mb) : this.planningChannels.slice())
    //       );
    //   }
    // });

    // if (this._dataService.userAssignedRoles.length === 0) {
    //   this._dataService.getLoggedInUsersRoles().subscribe((ret) => {
    //     let temp: any;
    //     temp = ret;
    //     if (temp.result) {
    //       temp.data.forEach((d) => this._dataService.userAssignedRoles.push(Number(d.Role_ID)));
    //     }
    //   });
    // }
      
  }

  ngOnInit(): void {
    // this.settings = settings;
    // this._dataService.currentPageTitle = "Strawman";
  }

  displayPlanningChannelFn(mg: any): string {
    return mg && mg.PLANNING_CHANNEL ? mg.PLANNING_CHANNEL : '';
  }

  toggleRows() {
    this.showAllRows = !this.showAllRows
    this.gridApi.forEachNode((node: { expanded: boolean; }) => {
      if (node)
        node.expanded = this.showAllRows;
    });
    
    this.gridApi.refreshCells();
    this.gridApi.onGroupExpandedOrCollapsed();
  }

  filterColumns(skip: any) {
    //Set all Visible
    let showCols = [];

    if(this.filters.controls['default'].value) {
      showCols.push(...this.defaultFilter);
    }
    if(this.filters.controls['trueRateMix'].value) {
      showCols.push(...this.trueRateMixFilter);
    }
    if(this.filters.controls['cogs'].value) {
      showCols.push(...this.cogsFilter);
    }
    if(this.filters.controls['inputOnly'].value) {
      showCols.push(...this.inputOnlyFilter);
    }
    if(this.filters.controls['stool'].value) {
      showCols.push(...this.stoolFilter);
    }

    if(this.showAllColumns && !skip) {
      this.gridColumnApi.setColumnsVisible(this.allColumns, true);
      this.showAllColumns = false;
      
      this.gridApi.refreshCells();
      return;
    } else {
      this.gridColumnApi.setColumnsVisible(this.allColumns, false);
      this.showAllColumns = true;

      
      this.gridColumnApi.setColumnsVisible(showCols, true);

      this.gridApi.refreshCells();
      return;
    }
  }

  // private _filterPlanningChannels(pg: string): any[] {
  //   const filterValue = pg.toLowerCase();

  //   return this.planningChannels.filter(option => option.PLANNING_CHANNEL.toLowerCase().includes(filterValue));
  // }

  // onFilterChanged(evt) {
  //   this._strawmanService.contractFilterModel = this.gridApi.getFilterModel();
  // }

  // onSortChanged(evt) {
  //   this._strawmanService.contractSortModel = this.gridApi.getSortModel();
  // }

  // setSelectedPlanningChannel(evt) {
  //   this._dataService.getStrawmanGrid(this.selectedPlanningChannel.PLANNING_CHANNEL).subscribe((ret) => {
  //     let temp: any;
  //     temp = ret;
  //     if (temp.result) {
  //       console.log(temp.data);
      
  //       this.rowData = this.formatData(temp.data);

  //       //Build Column Definitions
  //       this.columnDefs = this.buildColumnDefs();
  //       this.gridApi.setColumnDefs([]);
  //       this.gridApi.setColumnDefs(this.columnDefs);

  //       this.gridColumnApi.setColumnsVisible(this.allColumns, false);
  //       this.gridColumnApi.setColumnsVisible(this.defaultFilter, true);

  //       this.gridApi.setPinnedTopRowData(this.pinnedTopRowData);

  //       this.gridApi.refreshCells();
  //     }
  //   });
  // }

  getContextMenuItems(params: any) {
    var result = [
      'copy',
      'copyWithHeaders',
      'export',
      'separator',
      'chartRange',
    ];
    return result;
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // onFirstDataRendered(params) {
  //   if (this._strawmanService.contractFilterModel) {
  //     params.api.setFilterModel(this._strawmanService.contractFilterModel);
  //   }
  //   if (this._strawmanService.contractSortModel) {
  //     params.api.setSortModel(this._strawmanService.contractSortModel);
  //   }

    // setTimeout(() => {
    //   params.api.sizeColumnsToFit();
    // }, 1000);
  // }

  onRowClick(params: RowClickedEvent) {
    if (this.gridApi.getFocusedCell().column.colDef.headerName != "") {
      var selectedRows = this.gridApi.getSelectedRows();
      // this._contractService.currentContract = selectedRows[0];
      // this._router.navigate(['/contract-details']);
    }
  }

  formatData(data: any[]) {
    let parentName;
    this.pinnedTopRowData = [];
    for (var i = data.length - 1; i >= 0; i--) {
      let ele = data[i];
      if(ele.CBP_ID === 0) {
        ele.Parent = [ele["PLANNING PRODUCT GROUP DESCRIPTION"]];
        parentName = ele["PLANNING PRODUCT GROUP DESCRIPTION"];
      } else {
        ele.Parent = [parentName, ele["PLANNING PRODUCT GROUP DESCRIPTION"]];
      }
    }

    //SET PINNED DATA
    this.pinnedTopRowData.push(data[0]);
    this.pinnedTopRowData.push(data[1]);
    this.pinnedTopRowData.push(data[2]);

    data.splice(0, 1);
    data.splice(0, 1);
    data.splice(0, 1);

    return data;
  }

  buildColumnDefs() {
    let columnDefs: {
      field: string; headerName: string; headerClass: string; width: number; type: string;
      // headerComponentParams: {
      //   template: '<span class="w-100 text-center">' + this._forecastService.storeCounts.get(Number(key.substring(2))).WeekName.replace(")", ") <br>") + '</span>'
      // },
      editable: (params: any) => boolean; valueGetter: (params: any) => void; cellClassRules: { "editable-cell": (params: any) => boolean; "text-right": string; };
    }[] = [];
    this.allColumns = [];
    if(this.rowData.length > 0) {
      let keys = Object.keys(this.rowData[0]);
      let headerClass = "";
      let skipKeys = ["IsEditable", "CBP_ID", "CBP_Type", "Planning Channel", "PLANNING PRODUCT GROUP DESCRIPTION"];
      let svc = this;

      for (let i = 0; i < keys.length; i++) {
        let key: any = keys[i];
        if (!skipKeys.includes(key)) {
          this.allColumns.push(key);

          let obj = {
            field: key,
            headerName: key,
            headerClass: headerClass,
            width: 130,
            type: "gridValue",
            // headerComponentParams: {
            //   template: '<span class="w-100 text-center">' + this._forecastService.storeCounts.get(Number(key.substring(2))).WeekName.replace(")", ") <br>") + '</span>'
            // },
            editable: function (params: any) {
              console.log(params);
              return true
            },
            valueGetter: function (params: any) {
               // @ts-ignore
               svc.valueGetterMap[key] ? svc.valueGetterMap[key] : params.data[key]
            },
            cellClassRules: {
              "editable-cell": function (params: any) {
                // let week = params.colDef.field.substring(2);
                // if ((Number(week) < scope.blackoutWeek && params.data.Section !== "History" && params.data.Measure === "Override Volume Total" && svc._dataService.plan_year != "PY") || params.data.Section === "Header") {
                //   return true;
                // } else {
                //   return false;
                // }
                return false;
              },
              "text-right": "true"
            }
          }
          columnDefs.push(obj);
        }
      }

      return columnDefs;
    } else {
      return columnDefs;
    }

  }

}

function gridFormatter(params: { value: number; colDef: { field: string | string[]; }; }) {
  let dateCols = [
    'Start_Date',
    'End_Date'
  ];
  
  // Create our number formatter.
  var currencyFormatterNoDecimals = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  var currencyFormatterTwoDecimals = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  var noDecimalsFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  var percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });


  // Everything is currency unless include % or VOLUME
  // All % are 1 decimals
  // Everything is 0 decimals unless includes DNNSI or /cs THEN 2 decimals


  if (params.value) {
    // if (dateCols.includes(params.colDef.field)) {
    //   return new Date(params.value.replace(/-/g, '\/').replace(/T.+/, '')).toLocaleDateString();
    // }
    if(params.colDef.field.includes("%")) {
      return percentFormatter.format(params.value);
    }
    if(params.colDef.field.includes("VOLUME")) {
      return noDecimalsFormatter.format(params.value);
    }
    if(params.colDef.field.includes("DNNSI") || params.colDef.field.includes("/cs")) {
      return currencyFormatterTwoDecimals.format(params.value);
    }

    return currencyFormatterNoDecimals.format(params.value);
  }
  return '';
}
