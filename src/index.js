import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 
function Btn(props) {
    return (
        <div className={"btn " + props.className} 
        style={
            {width: props.cellSize,
            height: props.cellSize,
            left: props.left,
            top: props.top}
        }
        onClick={props.onClick}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}>
            {props.sign}
        </div>
    );
}

function Square(props) {
    return (
        <div 
            className="square"
            style={
                {width: props.cellSize,
                height: props.cellSize}
            }
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
        >
        
        </div>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            width: this.props.initialWidth || 4,
            height: this.props.initialHeight || 4,
            cellSize: this.props.cellSize || '50px',
            curCol: null,
            curRow: null
        }
    }

    handleDelRow() {
        let height;
        height = +this.state.height;
        const delRowBtn = document.querySelector(".delRow");
        if (height <= 1) {        
            delRowBtn.style.visibility = 'hidden';
            return;
        }
        height -= 1;
        this.setState({height: height});

        if (this.state.curRow === height+1) {
            delRowBtn.style.visibility = 'hidden';
        }

        const addRowBtn = document.querySelector(".addRow");
        let cellSize = parseInt(this.state.cellSize);
        addRowBtn.style.top = parseInt(getComputedStyle(addRowBtn).top) - (cellSize + 2) + 'px';

        
    }

    handleDelColumn() {
        let width;
        width = +this.state.width;
        const delColumnBtn = document.querySelector(".delColumn");
        if (width <= 1) { 
            delColumnBtn.style.visibility = 'hidden';
            return;
        }
        width -= 1;
        this.setState({ width: width});
       
        if (this.state.curCol === width+1) {
            delColumnBtn.style.visibility = 'hidden';
        }

        const addColBtn = document.querySelector(".addColumn");
        let cellSize = parseInt(this.state.cellSize);
        addColBtn.style.left = parseInt(getComputedStyle(addColBtn).left) - (cellSize + 2) + 'px';

    }

    handleAddColumn() {
        let width;
        width = +this.state.width;
        width += 1;
        this.setState({width: width});

        const addColBtn = document.querySelector(".addColumn");
        let cellSize = parseInt(this.state.cellSize);
        addColBtn.style.left = parseInt(getComputedStyle(addColBtn).left) + (cellSize + 2) + 'px';
    }

    handleAddRow() {
        let height;
        height = +this.state.height;
        height += 1;
        this.setState({height: height});

        const addRowBtn = document.querySelector(".addRow");
        let cellSize = parseInt(this.state.cellSize);
        addRowBtn.style.top = parseInt(getComputedStyle(addRowBtn).top) + (cellSize + 2) + 'px';
    }

    handleSquareMouseOver(i) {
        const delColumnBtn = document.querySelector(".delColumn");
        const delRowBtn = document.querySelector(".delRow");

        if (this.state.width !==1 ) {
            delColumnBtn.style.visibility = 'visible';            
        }

        if (this.state.height !== 1) {
            delRowBtn.style.visibility = 'visible';
        }

        let curCol, curRow;

        if (i + 1 <= this.state.width) {
            curCol = i + 1;
        } else if ( (i + 1) % this.state.width === 0 ) {
            curCol = this.state.width;
        } else {
            curCol = (i + 1) % this.state.width;
        }
        this.setState({curCol: curCol});

        if (i + 1 <= this.state.width) {
            curRow = 1;
        } else if ( (i + 1) % this.state.width === 0) {
            curRow = (i + 1) / this.state.width;
        } else {
            curRow = Math.floor( (i + 1) / this.state.width ) + 1;
        }
        this.setState({curRow: curRow});
       

        delColumnBtn.style.transform = 'translateX(' + ((curCol-1) * (parseInt(this.state.cellSize) + 2)) + 'px)';
        delRowBtn.style.transform = 'translateY(' + ((curRow-1) * (parseInt(this.state.cellSize) + 2)) + 'px)';
    }

    handleSquareMouseOut() {
        const delColumnBtn = document.querySelector(".delColumn");
        const delRowBtn = document.querySelector(".delRow");
        delColumnBtn.style.visibility = 'hidden';
        delRowBtn.style.visibility = 'hidden';
    } 

    handleDelColMouseOver() {
        const delColumnBtn = document.querySelector(".delColumn");
        delColumnBtn.style.visibility = 'visible';
    }

    handleDelRowMouseOver() {
        const delRowBtn = document.querySelector(".delRow");
        delRowBtn.style.visibility = 'visible';
    }

    handleDelColMouseOut() {
        const delColumnBtn = document.querySelector(".delColumn");
        delColumnBtn.style.visibility = 'hidden';
    }

    handleDelRowMouseOut() {
        const delRowBtn = document.querySelector(".delRow");
        delRowBtn.style.visibility = 'hidden';
    }

    renderSquares() {
        let squares = [];
        for (let i = 0, k = 0;i < this.state.width * this.state.height; i++, k++) {
            
            squares.push(<Square 
                            key={i} 
                            index={k} 
                            cellSize={this.state.cellSize} 
                            onMouseOver={this.handleSquareMouseOver.bind(this, i)} 
                            onMouseOut={this.handleSquareMouseOut.bind(this)}
                        />);
        }
        return squares;
    }
    
    render() {
        let widthBoard = this.state.width * (parseInt(this.state.cellSize)) + (this.state.width-1)*2 + 2 + 'px';
        let heightBoard = this.state.height * (parseInt(this.state.cellSize)) + (this.state.height-1)*2 + 2 + 'px';
        let  marginLeft = (parseInt(this.state.cellSize)) + 10 + 'px';
        let  marginTop = marginLeft;
        return (
            <div>
                <div className="board"
                    style={
                        {width: widthBoard ,
                        height: heightBoard,
                        marginLeft: marginLeft,
                        marginTop: marginTop}
                }>
                    {this.renderSquares()}
                </div>
                <Btn className="delColumn" 
                    sign="-"
                    cellSize={this.state.cellSize}
                    onClick={this.handleDelColumn.bind(this)}
                    onMouseOver={this.handleDelColMouseOver.bind(this)}
                    onMouseOut={this.handleDelColMouseOut.bind(this)} 
                    top={-parseInt(marginTop) + 8 + 'px'}
                    left={parseInt(marginLeft) + 2 + 'px'}
                />
                <Btn className="delRow" 
                    sign="-"
                    cellSize={this.state.cellSize}
                    onClick={this.handleDelRow.bind(this)}
                    onMouseOver={this.handleDelRowMouseOver.bind(this)}
                    onMouseOut={this.handleDelRowMouseOut.bind(this)}
                />
                <Btn className="addColumn" 
                    sign="+"
                    cellSize={this.state.cellSize}
                    onClick={this.handleAddColumn.bind(this)}
                    left={parseInt(widthBoard) + parseInt(marginLeft) + 4 + 'px'}
                    top={'2px'}
                />
                <Btn className="addRow" 
                    sign="+"
                    cellSize={this.state.cellSize}
                    onClick={this.handleAddRow.bind(this)}
                    top={parseInt(heightBoard) + 4 + 'px'}
                    left={parseInt(marginLeft) + 2 + 'px'}
                />
            </div>  
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Board initialWidth="4" initialHeight="4" cellSize="50px" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));