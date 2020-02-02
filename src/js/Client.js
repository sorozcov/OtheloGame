// Silvio Orozco 18282
// Universidad del Valle de Guatemala 
// Othelo Game

//Obtains root
const root = document.getElementById("root");
root.style.backgroundColor = 'red';
root.style.height = '90vh';

//Create text function
const createText = function createText({innerText,color,fontSize,textAlign='center',padding='0.3vh'}){
    let text =document.createElement("div");
    text.innerText = innerText;
    text.style.color = color;
    text.style.textAlign = textAlign;
    text.style.fontSize = fontSize;
    text.style.paddingTop=padding;
    return text
}





const render = function(root,state){

    //Turno del jugador
    const { playerTurn } = state;

     //Game Title Div
     const gameTitle = document.createElement("div");
     gameTitle.style.height = '5vh';
     gameTitle.style.backgroundColor = 'black';
     titleText = createText({innerText:"Othelo",color:'white',fontSize:'24px',padding:'1vh'});
     //Appends
     root.appendChild(gameTitle);
     gameTitle.appendChild(titleText);
  

    //Informacion del juego
    const gameInformation = document.createElement("div");
    gameInformation.style.height = '9vh';
    gameInformation.style.backgroundColor = 'white';
    const gameBoard = document.createElement("div");
    gameBoard.style.height = '85vh';
    gameBoard.style.backgroundColor = '#F1C40F';
    gameBoard.style.textAlign = 'center';
    const board = document.createElement("div");
    board.style.backgroundColor = 'green';
    board.style.border = '2.5vh solid black';
    board.style.height = '80vh';
    board.style.width = '80vh';
    board.style.textAlign = 'center';
    board.style.display = 'inline-block'

    //Appends
    root.appendChild(gameInformation);
    root.appendChild(gameBoard);
    gameBoard.appendChild(board);
    state.boardState.map((row,rowIndex)=>{
        row.map((col,colIndex)=>{
            renderSpace({
                row:rowIndex,
                col:colIndex,
                value: state.boardState[rowIndex][colIndex],
                board: board,
                playerTurn,
                boardState: state.boardState
            })
    
        })
        
    })
    const win = checkGameScore(state,gameInformation)
    if(win==1){
        alert("El equipo Negro ha ganado.");
    }else if(win==-1){
        alert("El equipo Blanco ha ganado.");
    }else if(win==null){
        alert("Ha sido un empate.");
    }else{
        let movementPossible = false;
        let hi = board.childNodes.forEach(
            child => movementPossible = eval(child.dataset.check) || movementPossible,
        );
        if(!movementPossible){
            alert("No hay movimiento posible. Cambio de turno.");
            APP_STATE.playerTurn = -(APP_STATE.playerTurn);
            root.innerHTML ="";
            render(root,APP_STATE);
        }
    }
    
     
}

//if black wins return 1, if white wins returns -1, if game is still posible = 0, if tie game =null
const checkGameScore = function(state,gameInformation){
    let black = 0;
    let white = 0;
    let playerTurn = "";
    if(state.playerTurn==1){
        playerTurn = "Negro"
    }else{
        playerTurn = "Blanco"
    }
    state.boardState.map((row,rowIndex)=>{
        row.map((col,colIndex)=>{
            if (state.boardState[rowIndex][colIndex]==1){
                black++;
            }else if(state.boardState[rowIndex][colIndex]==-1){
                white++;
            }
           

        })

      
    })
    let innerText =  "Turno del jugador: " + playerTurn ; 
    let textInformation = createText({
       innerText,color:'black',fontSize:'16px'
    });
    gameInformation.appendChild(textInformation);
     innerText =  "Cantidad de negro: "+black ; 
     textInformation = createText({
       innerText,color:'black',fontSize:'16px'
    })
    gameInformation.appendChild(textInformation);
    innerText = "Cantidad de blanco: "+white; 
    textInformation = createText({
        innerText,color:'black',fontSize:'16px'
     })
    gameInformation.appendChild(textInformation);
    if(white+black==64){
        if(white>black){
            return -1;
        }else if(black>white){
            return 1;
        }else{
            return null;
        }
    }else{
        return 0;
    }
}


const renderSpace = function({row,col,value,board,playerTurn,boardState}){
    const space = document.createElement("div");
    space.style.boxSizing = 'border-box';
    space.style.border = '1px solid black';
    space.style.height = '12.5%';
    space.style.width = '12.5%';
    space.style.padding = '0';
    space.style.backgroundColor = 'green';
    space.style.display = 'inline-block';
    space.style.float = 'left';
    space.dataset.col=col;
    space.dataset.row=row;
    space.dataset.check = false;
    let gameObject;
    if(value==1){
        gameObject = createGameObject('black');
    }else if(value==-1){
        gameObject = createGameObject('white');
    }else{
        let possibleCheckTurn = false;
        const possibleCheck = checkPossiblePlaces(row,col,boardState,playerTurn);
        if(possibleCheck.generalCheck){
            gameObject = createGameObject('white', '0.2');
            possibleCheckTurn = true;
            gameObject.dataset.col=col;
            gameObject.dataset.row=row;
            space.dataset.check =  possibleCheck.generalCheck;
            gameObject.dataset.checkPossible = possibleCheck.generalCheck;
            gameObject.dataset.checkRight = possibleCheck.checkRight;
            gameObject.dataset.checkLeft = possibleCheck.checkLeft;
            gameObject.dataset.checkTop = possibleCheck.checkTop;
            gameObject.dataset.checkBelow = possibleCheck.checkBelow;
            gameObject.dataset.checkTopRight = possibleCheck.checkTopRight;
            gameObject.dataset.checkTopLeft = possibleCheck.checkTopLeft;
            gameObject.dataset.checkBelowRight = possibleCheck.checkBelowRight;
            gameObject.dataset.checkBelowLeft = possibleCheck.checkBelowLeft;
            gameObject.onclick = function(){
                console.log(this.dataset.col);
                console.log(this.dataset.row);
                APP_STATE.boardState = changeStateOnClick(playerTurn,this.dataset.row,this.dataset.col,this.dataset.checkRight,this.dataset.checkLeft,this.dataset.checkTop,this.dataset.checkBelow,this.dataset.checkTopRight,this.dataset.checkTopLeft,this.dataset.checkBelowRight,this.dataset.checkBelowLeft,boardState);
                APP_STATE.playerTurn = -(APP_STATE.playerTurn);
                root.innerHTML ="";
                render(root,APP_STATE);
            }
        }else{
            gameObject = createGameObject('none');
        }
        
     }

    space.appendChild(gameObject);
    board.appendChild(space)
    return space;
}


const changeStateOnClick= function(playerTurn,row,col,checkRight,checkLeft,checkTop,checkBelow,checkTopRight,checkTopLeft,checkBelowRight,checkBelowLeft,boardState){
    
    if(eval(checkRight)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newCol++;
        }
    }
    if(eval(checkLeft)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newCol--;
        }
    }
    if(eval(checkBelow)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newRow++;
        }

    }
    if(eval(checkTop)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newRow--;
        }
    }
    if(eval(checkTopRight)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newCol++;
            newRow--;
        }
    }
    if(eval(checkTopLeft)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newCol--;
            newRow--;
        }
    }
    if(eval(checkBelowLeft)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newCol--;
            newRow++;
        }
    }
    if(eval(checkBelowRight)){
        let newRow = row;
        let newCol = col;
        while(boardState[newRow][newCol]!=playerTurn){
            boardState[newRow][newCol] = playerTurn;
            newCol++;
            newRow++;
        }
    }
    return boardState;
}

const checkPossiblePlaces = function(row,col,boardState,playerTurn){
    let check = {generalCheck:false};
    check.generalCheck = checkRight(row,col,boardState,playerTurn,false);
    check.generalCheck  = checkLeft(row,col,boardState,playerTurn,false) || check.generalCheck ;
    check.generalCheck  = checkTop(row,col,boardState,playerTurn,false) || check.generalCheck ;
    check.generalCheck  = checkBelow(row,col,boardState,playerTurn,false) || check.generalCheck ;
    check.generalCheck  = checkTopRight(row,col,boardState,playerTurn,false) || check.generalCheck ;
    check.generalCheck  = checkTopLeft(row,col,boardState,playerTurn,false) || check.generalCheck ;
    check.generalCheck  = checkBelowLeft(row,col,boardState,playerTurn,false) || check.generalCheck ;
    check.generalCheck  = checkBelowRight(row,col,boardState,playerTurn,false) || check.generalCheck ;
    
    check.checkRight = checkRight(row,col,boardState,playerTurn,false);
    check.checkLeft  = checkLeft(row,col,boardState,playerTurn,false) ;
    check.checkTop  = checkTop(row,col,boardState,playerTurn,false) ;
    check.checkBelow  = checkBelow(row,col,boardState,playerTurn,false) ;
    check.checkTopRight  = checkTopRight(row,col,boardState,playerTurn,false) ;
    check.checkTopLeft  = checkTopLeft(row,col,boardState,playerTurn,false) ;
    check.checkBelowLeft  = checkBelowLeft(row,col,boardState,playerTurn,false) ;
    check.checkBelowRight  = checkBelowRight(row,col,boardState,playerTurn,false) ;

    return check;
}

const checkRight = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col+1;
    newRow =row;
    if(col<7){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkRight(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}

const checkLeft = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col-1;
    newRow =row;
    if(col>0){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkLeft(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}

const checkTop = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col;
    newRow =row-1;
    if(row>0){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkTop(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}

const checkBelow = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col;
    newRow =row+1;
    if(row<7){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkBelow(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}


const checkTopRight = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col+1;
    newRow =row-1;
    if(row>0 && col<7){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkTopRight(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}

const checkBelowRight = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col+1;
    newRow =row+1;
    if(row<7 && col<7){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkBelowRight(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}

const checkTopLeft = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col-1;
    newRow =row-1;
    if(row>0 && col>0){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkTopLeft(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}

const checkBelowLeft = function(row,col,boardState,playerTurn,checkBefore){
    newCol= col-1;
    newRow =row+1;
    if(row<7 && col>0){
        if(boardState[newRow][newCol]==0){
            return false;
        }else if(boardState[newRow][newCol]==playerTurn){
            return false || checkBefore;
        }else if(boardState[newRow][newCol]==(-playerTurn)){
            return checkBelowLeft(newRow,newCol,boardState,playerTurn,true);
        }
    }else{
        return false;
    }
}



const createGameObject = function(color,opacity=1){
    const gameObject = document.createElement("div");
    gameObject.style.boxSizing = 'border-box';
    gameObject.style.width = '100%';
    gameObject.style.height = '100%';
    gameObject.style.borderRadius = '50%';
    gameObject.style.backgroundColor = color;
    gameObject.style.opacity = opacity;
    return gameObject;
}
//Estado
//1 negro, -1 blanco, 0 vacio
const APP_STATE  = {
    playerTurn:1,
    boardState:  
        [
         [0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0],
         [0,0,0,-1,1,0,0,0],
         [0,0,0,1,-1,0,0,0],
         [0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0]
        ]
}
render(root,APP_STATE);
