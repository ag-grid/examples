import React, { Component } from 'react';
export default class CheckboxRenderer extends Component {

    constructor(props) {
      super(props);
      this.checkedHandler = this.checkedHandler.bind(this);
    }
    checkedHandler(e) {
      let checked = e.target.checked;
      let colId = this.props.column.colId;
      this.props.node.setDataValue(colId, checked);
      console.log(checked)
    }
    render() {
      return (
        <input
          type="checkbox"  onClick={this.checkedHandler} checked={this.props.value}
        />
      )
    }
  }