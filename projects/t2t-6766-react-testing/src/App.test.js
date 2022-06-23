
import React from 'react';
import { render, screen, act, waitFor, getByTestId } from '@testing-library/react';
import { AgGridReact } from 'ag-grid-react';
import { mount } from 'enzyme';
import App from './App';
// const ensureGridApiHasBeenSet = (component) => {
//   return new Promise(function (resolve, reject) {
//     (function waitForGridReady() {

// if (screen.getByTestId('api').innerHTML !== '') {
//   console.log('resovled onGridReady!');
//   return resolve();
// }
//       setTimeout(waitForGridReady, 100);
//     })();
//   });
// };

const ensureGridApiHasBeenSet = async (component) => {
  await act(async () => {
    await new Promise(function (resolve, reject) {
      (function waitForGridReady() {

        if (component.getByTestId('api').innerHTML !== '') {
          console.log('resovled onGridReady!');
          return resolve();
        }
        setTimeout(waitForGridReady, 10);
      })();
    })

  });
};
describe('grid functionality', () => {
  let appComponent = null;

  beforeEach(async () => {
    // jest.useFakeTimers();
    appComponent = render(<App />);
    await ensureGridApiHasBeenSet(appComponent);
    // await waitFor(() => ensureGridApiHasBeenSet(appComponent), { timeout: 10000 });
  });
  afterEach(() => {
    // jest.useRealTimers();
  });
  test('Mounting grid should put first cell in focus and edit', () => {
    console.log('in test edit');
    let cell = screen.getByText('Toyota');
    expect(cell).toBeInTheDocument(); //this is true
    expect(cell).toHaveClass('ag-cell-focus'); //this is false.
    // Reason is cell does not have inline-editing class nor focused class
  });
});

/*
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
*/