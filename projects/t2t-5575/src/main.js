import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClientSideRowModelModule } from '@ag-grid-community/all-modules';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                id="myGrid"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :modules="modules"
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: 'Athlete',
          children: [
            {
              field: 'athlete',
              filter: 'agTextColumnFilter',
              minWidth: 200,
            },
            { field: 'age' },
            { field: 'country', minWidth: 200 },
          ],
        },
        {
          headerName: 'Competition',
          children: [
            { field: 'year' },
            { field: 'date', minWidth: 180 },
          ],
        },
        { field: 'sport', minWidth: 200 },
        {
          headerName: 'Medals',
          children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
        filter: true,
      },
      sideBar: null,
      modules: [
        ClientSideRowModelModule,
        MenuModule,
        SetFilterModule,
        ColumnsToolPanelModule,
      ],
      rowData: null,
    };
  },
  beforeMount() {
    this.sideBar = 'columns';
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
