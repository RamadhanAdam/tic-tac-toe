// Setting up vars
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false; // Prevent clicks after game ends

// Selecting all cells
const cells = document.querySelectorAll('.cell');

// Handling clicks on cells
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] === "" && !gameOver) {
            board[index] = currentPlayer; // Update board state
            cell.textContent = currentPlayer; // Display X or O

            let winner = checkWinner(); // Get the winner
            if (winner) {
                gameOver = true; // Stop further moves
                setTimeout(() => {
                    document.getElementById("pre").textContent = winner + " wins!";
                }, 100);
            } else if (!board.includes("")) { // Check for draw
                gameOver = true;
                setTimeout(() => {
                    document.getElementById("pre").textContent = "It's a draw";
                }, 100);
            } else {
                // Switch player only if no winner
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    });
});

// Function to check winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return board[a]; // Return the winning player ("X" or "O")
        }
    }
    return null; // No winner yet
}

// Restart game button
document.getElementById("restart").addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false; // Reset game state
    cells.forEach(cell => cell.textContent = "");
    document.getElementById("pre").textContent = "";
    currentPlayer = "X";
});
