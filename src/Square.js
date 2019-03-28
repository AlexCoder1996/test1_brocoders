import React from "react";
import "./Square.css";

class Square extends React.PureComponent {

  render () {
    return (
      <div
        className="square"
        style={{ 
          width: this.props.cellSize + 'px',
          height: this.props.cellSize + 'px',
          lineHeight: this.props.cellSize + 'px'
        }}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      > 
        {this.props.children}
      </div>
    );
  }
}

export default Square;