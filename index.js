const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("p");
const newGameBtn = document.querySelector("button");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets initialise the game
initGame();
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    // Empty the UI
    boxes.forEach(box =>{
        box.textContent = "";
        box.classList.remove("win");
    });
}

function CheckGameOver() {
    let answer = "";

    winningPositions.forEach(position => {
        // all 3 boxes should be non empty and same
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" &&
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // see who is the winner
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        // if we have a winner 
        if(answer != "") {
            gameInfo.textContent = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }
    });

    // check if the game is tied
    let fillCount = 0;
    gameGrid.forEach(box => {
        if(box !== "") {
            fillCount++;
        }
    });

    if(fillCount === 9) {
        gameInfo.textContent = "Game Tied!"
        newGameBtn.classList.add("active");
    }


}

function changePlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    // UI update
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].textContent = currentPlayer;
        gameGrid[index] = currentPlayer;
        // now swap the player
        changePlayer();
        // check if someone won
        CheckGameOver(); 
    }
}

boxes.forEach((box,index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener('click', initGame);