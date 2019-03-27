import React from "react";
import Board from "./Board.js";
import "./App.css";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initialWidth: 4,
      initialHeight: 4,
      cellSize: 50
    }

    // this.onMouseUp = this.onMouseUp.bind(this);
    // this.onDragStart = this.onDragStart.bind(this);

    this.myInput = React.createRef();
  }


  // componentDidMount () {
  //   console.log(this.myInput.current.offsetWidth);
  // }

  // onMouseDown(e) {

  //   this.moveAt(e);
    
   
  //   document.onmousemove = (e) => this.onMouseMoveHandler(e);
    
  // }

  // onMouseMoveHandler(e) {
  //   this.moveAt(e);
  // }

  // onMouseUp() {
  //   document.onmousemove = null;
    
  // }

  // moveAt(e) {
  //   this.setState({
  //     left:  e.pageX - this.myInput.current.offsetWidth / 2 + 'px',
  //     top: e.pageY - this.myInput.current.offsetHeight / 2 + 'px'
  //   });
  // }

  onDragStart() {
    return false;
  }

  render() {
    return (
      <div 
      ref={this.myInput}
      className="app"
      // onMouseDown={this.onMouseDown.bind(this)}
      // onMouseUp={this.onMouseUp}
      // onDragStart={this.onDragStart}  
      // style={{
      //   left: this.state.left,
      //   top: this.state.top,
      //   width: +this.state.initialWidth * this.state.cellSize + 150 + 'px'
      // }}
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