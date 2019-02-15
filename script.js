class MySuperClass extends HTMLElement{
    constructor() {
        super();

        //creating shadow root
        const shadow = this.attachShadow({mode: 'open'});
        
        const superContainer = document.createElement('div');
        superContainer.id = "main-container";

        const item = document.createElement('div');

        const buttonAddCol = document.createElement('div');
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

        item.className = "item";

        // Creating CSS for custom component
        const style = document.createElement('style');

        style.textContent = `
            body {
                position: relative;
            }
            
            #main-container {
                position: absolute;
                display: grid;
                width: 236px;
                grid-template-columns: repeat(4, 56px);
                grid-column-gap: 4px;
                grid-row-gap: 4px;
                border: 1px solid #48aae6;
                padding: 4px;
                top: 100px;
                margin-bottom: 20px;
                left: 100px;
            }
            
            .item {
                width: 56px;
                height: 56px;
                background-color:#48aae6;
            }
            
            .button {
                position: absolute;
                width:56px;
                height: 56px;
            }

            #addColumn {
                top: 105px;
                left: 350px;
                background-color: #f3a500;
            }
            
            #addRow {
                top: 350px;
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
                top: 40px;
                left: 105px; 
                
            }
            
            #delRow {
                top: 105px;
                left: 40px; 
            
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
                font-size: 2em;
                font-weight: bold;
                display: block;
            }

            .plus {
                margin-top: 9px;
                margin-left: 19px;
            }
            
            .minus {
                margin-top: 6px;
                margin-left: 23px;
                
            }      
        `;

        
        //Attaching the created elements to the shadow dom 
        shadow.appendChild(style);
        console.log('style is conected: ' + style.isConnected);
        // shadow.appendChild(superContainer);

        for (let i = 0;i < 16; i++) {
            superContainer.appendChild(item.cloneNode());
        }
        shadow.appendChild(superContainer);
        shadow.appendChild(buttonAddCol);
        shadow.appendChild(buttonDelCol);
        shadow.appendChild(buttonAddRow);
        shadow.appendChild(buttonDelRow);

        //Access to shadow dom of custom component
        const root = document.querySelector('my-component').shadowRoot; 
        console.log(root);

        const addColumnButton = root.getElementById("addColumn");
        const  delColumnButton = root.getElementById("delColumn");

        const addRowButton = root.getElementById("addRow");
        const delRowButton = root.getElementById("delRow");

        const mainContainer = root.getElementById("main-container");

        updateIndex();

        let countRows = 4;          //default number of Rows
        let countColumns = 4;       //default number of Columns

        // currentRow and currentColumn calculated in delButtonAnimationHandler
        let currentRow;    
        let currentColumn;
        let currentContainerStyleWidth;
        let currentAddColumnButtonStyleLeft;
        let currentDelColumnButtonStyleLeft;
        let currentAddRowButtonStyleTop;
        let currentDelRowButtonStyleTop;

        addColumnButton.addEventListener("click", addColumnButtonHandler);
        delColumnButton.addEventListener("click", delColumnButtonHandler);
        addRowButton.addEventListener("click", addRowButtonHandler);
        delRowButton.addEventListener("click", delRowButtonHandler);
        mainContainer.addEventListener("mouseover", delButtonAnimationHandler);
        delColumnButton.addEventListener("mouseover", delColButtonStyleHandler);
        delRowButton.addEventListener("mouseover", delRowButtonStyleHandler);
        mainContainer.addEventListener("mouseout", mainContainerMouseOverHandler);
        delColumnButton.addEventListener("mouseout", delColButtonHide);
        delRowButton.addEventListener("mouseout", delRowButtonHide);



        //Adding and deleting COLUMNS 
        function addColumnButtonHandler() {        
            countColumns++; 
            currentContainerStyleWidth = 56 * countColumns + 4 * (countColumns - 1) + 'px';
            currentAddColumnButtonStyleLeft = 350 + (countColumns - 4) * 60 + 'px';

            mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`; 
            mainContainer.style.width = currentContainerStyleWidth;
            addColumnButton.style.left = currentAddColumnButtonStyleLeft;
            for (let i = 0; i < countRows; i++) {  
                let newItem = document.createElement('div');
                newItem.className = "item";             
                mainContainer.appendChild(newItem); 
            }                          
            updateIndex();
        }


        function delColumnButtonHandler() {
            if (countColumns === 1) return;        
            countColumns--;
            currentContainerStyleWidth = 56 * countColumns + 4 * (countColumns - 1) + 'px';
            currentAddColumnButtonStyleLeft = 350 + (countColumns - 4) * 60 + 'px';
            currentDelColumnButtonStyleLeft = 105;

            mainContainer.style.width = currentContainerStyleWidth;
            addColumnButton.style.left = currentAddColumnButtonStyleLeft;
            for (let i = countRows; i > 0 ; i--) {  
                mainContainer.removeChild(mainContainer.childNodes[(countColumns + 1) * (i - 1) + currentColumn - 1]);
            }       
            
            mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`;
            console.log(countColumns, currentColumn);
            if (currentColumn === (countColumns + 1) ) {
                delColumnButton.style.left = currentDelColumnButtonStyleLeft - 60 + 'px';
            }
        
        };

        //Adding and deleting ROWS
        function addRowButtonHandler() {        
            countRows++; 
            currentAddRowButtonStyleTop = 350 + (countRows - 4) * 60 + 'px';
            mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`;
            addRowButton.style.top = currentAddRowButtonStyleTop; 
            for (let i = 0; i < countColumns; i++) {  
                let newItem = document.createElement('div');
                newItem.className = "item";             
                mainContainer.appendChild(newItem); 
            }                          
            updateIndex();
        };

        function delRowButtonHandler() {
            if (countRows === 1) return;        

            countRows--;
            currentAddRowButtonStyleTop = 350 + (countRows - 4) * 60 + 'px';
            currentDelRowButtonStyleTop = 105;
            // let pos = delRowButton.style.transform.match(/\d+/)[0]; //position od deleteRowButton
            // let row; //number of row need to delete
            // if (pos === 0) {
            //     row = 1;
            // } else {
            //     row = pos / 60 + 1;
            // } 
        
            for (let i = 0; i < countColumns; i++) {  
                mainContainer.removeChild(mainContainer.childNodes[countColumns * currentRow  - (i + 1)]);
            }       
            
            mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`;
            addRowButton.style.top = currentAddRowButtonStyleTop; 
            if (currentRow === (countRows + 1) ) {
                delRowButton.style.top = currentDelRowButtonStyleTop - 60 + "px";
            }
            
        };

        function updateIndex() {
            for (let i = 0; i < mainContainer.childNodes.length; i++) {
                mainContainer.childNodes[i].innerHTML = `<span>${i + 1}</span>`;
            }
        };

       

        function delButtonAnimationHandler(event) {
            if (countColumns !== 1) {
                delColumnButton.style.visibility = 'visible';
            }

            if (countRows !== 1) {
                delRowButton.style.visibility = 'visible';
            }

            let target = event.target;

            if (target.className !== 'item') {
                return;
            }

            delColumnButton.style.left = '105px';
            delRowButton.style.top = '105px';   

            //for animation delete-buttons
            let numberOfCol;
            let numberOfRow;

            // Calculating current row and column 
            for (let i = 0; i < target.parentElement.childNodes.length; i++) {
                if (target === target.parentElement.childNodes[i]) {
                    if (i + 1 <= countColumns) {
                        numberOfCol = i + 1;
                    } else if ( (i + 1) % countColumns === 0 ) {
                        numberOfCol = countColumns;
                    } else {
                        numberOfCol = (i + 1) % countColumns;
                    }

                    currentColumn = numberOfCol;

                    if (i + 1 <= countColumns) {
                        numberOfRow = 1;
                    } else if ( (i + 1) % countColumns === 0 ) {
                        numberOfRow = (i + 1) / countColumns;
                    } else {
                        numberOfRow = Math.floor( (i + 1) / countColumns ) + 1;
                    }

                    currentRow = numberOfRow; 
                }
            }

            console.log('currentCol = ' + currentColumn + '  currentRow = ' + currentRow); // FOR TEST CURRENT ITEM

            delColumnButton.style.transform = 'translateX(' + 60 * (currentColumn - 1) + 'px)';
            delRowButton.style.transform = 'translateY(' + 60 * (currentRow - 1) + 'px)';
        }

        //Handlers for buttons
        function delColButtonStyleHandler() {
            delColumnButton.style.visibility = 'visible';
            if (countColumns === 1) {
                delColumnButton.style.visibility = 'hidden';
            }
        };

        function delRowButtonStyleHandler() {
            delRowButton.style.visibility = 'visible';
            if (countRows === 1) {
                delRowButton.style.visibility = 'hidden';
            }
        };

        function mainContainerMouseOverHandler() { 
                delColumnButton.style.visibility = 'hidden';
                delRowButton.style.visibility = 'hidden';                      
        };

        function delColButtonHide() {
            delColumnButton.style.visibility = 'hidden';
        };

        function delRowButtonHide() {
            delRowButton.style.visibility = 'hidden';
        };


    }

}

customElements.define('my-component', MySuperClass);

