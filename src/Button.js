import React from "react";
import "./Button.css";

class Button extends React.PureComponent {
  render () {
    return (
      <button
        className={"btn " + this.props.className}
        style={{
          width: this.props.cellSize + 'px',
          height: this.props.cellSize + 'px',
          left: this.props.left + 'px',
          top: this.props.top + 'px',
          visibility: this.props.visibility
        }}
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
