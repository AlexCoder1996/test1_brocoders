import React from "react";
import Button from "./Button.js";
import Square from "./Square.js";
import "./Board.css";

class Board extends React.PureComponent {

  static defaultProps = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  }

  constructor(props) {
    super(props);
  
    this.state = {
      width: +this.props.initialWidth,
      height: +this.props.initialHeight,
      cellSize: +this.props.cellSize,
      curCol: null,
      curRow: null,
      isDelColDis: false,
      isDelRowDis: false,
      visibilityDelColBtn: false,
      visibilityDelRowBtn: false,
      matrix: []
    };
 
  }

  componentWillMount() {
    const width = +this.props.initialWidth;
    const height = +this.props.initialHeight;
    let matrix = [];
    
    for (let i = 0; i < height; i++) {
      matrix[i] = [];
      for (let j = 0; j < width; j++) { 
        matrix[i][j] = ( (+i+1) + '/' + (j+1) );
      }
    }
    
    this.setState({matrix: matrix});
 }
 
  handleDelRow = () => {
    const { height, curRow, matrix } = this.state;
    let newMatrix = matrix.slice();

    if (height <= 1) { return }
   
    newMatrix.splice(curRow, 1);
   
    this.setState({
      visibilityDelRowBtn: ( (curRow === height - 1) || (height <= 2) ) ? false : true,
      height: height - 1,
      matrix: newMatrix,
      isDelRowDis: (curRow === height - 1) ? true : false
    });
  }

  handleDelColumn = () => {
    const { width, curCol, matrix, height } = this.state;
    let newMatrix = matrix.slice();

    if (width <= 1) { return }

    for (let i = 0; i < height; i++) {
      newMatrix[i].splice(curCol, 1);
    }

    this.setState({
      visibilityDelColBtn: (width <= 2 ) || (curCol === width - 1) ? false : true,
      width: width - 1,
      matrix: newMatrix,
      isDelColDis: (curCol === width - 1) ? true : false
    });
  }

  createMatrix = (isAddRow, isAddCol) => {
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

  handleAddColumn = () => {
    this.setState({ width: this.state.width + 1 });
    this.createMatrix(false, true);
    
  }

  handleAddRow = () => {
    this.setState({ height: this.state.height + 1 });
    this.createMatrix(true, false);
  }

  handleSquareMouseOver = (row, col) => {
    this.setState({ 
      visibilityDelColBtn: (this.state.width !== 1) ? true : false,
      isDelColDis: (this.state.width !== 1) ? false : true,
      visibilityDelRowBtn: (this.state.height !== 1) ? true : false,
      isDelRowDis: (this.state.height !== 1) ? false : true,
      curCol: col,
      curRow: row 
    });    
  }

  handleSquareMouseOut = () => {
    this.setState({
      visibilityDelColBtn: false,
      visibilityDelRowBtn: false
     });
  }

  handleDelColMouseOver = () => {
    this.setState({visibilityDelColBtn: true});
  }

  handleDelRowMouseOver = () => {
    this.setState({visibilityDelRowBtn: true});
  }

  handleDelColMouseOut = () => {
    this.setState({visibilityDelColBtn: false});
  }

  handleDelRowMouseOut = () => {
    this.setState({visibilityDelRowBtn: false})
  }

  renderSquares = () => {
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
          disabled={this.state.isDelColDis}
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
          disabled={this.state.isDelRowDis}
        />
        <Button
          visibility={true}
          className="addColumn"
          cellSize={cellSize}
          onClick={this.handleAddColumn}
          left={widthBoard + marginLeft + 4}
          top={2}
          children={"+"}
        />
        <Button
          visibility={true}
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