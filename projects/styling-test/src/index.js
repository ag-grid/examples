import "./styles.css";
import "./ag-grid.css";
import "./ag-theme-balham.css";
import "./ag-theme-alpine.css";
import "ag-grid-enterprise";
import * as agGrid from "ag-grid-community";

// specify the columns
const columnDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];

// let the grid know which columns to use
const gridOptions = {
  columnDefs: columnDefs,
};

// lookup the container we want the Grid to use
const eGridDiv = document.querySelector("#myGrid");

const themeBtn = document.querySelector("#themeBtn");
themeBtn.addEventListener("click", () => {
  eGridDiv.className =
    eGridDiv.className === "ag-theme-balham"
      ? "ag-theme-alpine"
      : "ag-theme-balham";

  gridOptions.api.resetRowHeights();
});

// create the grid passing in the div to use together with the columns &amp; data we want to use
new agGrid.Grid(eGridDiv, gridOptions);

agGrid
  .simpleHttpRequest({
    url: "https://www.ag-grid.com/example-assets/row-data.json",
  })
  .then((data) => {
    gridOptions.api.setRowData(data);
  });
