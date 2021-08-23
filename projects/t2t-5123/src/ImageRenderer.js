import React, { Component } from 'react';
export default class ImageRenderer extends Component {

  constructor(props) {
    super(props);
    //this.checkedHandler = this.checkedHandler.bind(this);
  }
  // checkedHandler(e) {
  //   let checked = e.target.checked;
  //   let colId = this.props.column.colId;
  //   this.props.node.setDataValue(colId, checked);
  //   console.log(checked)
  // }

  render() {
    console.log(this.props)
    //return null
    // let image = new Image()
    // image.src='http://irights04.graymatterllc.com/releaseinfpic/pic2.php?skey=123&userid=&propno='+this.props.value.toUpperCase()
    // image.style.height='100%'
    // return (image)
    return (
      <img
        src={'http://irights04.graymatterllc.com/releaseinfpic/pic2.php?skey=123&userid=&propno=' + this.props.value.toUpperCase()}
        style={{ height: '100%' }}
        alt="foo"
      />
    )
  }
}