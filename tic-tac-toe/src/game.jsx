import { useState } from "react";
import { motion } from "framer-motion";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  // Winning Combinations
  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !board.includes(null) && !winner;

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <motion.div 
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="title">Tic-Tac-Toe</motion.h1>

      <motion.div className="board">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className={`cell ${winner ? "disabled" : ""}`}
            onClick={() => handleClick(index)}
            whileTap={{ scale: 0.8 }}
            animate={{
              backgroundColor: winner && winner === cell ? "#4CAF50" : "#333",
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {cell ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {cell}
              </motion.span>
            ) : (
              <motion.span className="placeholder">•</motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {winner && (
        <motion.h2 
          className="winner-message"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Winner: {winner} 🎉
        </motion.h2>
      )}

      {isDraw && (
        <motion.h2 
          className="draw-message"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          It's a Draw! 🤝
        </motion.h2>
      )}

      <motion.button 
        className="reset-button"
        onClick={resetGame}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Restart 🔄
      </motion.button>
    </motion.div>
  );
};

export default Game;
