
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AgGridReact } from 'ag-grid-react';
import { mount } from 'enzyme';
import App from './App';


let component = null;
let agGridReact = null;

const ensureGridApiHasBeenSet = async (componentRef) => {
  await act(async () => {
    await new Promise(function (resolve, reject) {
      (function waitForGridReady() {
        if (componentRef.current.getApi()) {
          if (componentRef.current.getApi().getRowNode(8)) {
            return resolve();
          }

        }
        setTimeout(waitForGridReady, 10);
      })();
    })

  });
};


beforeEach(async () => {
  const ref = React.createRef()
  component = mount(<App ref={ref} />);
  agGridReact = component.find(AgGridReact).instance();
  await ensureGridApiHasBeenSet(ref);
});

afterEach(() => {
  component.unmount();
  agGridReact = null;
})


it('updated first row athlete from michael phelps to john smith', () => {
  const firstNode = agGridReact.api.getRowNode('0');
  expect(firstNode.data.athlete).toEqual("Michael Phelps");

  firstNode.setData({ athlete: "John Smith" });
  expect(firstNode.data.athlete).toEqual("John Smith");
});