import React from "react";
import Board from "./Board.js";
import "./App.css";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      initialWidth: 4,
      initialHeight: 4,
      cellSize: 50
    }
    this.myInput = React.createRef();
  }

  onMouseDown = (e) => {

    if ( 'btn' === e.target.className.substr(0, 3)) { return }

    let shiftX = e.pageX - this.myInput.current.getBoundingClientRect().left;
    let shiftY = e.pageY - this.myInput.current.getBoundingClientRect().top;

    this.moveAt(e);
  
    document.onmousemove = (e) => this.onMouseMoveHandler(e, shiftX, shiftY);
    
  }

  onMouseMoveHandler = (e, shiftX, shiftY) => {
    this.moveAt(e, shiftX, shiftY);
  }

  onMouseUp = () => {
    document.onmousemove = null;  
  }

  moveAt = (e, shiftX, shiftY) => {
    this.setState({
      left:  e.pageX - shiftX ,
      top: e.pageY - shiftY - 95
    });

    console.log(this.state.left + ' ' + this.state.top + '\n' + e.pageX + ' ' + e.pageY);
  }

  onDragStart = (e) => {
    return false;
  }

  render() {
    return (
      <div 
      ref={this.myInput}
      className="app"
      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onDragStart={this.onDragStart}  
      style={{
        left: this.state.left + 'px',
        top: this.state.top + 'px',
        width: +this.state.initialWidth * this.state.cellSize + 'px'
      }}
      >
        <Board 
          initialWidth={this.state.initialWidth} 
          initialHeight={this.state.initialHeight}
          cellSize={this.state.cellSize}
        />
      </div>
    );
  };
}

export default App;