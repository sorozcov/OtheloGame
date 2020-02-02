// Silvio Orozco 18282
// Universidad del Valle de Guatemala 
// Othelo Game

//Obtains root
const root = document.getElementById("root");
root.style.backgroundColor = 'red';
root.style.height = '90vh';

//Create text function
const createText = function createText({innerText,color,fontSize,textAlign='center'}){
    let text =document.createElement("div");
    text.innerText = innerText;
    text.style.color = color;
    text.style.textAlign = textAlign;
    text.style.fontSize = fontSize;
    text.style.paddingTop='1vh'
    return text
}





const render = function(root,state){

    //Turno del jugador
    const { playerTurn } = state;

     //Game Title Div
     const gameTitle = document.createElement("div");
     gameTitle.style.height = '5vh';
     gameTitle.style.backgroundColor = 'black';
     titleText = createText({innerText:"Othelo",color:'white',fontSize:'24px'});
     //Appends
     root.appendChild(gameTitle);
     gameTitle.appendChild(titleText);
  

    //Informacion del juego
    const gameInformation = document.createElement("div");
    gameInformation.style.height = '9vh';
    gameInformation.style.backgroundColor = 'white';
    const gameBoard = document.createElement("div");
    gameBoard.style.height = '85vh';
    gameBoard.style.backgroundColor = 'red';
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
                playerTurn
            })
    
        })
        
    })
     
}




const renderSpace = function({row,col,value,board,playerTurn}){
    const space = document.createElement("div");
    space.style.boxSizing = 'border-box';
    space.style.border = '1px solid black';
    space.style.height = '12.5%';
    space.style.width = '12.5%';
    space.style.padding = '0';
    space.style.backgroundColor = 'green';
    space.style.display = 'inline-block';
    space.style.float = 'left';
    let gameObject;
    if(value==1){
        gameObject = createGameObject('black');
    }else if(value==-1){
        gameObject = createGameObject('white');
    }else{
        gameObject = createGameObject('none');
     }
    space.appendChild(gameObject);
    board.appendChild(space)
    return space;
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
