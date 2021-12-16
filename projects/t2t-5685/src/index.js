'use strict';

import React, { useState, useEffect } from 'react';
import { render, createPortal } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './index.css';

const MyWindowPortal = (props) => {
  // STEP 1: create a container <div>
  const [containerEl] = useState(document.createElement('div'));
  // const externalWindow = null;

  useEffect(() => {
    // STEP 3: open a new browser window and store a reference to it
    let externalWindow;
    externalWindow = window.open('', '', 'width=600,height=600,left=200,top=200');

    copyStyles(document, externalWindow.document);

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    externalWindow.document.body.appendChild(containerEl);
  }, []);


  // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
  return createPortal(props.children, containerEl);
}


const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          defaultColDef={{
            flex: 1,
            minWidth: 100,
          }}
          enableRangeSelection={true}
          onGridReady={onGridReady}
          rowData={rowData}
          sideBar
        >
          <AgGridColumn field="athlete" minWidth={150} />
          <AgGridColumn field="age" maxWidth={90} />
          <AgGridColumn field="country" minWidth={150} />
          <AgGridColumn field="year" maxWidth={90} />
          <AgGridColumn field="date" minWidth={150} />
          <AgGridColumn field="sport" minWidth={150} />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
};

const App = () => {
  const [showWindowPortal, setShowWindowPortal] = useState(null);

  return (
    <div>
      <button onClick={() => setShowWindowPortal(true)}>open portal</button>
      {/* <GridExample /> */}
      {showWindowPortal && (
        <MyWindowPortal>
          <GridExample />
        </MyWindowPortal>
      )}
    </div>
  )
}

render(<App />, document.querySelector('#root'));




function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // for <style> elements
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}