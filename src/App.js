import React from "react";
import Board from "./Board.js";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Board initialWidth="4" initialHeight="4" cellSize="50px" />
      </div>
    );
  };
}

export default App;