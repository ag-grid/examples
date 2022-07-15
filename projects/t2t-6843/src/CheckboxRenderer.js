import React, { useState } from 'react';

const CheckboxRenderer = (props) => {
  const checkedHandler = (e) => {
    const checked = e.target.checked;
    let colId = props.column.colId;

    console.log(`setting the value [${colId}] = ${checked}`);
    props.node.setDataValue(colId, checked);
  };

  return (
    <input type='checkbox' onChange={checkedHandler} checked={props.value} />
  );
};

export default CheckboxRenderer;
