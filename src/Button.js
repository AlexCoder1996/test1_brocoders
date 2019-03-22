import React from "react";
import "./Button.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render () {
    return (
      <button
        className={"btn " + this.props.className}
        style={{
          width: this.props.cellSize,
          height: this.props.cellSize,
          left: this.props.left,
          top: this.props.top,
          visibility: this.props.visibility
        }}
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        ref={this.myRef}
      >
        {this.props.sign}
      </button>
    );
  }
}

export default Button;
