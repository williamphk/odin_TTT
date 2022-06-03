const game = (function () {
  function gameBoard() {
    return {
      array: Array(9).fill(" "),
      isGameEnd() {
        let isEnd = false;
        if (
          this.array[0] == this.array[1] &&
          this.array[0] == this.array[2] &&
          this.array[0] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[3] == this.array[4] &&
          this.array[3] == this.array[5] &&
          this.array[3] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[6] == this.array[7] &&
          this.array[6] == this.array[8] &&
          this.array[6] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[0] == this.array[3] &&
          this.array[0] == this.array[6] &&
          this.array[0] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[1] == this.array[4] &&
          this.array[1] == this.array[7] &&
          this.array[1] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[2] == this.array[5] &&
          this.array[2] == this.array[8] &&
          this.array[2] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[0] == this.array[4] &&
          this.array[0] == this.array[8] &&
          this.array[0] != " "
        ) {
          isEnd = true;
        }
        if (
          this.array[2] == this.array[4] &&
          this.array[2] == this.array[6] &&
          this.array[2] != " "
        ) {
          isEnd = true;
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
  if (gameBoard.isGameEnd() || tie) {
    const allbtn = document.getElementsByClassName("btn");
    for (let i = 0; i < 9; i++) {
      allbtn[i].setAttribute("disabled", "disabled");
    }
    if (tie) {
      document.getElementById("winner").innerHTML = "Tie";
    } else {
      document.getElementById("winner").innerHTML = winner;
    }
  }
}
