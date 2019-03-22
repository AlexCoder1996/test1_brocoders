import React from "react";
import Button from "./Button.js";
import Square from "./Square.js";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: +this.props.initialWidth || 4,
      height: +this.props.initialHeight || 4,
      cellSize: parseInt(this.props.cellSize) || +"50",
      curCol: null,
      curRow: null,
      visibilityDelColBtn: 'hidden',
      visibilityDelRowBtn: 'hidden',
      delCol: [],
      delRow: []
    };
  }

  handleDelRow() {
    let height;
    height = this.state.height;
    if (height <= 1) {
      this.setState({visibilityDelRowBtn: 'hidden'});
      return;
    }
    height -= 1;
    let delRow = this.state.delRow.concat([this.state.curRow])
    this.setState({ 
      height: height,
      delRow: delRow
    });

    if (this.state.curRow === height) {
      this.setState({visibilityDelRowBtn: 'hidden'})
    }
  }

  handleDelColumn() {

    let width = this.state.width;
    if (width <= 1) {
      this.setState({visibilityDelColBtn: 'hidden'})
      return;
    }
    width -= 1;

    let delCol = this.state.delCol.concat([this.state.curCol]);

    this.setState({
        width: width,
        delCol: delCol
      });

    if (this.state.curCol === width) {
      this.setState({visibilityDelColBtn: 'hidden'})
    }
  }

  handleAddColumn() {
    this.setState({
      width: this.state.width + 1,
      delCol: []
    });
  }

  handleAddRow() {
    this.setState({ 
      height: this.state.height + 1,
      delRow: []
    });
  }

  handleSquareMouseOver(row, col) {
    if (this.state.width !== 1) {
      this.setState({visibilityDelColBtn: 'visible'});
    }

    if (this.state.height !== 1) {
      this.setState({visibilityDelRowBtn: 'visible'});
    }

    this.setState({ curCol: col });
    this.setState({ curRow: row });
  }

  handleSquareMouseOut() {
    this.setState({
      visibilityDelColBtn: 'hidden',
      visibilityDelRowBtn: 'hidden'
     });
  }

  handleDelColMouseOver() {
    this.setState({visibilityDelColBtn: 'visible'});
  }

  handleDelRowMouseOver() {
    this.setState({visibilityDelRowBtn: 'visible'});
  }

  handleDelColMouseOut() {
    this.setState({visibilityDelColBtn: 'hidden'});
  }

  handleDelRowMouseOut() {
    this.setState({visibilityDelRowBtn: 'hidden'})
  }

  renderSquares() {
    let squares = [];
    //  i - row, j - column
    for (let i = 0; i < this.state.height; i++) {
      for (let j = 0; j < this.state.width; j++) {
        squares.push(
          <Square
            key={[i, j]}
            index={(i + 1) + '/' + (j + 1)}
            cellSize={this.state.cellSize}
            onMouseOver={this.handleSquareMouseOver.bind(this, i, j)}
            onMouseOut={this.handleSquareMouseOut.bind(this)}
          />
        );
      }
    }
    return squares;
  }

  render() {
    let widthBoard = this.state.width * this.state.cellSize + (this.state.width - 1) * 2 + 2;
    let heightBoard = this.state.height * this.state.cellSize + (this.state.height - 1) * 2 + 2;
    let marginLeft = this.state.cellSize + 10;
    let marginTop = marginLeft;
    let leftDelBtn = marginLeft + 2 + (this.state.curCol) * (this.state.cellSize + 2) + 'px';
    let topDelBtn = (this.state.curRow) * (this.state.cellSize + 2) + 'px';
    return (
      <div>
        <div
          className="board"
          style={{
            width: widthBoard,
            height: heightBoard,
            marginLeft: marginLeft,
            marginTop: marginTop
          }}
        >
          {this.renderSquares()}
        </div>
        <Button
          visibility={this.state.visibilityDelColBtn}
          className="delColumn"
          sign="-"
          cellSize={this.state.cellSize}
          onClick={this.handleDelColumn.bind(this)}
          onMouseOver={this.handleDelColMouseOver.bind(this)}
          onMouseOut={this.handleDelColMouseOut.bind(this)}
          top={-marginTop + 8 + "px"}
          left={leftDelBtn}
        />
        <Button
          visibility={this.state.visibilityDelRowBtn}
          className="delRow"
          sign="-"
          cellSize={this.state.cellSize}
          onClick={this.handleDelRow.bind(this)}
          onMouseOver={this.handleDelRowMouseOver.bind(this)}
          onMouseOut={this.handleDelRowMouseOut.bind(this)}
          top={topDelBtn}
        />
        <Button
          visibility={this.state.visibilityAddColBtn}
          className="addColumn"
          sign="+"
          cellSize={this.state.cellSize}
          onClick={this.handleAddColumn.bind(this)}
          left={widthBoard + marginLeft + 4 + "px"}
          top={"2px"}
        />
        <Button
          visibility={this.state.visibilityAddRowBtn}
          className="addRow"
          sign="+"
          cellSize={this.state.cellSize}
          onClick={this.handleAddRow.bind(this)}
          top={heightBoard + 4 + "px"}
          left={marginLeft + 2 + "px"}
        />
      </div>
    );
  }
}

export default Board;