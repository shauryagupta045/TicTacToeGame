let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#restart-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreX = document.querySelector("#score-x");
let scoreO = document.querySelector("#score-o");

let turnO = true; 
let score = { X: 0, O: 0 }; 
let moveCount = 0; 

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const resetgame = (resetScore = true) => {
  turnO = true;
  moveCount = 0;
  enableboxes();
  msgcontainer.classList.add("hide");
  if (resetScore) {
    score = { X: 0, O: 0 };
    updateScore();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    moveCount++;
    checkWinner();
  });
});

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const updateScore = () => {
  scoreX.innerText = `X: ${score.X}`;
  scoreO.innerText = `O: ${score.O}`;
};

const showWinner = (winner) => {
  msg.innerText = `Winner: ${winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
  score[winner] += 1; 
  updateScore();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerHTML;
    let pos2val = boxes[pattern[1]].innerHTML;
    let pos3val = boxes[pattern[2]].innerHTML;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("Winner", pos1val);
        showWinner(pos1val);
        return; 
      }
    }
  }

 
  if (moveCount === 9) {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove("hide");
    disableboxes();
  }
};

newgamebtn.addEventListener("click", () => resetgame(false)); 
resetbtn.addEventListener("click", () => resetgame(true)); 

// for  hideing  homepage content 
let homePage = document.querySelector("#home-page");
let gamePage = document.querySelector("main");


function start() {
  homePage.style.display = "none"; 
  gamePage.style.display = "block"; 
}

document.addEventListener("DOMContentLoaded", () => {
  gamePage.style.display = "none"; 
});