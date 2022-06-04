const game = (function () {
  function gameBoard() {
    return {
      array: Array(9).fill(" "),
      isGameEnd() {
        let isEnd = false;
        for (let i = 0; i < 3; i++) {
          if (
            this.array[i * 3] == this.array[i * 3 + 1] &&
            this.array[i * 3] == this.array[i * 3 + 2] &&
            this.array[i * 3] != " "
          ) {
            isEnd = true;
          }
          if (
            this.array[i] == this.array[i + 3] &&
            this.array[i] == this.array[i + 6] &&
            this.array[i] != " "
          ) {
            isEnd = true;
          }
          if (
            i != 1 &&
            this.array[i] == this.array[4] &&
            this.array[i] == this.array[8 - i] &&
            this.array[i] != " "
          ) {
            isEnd = true;
          }
        }
        return isEnd;
      },
    };
  }

  function displayController(index, label) {
    const btn = document.getElementById(index);
    btn.innerHTML = label;
    btn.removeAttribute("onclick");
  }

  function players() {
    return {
      name: "",
      turn: false,
      setName(name) {
        this.name = name;
      },
      setTurn(turn) {
        this.turn = turn;
      },
    };
  }

  return {
    gameBoard,
    displayController,
    players,
  };
})();

let gameBoard = game.gameBoard();
let player1 = game.players();
let player2 = game.players();
player1.setTurn(true);
player1.setName(prompt("please enter your name"));
player2.setName(prompt("please enter your name"));

function updateArray(index) {
  let winner = "";
  if (player1.turn) {
    gameBoard.array[index] = "O";
    game.displayController(index, "O");
    player1.turn = false;
    player2.turn = true;
    winner = player1.name;
  } else {
    gameBoard.array[index] = "X";
    game.displayController(index, "X");
    player1.turn = true;
    player2.turn = false;
    winner = player2.name;
  }
  let tie = gameBoard.array.filter((x) => x == " ").length == 0;
  let isGameEnd = gameBoard.isGameEnd();
  if (isGameEnd || tie) {
    const allbtn = document.getElementsByClassName("btn");
    for (let i = 0; i < 9; i++) {
      allbtn[i].setAttribute("disabled", "disabled");
    }
    if (isGameEnd) {
      document.getElementById("winner").innerHTML = winner;
    } else {
      document.getElementById("winner").innerHTML = "Tie";
    }
  }
}
