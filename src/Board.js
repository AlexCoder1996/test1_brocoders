import React from "react";
import Button from "./Button.js";
import Square from "./Square.js";
import "./Board.css";

class Board extends React.PureComponent {
  constructor(props) {
    super(props);
  
    this.state = {
      width: +this.props.initialWidth,
      height: +this.props.initialHeight,
      cellSize: +this.props.cellSize,
      curCol: null,
      curRow: null,
      visibilityDelColBtn: 'hidden',
      visibilityDelRowBtn: 'hidden',
      matrix: []
    };
 
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
    this.handleDelRowMouseOut = this.handleDelRowMouseOut.bind(this);
    this.handleDelRowMouseOver = this.handleDelRowMouseOver.bind(this);
    this.handleDelRow = this.handleDelRow.bind(this);
    this.handleDelColMouseOut = this.handleDelColMouseOut.bind(this);
    this.handleDelColMouseOver = this.handleDelColMouseOver.bind(this);
    this.handleDelColumn = this.handleDelColumn.bind(this);
    this.handleSquareMouseOut = this.handleSquareMouseOut.bind(this);

  }

  componentWillMount() {
    const width = +this.props.initialWidth;
    const height = +this.props.initialHeight;
    let matrix = [];
    
    for (let i = 0; i < height; i++) {
      matrix[i] = [];
      for (let j = 0; j < width; j++) { 
        matrix[i][j] = ( (+i+1) + '/' + (j+1));
      }
    }
    
    this.setState({matrix: matrix});
 }
  static defaultProps = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  }

  handleDelRow() {
    const { height, curRow, matrix } = this.state;

    if (height <= 1) {
      this.setState({visibilityDelRowBtn: 'hidden'});
      return;
    }
    this.setState({ height: height - 1 });
    let newMatrix = matrix;
    newMatrix.splice(curRow, 1);
    this.setState({ matrix: newMatrix });

    if (curRow === height) {
      this.setState({visibilityDelRowBtn: 'hidden'})
    }
  }

  handleDelColumn() {
    const { width, curCol, matrix, height } = this.state;

    if (width <= 1) {
      this.setState({visibilityDelColBtn: 'hidden' })
      return;
    }

    for (let i = 0; i < height; i++) {
      matrix[i].splice(curCol, 1);
    }

    this.setState({ 
      width: width - 1,
      matrix: matrix 
     });

    if (curCol === width) {
      this.setState({visibilityDelColBtn: 'hidden'})
    }
  }

  createMatrix(isAddRow, isAddCol) {
    const { width, height } = this.state;
    let matrix = [];
    
    for (let i = 0; i < +height + isAddRow; i++) {
      matrix[i] = [];
      for (let j = 0; j < +width + isAddCol; j++) { 
        matrix[i][j] = ( (+i+1) + '/' + (j+1));
      }
    }
    
    this.setState({matrix: matrix});
  }

  handleAddColumn() {
    this.setState({ width: this.state.width + 1 });
    this.createMatrix(false, true);
    
  }

  handleAddRow() {
    this.setState({ height: this.state.height + 1 });
    this.createMatrix(true, false);
  }

  handleSquareMouseOver(row, col) {
    if (this.state.width !== 1) {
      this.setState({visibilityDelColBtn: 'visible'});
    }

    if (this.state.height !== 1) {
      this.setState({visibilityDelRowBtn: 'visible'});
    }

    this.setState({ 
      curCol: col,
      curRow: row 
    });    
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
    const { cellSize, height, width, matrix } = this.state;
    let squares = [];
    
    //  i - row, j - column
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        squares.push(
          <Square
            key={matrix[i][j]}
            cellSize={cellSize}
            onMouseOver={this.handleSquareMouseOver.bind(this, i, j)}
            onMouseOut={this.handleSquareMouseOut}
            children={matrix[i][j]}
          />
        );
      }
    }
    
    return squares;
 
  }

  render() {
    const { width,
          height, 
          cellSize, 
          curCol, 
          curRow, 
          visibilityDelColBtn, 
          visibilityDelRowBtn 
        } = this.state
        
    let widthBoard = width * cellSize + (width - 1) * 2 + 2;
    let heightBoard = height * cellSize + (height - 1) * 2 + 2;
    let marginLeft = cellSize + 10;
    let marginTop = marginLeft;
    let leftDelBtn = marginLeft + 2 + (curCol) * (cellSize + 2);
    let topDelBtn = (curRow) * (cellSize + 2);
    
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
          visibility={visibilityDelColBtn}
          className="delColumn"
          cellSize={cellSize}
          onClick={this.handleDelColumn}
          onMouseOver={this.handleDelColMouseOver}
          onMouseOut={this.handleDelColMouseOut}
          top={-marginTop + 8}
          left={leftDelBtn}
          children={"-"}
        />
        <Button
          visibility={visibilityDelRowBtn}
          className="delRow"
          cellSize={cellSize}
          onClick={this.handleDelRow}
          onMouseOver={this.handleDelRowMouseOver}
          onMouseOut={this.handleDelRowMouseOut}
          top={topDelBtn}
          children={"-"}
        />
        <Button
          className="addColumn"
          cellSize={cellSize}
          onClick={this.handleAddColumn}
          left={widthBoard + marginLeft + 4}
          top={2}
          children={"+"}
        />
        <Button
          className="addRow"
          cellSize={cellSize}
          onClick={this.handleAddRow}
          top={heightBoard + 4}
          left={marginLeft + 2}
          children={"+"}
        />
      </div>
    );
  }
}

export default Board;