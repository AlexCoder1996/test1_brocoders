class MySuperClass {
    constructor(container) {
        let div = document.getElementById(container);

        let superContainer = document.createElement('div');
        superContainer.id = "main-container";

        let item = document.createElement('div');

        let buttonAddCol = document.createElement('div');
        buttonAddCol.innerHTML = '<span class="plus">+</span>';
        buttonAddCol.id = "addColumn";

        let buttonDelCol = document.createElement('div');
        buttonDelCol.innerHTML = '<span class="minus">-</span>';
        buttonDelCol.id = "delColumn";

        let buttonAddRow = document.createElement('div');
        buttonAddRow.innerHTML = '<span class="plus">+</span>';
        buttonAddRow.id = "addRow";

        let buttonDelRow = document.createElement('div');
        buttonDelRow.innerHTML = '<span class="minus">-</span>';
        buttonDelRow.id = "delRow"

        item.className = "item";

        for (var i = 0;i < 16; i++) {
            superContainer.appendChild(item.cloneNode());
        }
        div.appendChild(superContainer);
        div.appendChild(buttonAddCol);
        div.appendChild(buttonDelCol);
        div.appendChild(buttonAddRow);
        div.appendChild(buttonDelRow);

    }

}


window.onload = new MySuperClass('container');

var addColumnButton = document.getElementById("addColumn");
var delColumnButton = document.getElementById("delColumn");

var addRowButton = document.getElementById("addRow");
var delRowButton = document.getElementById("delRow");

var mainContainer = document.getElementById("main-container");
var countRows = 4;          //default number of Rows
var countColumns = 4;       //default number of Columns


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
    mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`; 
    mainContainer.style.width = parseInt(getComputedStyle(mainContainer).width) + 60 + "px";
    addColumnButton.style.left = parseInt(getComputedStyle(addColumnButton).left) + 60 + "px";
    for (var i = 0; i < countRows; i++) {  
        var newItem = document.createElement('div');
        newItem.className = "item";             
        mainContainer.appendChild(newItem); 
    }                          
    updateIndex();
}


function delColumnButtonHandler() {
    if (countColumns == 1) return;        

    let pos = delColumnButton.style.transform.match(/\d+/)[0]; //position od deleteColumnButton
    let col; //number of column need to delete
    if (pos == 0) {
        col = 1;
    } else {
        col = pos / 60 + 1;
    } 

    mainContainer.style.width = parseInt(getComputedStyle(mainContainer).width) - 60 + "px";
    addColumnButton.style.left = parseInt(getComputedStyle(addColumnButton).left) - 60 + "px";
    for (var i = countRows; i > 0 ; i--) {  
        mainContainer.removeChild(mainContainer.childNodes[countColumns * (i - 1) + col - 1]);
    }       
    countColumns--;
    mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`;
    if (delColumnButton.style.transform == 'translateX(' + countColumns  * 60 + 'px)' ) {
        delColumnButton.style.left = parseInt(getComputedStyle(delColumnButton).left) - 60 + "px";
    }
  
};

//Adding and deleting ROWS
function addRowButtonHandler() {        
    countRows++; 
    mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`;
    addRowButton.style.top = parseInt(getComputedStyle(addRowButton).top) + 60 + "px"; 
    for (var i = 0; i < countColumns; i++) {  
        var newItem = document.createElement('div');
        newItem.className = "item";             
        mainContainer.appendChild(newItem); 
    }                          
    updateIndex();
};

function delRowButtonHandler() {
    if (countRows == 1) return;        

    let pos = delRowButton.style.transform.match(/\d+/)[0]; //position od deleteRowButton
    let row; //number of row need to delete
    if (pos == 0) {
        row = 1;
    } else {
        row = pos / 60 + 1;
    } 
 
    for (var i = 0; i < countColumns; i++) {  
        mainContainer.removeChild(mainContainer.childNodes[countColumns * row - (i + 1)]);
    }       
    countRows--;
    mainContainer.style.gridTemplateColumns = `repeat(${countColumns}, 56px)`;
    addRowButton.style.top = parseInt(getComputedStyle(addRowButton).top) - 60 + "px"; 
    if (delRowButton.style.transform == 'translateY(' + countRows  * 60 + 'px)' ) {
        delRowButton.style.top = parseInt(getComputedStyle(delRowButton).top) - 60 + "px";
    }
    
};

function updateIndex() {
    for (var i = 0; i < mainContainer.childNodes.length; i++) {
        mainContainer.childNodes[i].innerHTML = `<span>${i + 1}</span>`;
    }
};

updateIndex();

function delButtonAnimationHandler(event) {
    if (countColumns !== 1) {
        delColumnButton.style.visibility = 'visible';
    }

    if (countRows !== 1) {
        delRowButton.style.visibility = 'visible';
    }

    var target = event.target;

    if (target.className != 'item') {
        return;
    }

    delColumnButton.style.left = '105px';
    delRowButton.style.top = '105px';   

    //for animation delete-buttons
    var numberOfCol;
    var numberOfRow;

    for (var i = 0; i < target.parentElement.childNodes.length; i++) {
        if (target == target.parentElement.childNodes[i]) {
            if (i + 1 <= countColumns) {
                numberOfCol = i + 1;
            } else if ( (i + 1) % countColumns == 0 ) {
                numberOfCol = countColumns;
            } else {
                numberOfCol = (i + 1) % countColumns;
            }

            if (i + 1 <= countColumns) {
                numberOfRow = 1;
            } else if ( (i + 1) % countColumns == 0 ) {
                numberOfRow = (i + 1) / countColumns;
            } else {
                numberOfRow = Math.floor( (i + 1) / countColumns ) + 1;
            }
        }
    }

    delColumnButton.style.transform = 'translateX(' + 60 * (numberOfCol-1) + 'px)';
    delRowButton.style.transform = 'translateY(' + 60 * (numberOfRow-1) + 'px)';
}

//Handlers for buttons
function delColButtonStyleHandler() {
    delColumnButton.style.visibility = 'visible';
    if (countColumns == 1) {
        delColumnButton.style.visibility = 'hidden';
    }
};

function delRowButtonStyleHandler() {
    delRowButton.style.visibility = 'visible';
    if (countRows == 1) {
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
