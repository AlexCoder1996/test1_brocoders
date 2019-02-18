class MySuperClass extends HTMLElement{
    
    constructor() {
        super();

        if (this.hasAttribute('cell-size')) {
            this.CELL_SIZE = this.getAttribute('cell-size');
        } else {
            this.CELL_SIZE = 50;
        }
        
        this.attachShadow({mode: 'open'});
        
        this.renderingElem();

        this.updateIndex();

        this.initializingElem();

    }

    CELL_SIZE;  // Size of cell, default size = 50px;
    GRID_GAP = 4;
    BORDER_SIZE = 2;
    PADDING = 4;
    LEFT = 100;
    TOP = 100;

    initializingElem(){
        this.countRows = 4;          //default number of Rows
        this.countColumns = 4;       //default number of Columns

        // currentRow and currentColumn calculated in delButtonAnimationHandler
        this.currentRow;    
        this.currentColumn;
        this.currentContainerStyleWidth;
        this.currentAddColumnButtonStyleLeft;
        this.currentDelColumnButtonStyleLeft;
        this.currentAddRowButtonStyleTop;
        this.currentDelRowButtonStyleTop;

        this.addColumnButtonHandler = this.addColumnButtonHandler.bind(this);
        this.delColumnButtonHandler = this.delColumnButtonHandler.bind(this);
        this.addRowButtonHandler = this.addRowButtonHandler.bind(this);
        this.delRowButtonHandler = this.delRowButtonHandler.bind(this);
        this.delButtonAnimationHandler = this.delButtonAnimationHandler.bind(this);
        this.delColButtonStyleHandler = this.delColButtonStyleHandler.bind(this);
        this.delRowButtonStyleHandler = this.delRowButtonStyleHandler.bind(this);
        this.mainContainerMouseOverHandler = this.mainContainerMouseOverHandler.bind(this);
        this.delColButtonHide = this.delColButtonHide.bind(this);
        this.delRowButtonHide = this.delRowButtonHide.bind(this);


        this.addColumnButton.addEventListener("click", this.addColumnButtonHandler);
        this.delColumnButton.addEventListener("click", this.delColumnButtonHandler);
        this.addRowButton.addEventListener("click", this.addRowButtonHandler);
        this.delRowButton.addEventListener("click", this.delRowButtonHandler);
        this.mainContainer.addEventListener("mouseover", this.delButtonAnimationHandler);
        this.delColumnButton.addEventListener("mouseover", this.delColButtonStyleHandler);
        this.delRowButton.addEventListener("mouseover", this.delRowButtonStyleHandler);
        this.mainContainer.addEventListener("mouseout", this.mainContainerMouseOverHandler);
        this.delColumnButton.addEventListener("mouseout", this.delColButtonHide);
        this.delRowButton.addEventListener("mouseout", this.delRowButtonHide);

    }

    renderingElem() {
        let superContainer = document.createElement('div');
        superContainer.id = "main-container";

        const item = document.createElement('div');
        item.className = "item";

        let buttonAddCol = document.createElement('div');
        buttonAddCol.innerHTML = '<span class="buttonSign plus">+</span>';
        buttonAddCol.id = "addColumn";
        buttonAddCol.className = "button";

        const buttonDelCol = document.createElement('div');
        buttonDelCol.innerHTML = '<span class="buttonSign minus">-</span>';
        buttonDelCol.id = "delColumn";
        buttonDelCol.className = "button";

        const buttonAddRow = document.createElement('div');
        buttonAddRow.innerHTML = '<span class="buttonSign plus">+</span>';
        buttonAddRow.id = "addRow";
        buttonAddRow.className = "button";

        const buttonDelRow = document.createElement('div');
        buttonDelRow.innerHTML = '<span class="buttonSign minus">-</span>';
        buttonDelRow.id = "delRow"
        buttonDelRow.className = "button";

        this.createStyle(); 

        for (let i = 0;i < 16; i++) {
            superContainer.appendChild(item.cloneNode());
        }
        this.shadowRoot.appendChild(superContainer);
        this.shadowRoot.appendChild(buttonAddCol);
        this.shadowRoot.appendChild(buttonDelCol);
        this.shadowRoot.appendChild(buttonAddRow);
        this.shadowRoot.appendChild(buttonDelRow);

        //Access to shadow dom of custom component
        this.root = document.querySelector('my-component').shadowRoot; 
        console.log(this.root);

        this.addColumnButton = this.root.getElementById("addColumn");
        this.delColumnButton = this.root.getElementById("delColumn");

        this.addRowButton = this.root.getElementById("addRow");
        this.delRowButton = this.root.getElementById("delRow");

        this.mainContainer = this.root.getElementById("main-container");

    }

   
    delButtonAnimationHandler(event) {
        if (this.countColumns !== 1) {
            this.delColumnButton.style.visibility = 'visible';
        }

        if (this.countRows !== 1) {
            this.delRowButton.style.visibility = 'visible';
        }

        let target = event.target;

        if (target.className !== 'item') {
            return;
        }

        this.delColumnButton.style.left = '105px';
        this.delRowButton.style.top = '105px';   

        //for animation delete-buttons
        let numberOfCol;
        let numberOfRow;

        // Calculating current row and column 
        for (let i = 0; i < target.parentElement.childNodes.length; i++) {
            if (target === target.parentElement.childNodes[i]) {
                if (i + 1 <= this.countColumns) {
                    numberOfCol = i + 1;
                } else if ( (i + 1) % this.countColumns === 0 ) {
                    numberOfCol = this.countColumns;
                } else {
                    numberOfCol = (i + 1) % this.countColumns;
                }

                this. currentColumn = numberOfCol;

                if (i + 1 <= this.countColumns) {
                    numberOfRow = 1;
                } else if ( (i + 1) % this.countColumns === 0 ) {
                    numberOfRow = (i + 1) / this.countColumns;
                } else {
                    numberOfRow = Math.floor( (i + 1) / this.countColumns ) + 1;
                }

                this.currentRow = numberOfRow; 
            }
        }

        console.log('currentCol = ' + this.currentColumn + '  currentRow = ' + this.currentRow); // FOR TEST CURRENT ITEM

        this.delColumnButton.style.transform = 'translateX(' + (+this.CELL_SIZE + this.GRID_GAP) * (this.currentColumn - 1) + 'px)';
        this.delRowButton.style.transform = 'translateY(' + (+this.CELL_SIZE + this.GRID_GAP)  * (this.currentRow - 1) + 'px)';
    }

    delRowButtonHandler() {
        if (this.countRows === 1) return;        

        this.countRows--;
        this.currentAddRowButtonStyleTop = 114 + this.countRows * this.CELL_SIZE + (this.countRows-1)*this.GRID_GAP + 'px';
        this.currentDelRowButtonStyleTop = this.TOP + this.BORDER_SIZE + this.GRID_GAP;

        for (let i = 0; i < this.countColumns; i++) {  
            this.mainContainer.removeChild(this.mainContainer.childNodes[this.countColumns * this.currentRow  - (i + 1)]);
        }       
        
        this.mainContainer.style.gridTemplateColumns = `repeat(${this.countColumns}, ${this.CELL_SIZE}px)`;
        this.addRowButton.style.top = this.currentAddRowButtonStyleTop; 
        if (this.currentRow === (this.countRows + 1) ) {
            this.delRowButton.style.top = this.currentDelRowButtonStyleTop - (this.CELL_SIZE + this.GRID_GAP) + "px";
        }
        
    };
   

    addRowButtonHandler() {        
        this.countRows++; 
        this.currentAddRowButtonStyleTop = 114 + this.countRows * this.CELL_SIZE + (this.countRows-1)*this.GRID_GAP + 'px';
        this.mainContainer.style.gridTemplateColumns = `repeat(${this.countColumns}, ${this.CELL_SIZE}px)`;
        this.addRowButton.style.top = this.currentAddRowButtonStyleTop; 
        for (let i = 0; i < this.countColumns; i++) {  
            let newItem = document.createElement('div');
            newItem.className = "item";             
            this.mainContainer.appendChild(newItem); 
        }                          
        this.updateIndex();
    };


    addColumnButtonHandler() {
        
        this.countColumns++; 
        this.currentContainerStyleWidth = this.CELL_SIZE * this.countColumns + this.GRID_GAP * (this.countColumns - 1) + 'px';
        this.currentAddColumnButtonStyleLeft = this.CELL_SIZE * this.countColumns + (this.countColumns-1)*this.GRID_GAP + 114 +'px';
        this.mainContainer.style.gridTemplateColumns = `repeat(${this.countColumns}, ${this.CELL_SIZE}px)`; 
        this.mainContainer.style.width = this.currentContainerStyleWidth;
        this.addColumnButton.style.left = this.currentAddColumnButtonStyleLeft;
        for (let i = 0; i < this.countRows; i++) {  
            let newItem = document.createElement('div');
            newItem.className = "item";             
            this.mainContainer.appendChild(newItem); 
        }                          
        this.updateIndex();
    }

    delColumnButtonHandler() {
        if (this.countColumns === 1) return;        
        this.countColumns--;
        this.currentContainerStyleWidth = this.CELL_SIZE * this.countColumns + 4 * (this.countColumns - 1) + 'px';
        this.currentAddColumnButtonStyleLeft = this.CELL_SIZE * this.countColumns + (this.countColumns-1)*this.GRID_GAP + 114 +'px';
        this.currentDelColumnButtonStyleLeft = this.LEFT + this.BORDER_SIZE + this.GRID_GAP;

        this.mainContainer.style.width = this.currentContainerStyleWidth;
        this.addColumnButton.style.left = this.currentAddColumnButtonStyleLeft;
        for (let i = this.countRows; i > 0 ; i--) {  
            this.mainContainer.removeChild(this.mainContainer.childNodes[(this.countColumns + 1) * (i - 1) + this.currentColumn - 1]);
        }       
        
        this.mainContainer.style.gridTemplateColumns = `repeat(${this.countColumns}, ${this.CELL_SIZE}px)`;
        console.log(this.countColumns, this.currentColumn);
        if (this.currentColumn === (this.countColumns + 1) ) {
            console.log(this.currentDelColumnButtonStyleLeft);
            this.delColumnButton.style.left = this.currentDelColumnButtonStyleLeft - (+this.CELL_SIZE + this.GRID_GAP) + 'px';
        }
    
    };    
    
    updateIndex() {
        for (let i = 0; i < this.mainContainer.childNodes.length; i++) {
            this.mainContainer.childNodes[i].innerHTML = `<span>${i + 1}</span>`;
        }
    };
    
    delRowButtonHide() {
        this.delRowButton.style.visibility = 'hidden';
    };


    delColButtonHide() {
        this.delColumnButton.style.visibility = 'hidden';
    };

    mainContainerMouseOverHandler() { 
        this.delColumnButton.style.visibility = 'hidden';
        this.delRowButton.style.visibility = 'hidden';                      
    };

    delRowButtonStyleHandler() {
        this.delRowButton.style.visibility = 'visible';
        if (this.countRows === 1) {
            this.delRowButton.style.visibility = 'hidden';
        }
    };

    delColButtonStyleHandler() {
        this.delColumnButton.style.visibility = 'visible';
        if (this.countColumns === 1) {
            this.delColumnButton.style.visibility = 'hidden';
        }
    };


    createStyle() {
        let style = document.createElement('style');
        style.textContent = `
            my-component {
                position: relative;
            }

            #main-container {
                position: absolute;
                display: grid;
                width:  ${this.CELL_SIZE * this.countColumns + 4 * (this.countColumns - 1)}px;
                grid-template-columns: repeat(4, ${this.CELL_SIZE}px);
                grid-column-gap: 4px;
                grid-row-gap: 4px;
                border: 1px solid #48aae6;
                padding: 4px;
                top: 100px;
                margin-bottom: 20px;
                left: 100px;
            }
            
            .item {
                width: ${this.CELL_SIZE}px;
                height: ${this.CELL_SIZE}px;
                background-color:#48aae6;
            }
            
            .button {
                position: absolute;
                width:${this.CELL_SIZE}px;
                height: ${this.CELL_SIZE}px;
            }

            #addColumn {
                top: 105px;
                left: ${this.CELL_SIZE * 4 + 4*3 + 114}px;
                background-color: #f3a500;
            }
            
            #addRow {
                top: ${this.CELL_SIZE * 4 + 4*3 + 114}px;
                left: 105px;
                background-color: #f3a500;
            }
            
            #delColumn, #delRow {
                background-color: #b20000;
                visibility: hidden;
            }
            
            #delColumn:hover, #delRow:hover {
                display: block;
            }
            
            #delColumn {
                top: ${96 - this.CELL_SIZE}px;
                left: ${105 + this.CELL_SIZE * 3 + 12}px; 
                
            }
            
            #delRow {
                top: 105px;
                left: ${96 - this.CELL_SIZE}px; 
            
            }
            
            #addColumn, #addRow {
                transition-duration: 600ms;
                transition-property: background-color;
            }
            
            #addColumn:hover, #addRow:hover {
                cursor: pointer;
                background-color: #fcbe38;
            }
            
            #delRow, #delColumn {
                transition: transform 0.4s, background-color 0.4s, visibility 0.2s;
            }
            
            #delRow:hover, #delColumn:hover {
                cursor: pointer;
                background-color: #b15252;
            }
            
            .buttonSign {
                color: white;
                font-size: ${this.CELL_SIZE / 2}px;
                font-weight: bold;
                display: block;
            }

            .plus {
                margin-top: ${this.CELL_SIZE  / 4}px;
                margin-left: ${this.CELL_SIZE  / 3}px;
            }
            
            .minus {
                margin-top: ${this.CELL_SIZE / 9}px;
                margin-left: ${this.CELL_SIZE / 2.5}px;
                
            }      
        `;
        this.shadowRoot.appendChild(style);
        console.log('style is conected: ' + style.isConnected);
    }



}

customElements.define('my-component', MySuperClass);

