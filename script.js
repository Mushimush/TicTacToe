const gameboard = (() => {
    let board = ['', '', '', '', '', '', '' , '' , '' ];
    // Private variables and functions
    const checkWin = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
            [0, 3, 6], [1, 4 ,7], [2, 5, 8], //Columns
            [0, 4, 8], [2, 4, 6] //Diagonals
        ];

        for (let combo of winningCombos) {
            if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]){
                return true;
            }             
        }
        return false;
    }

    const checkTie = () => {
        return board.every(cell => cell !== '');
    }
    
    // Publlic methods
    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        } else {
            return false;
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '' , '' , '' ];
    }

    const isGameOver = () => {
        return checkWin() || checkTie();
    }

    return { getBoard, placeMarker, resetBoard, isGameOver, checkTie, checkWin}

})();


const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (gameboard.placeMarker(cell.dataset.index, currentPlayer)) {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameboard.isGameOver()) {
          if (gameboard.checkWin()) {
            const winner = currentPlayer === 'X' ? 'O' : 'X'; // Get the opposite player symbol
            alert(`${winner} won the game!`);
          } else {
            alert('The game ended in a tie!');
          }
          gameboard.resetBoard();
          cells.forEach(cell => cell.textContent = '');
        }
      }
    });
  });
  
