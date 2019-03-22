import React from "react";
import "./Square.css";

class Square extends React.Component {

  render () {
    return (
      <div
        className="square"
        style={{ 
          width: this.props.cellSize,
          height: this.props.cellSize 
        }}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      > 
        {this.props.index}
      </div>
    );
  }
}

export default Square;