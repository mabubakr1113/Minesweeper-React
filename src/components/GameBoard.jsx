import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cell from './Cell';
import GameOverAnimation from './GameOverAnimation';
import KeyboardInstructions from './KeyboardInstructions';
import {
  GameInfo,
  Counter,
  Board,
  ButtonGroup,
  GameMessage,
  GameContainer,
  BoardContainer
} from '../styles/GameBoard.styles';

const GameBoard = () => {
  const [board, setBoard] = useState([]);
  const [flaggedCount, setFlaggedCount] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [focusedCell, setFocusedCell] = useState({ x: 0, y: 0 });
  const [lastClickedCell, setLastClickedCell] = useState(null);
  const [mineCount, setMineCount] = useState(15);
  const boardRef = useRef(null);

  const initializeBoard = useCallback(() => {
    const newBoard = [];
    for (let i = 0; i < 10; i++) {
      newBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        newBoard[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
          x: i,
          y: j
        };
      }
    }
    setBoard(newBoard);
    setFlaggedCount(0);
    setRevealedCount(0);
    setGameOver(false);
    setGameStarted(false);
    setTimeElapsed(0);
    setFocusedCell({ x: 0, y: 0 });
    setLastClickedCell(null);
    
    if (difficulty === 'easy') {
      setMineCount(10);
    } else if (difficulty === 'medium') {
      setMineCount(15);
    } else {
      setMineCount(20);
    }
  }, [difficulty]);

  useEffect(() => {
    initializeBoard();
  }, [difficulty, initializeBoard]);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.focus();
    }
  }, []);

  const revealAllMines = useCallback(() => {
    const newBoard = [...board];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (newBoard[i][j].isMine) {
          newBoard[i][j].isRevealed = true;
        }
      }
    }
    setBoard(newBoard);
  }, [board]);

  const placeMines = useCallback((safeX, safeY) => {
    const newBoard = [...board];
    let minesPlaced = 0;
    
    while (minesPlaced < mineCount) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      
      if ((Math.abs(x - safeX) <= 1 && Math.abs(y - safeY) <= 1) || newBoard[x][y].isMine) {
        continue;
      }
      
      newBoard[x][y].isMine = true;
      minesPlaced++;
    }
    
    setBoard(newBoard);
  }, [board, mineCount]);

  const calculateAdjacentMines = useCallback(() => {
    const newBoard = [...board];
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (newBoard[i][j].isMine) continue;
        
        let count = 0;
        
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            
            const nx = i + dx;
            const ny = j + dy;
            
            if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
              if (newBoard[nx][ny].isMine) {
                count++;
              }
            }
          }
        }
        
        newBoard[i][j].adjacentMines = count;
      }
    }
    
    setBoard(newBoard);
  }, [board]);

  const revealCell = useCallback((x, y) => {
    if (gameOver) return;
    
    const newBoard = [...board];
    const cell = newBoard[x][y];
    
    if (cell.isRevealed || cell.isFlagged) return;
    
    cell.isRevealed = true;
    setRevealedCount(prev => prev + 1);
    
    if (cell.isMine) {
      setGameOver(true);
      revealAllMines();
      return;
    }
    
    if (cell.adjacentMines === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          
          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            revealCell(nx, ny);
          }
        }
      }
    }
    
    setBoard(newBoard);
    
    if (revealedCount + 1 === (10 * 10) - mineCount) {
      setGameOver(true);
    }
  }, [board, gameOver, mineCount, revealedCount, revealAllMines]);

  const toggleFlag = useCallback((x, y) => {
    if (gameOver) return;
    
    const newBoard = [...board];
    const cell = newBoard[x][y];
    
    if (!cell.isRevealed) {
      if (!cell.isFlagged && flaggedCount >= mineCount) {
        return; // Don't allow more flags than mines
      }
      cell.isFlagged = !cell.isFlagged;
      setFlaggedCount(prev => cell.isFlagged ? prev + 1 : prev - 1);
      setBoard(newBoard);
    }
  }, [board, gameOver, flaggedCount, mineCount]);

  const handleKeyDown = useCallback((event) => {
    if (gameOver && event.key !== 'n' && event.key !== 'N' && event.key !== 'd' && event.key !== 'D') return;
    
    const { key } = event;
    const { x, y } = focusedCell;
    
    switch (key) {
      case 'ArrowUp':
        event.preventDefault();
        setFocusedCell(prev => ({
          x: Math.max(0, prev.x - 1),
          y: prev.y
        }));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedCell(prev => ({
          x: Math.min(9, prev.x + 1),
          y: prev.y
        }));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedCell(prev => ({
          x: prev.x,
          y: Math.max(0, prev.y - 1)
        }));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setFocusedCell(prev => ({
          x: prev.x,
          y: Math.min(9, prev.y + 1)
        }));
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (!board[x][y].isFlagged) {
          if (!gameStarted) {
            setGameStarted(true);
            placeMines(x, y);
            calculateAdjacentMines();
          }
          revealCell(x, y);
        }
        break;
      case 'f':
      case 'F':
        event.preventDefault();
        toggleFlag(x, y);
        break;
      case 'n':
      case 'N':
        event.preventDefault();
        initializeBoard();
        break;
      case 'd':
      case 'D':
        event.preventDefault();
        setDifficulty(prev => {
          if (prev === 'easy') return 'medium';
          if (prev === 'medium') return 'hard';
          return 'easy';
        });
        break;
      default:
        break;
    }
  }, [board, focusedCell, gameOver, gameStarted, placeMines, calculateAdjacentMines, revealCell, toggleFlag, initializeBoard]);

  const handleCellClick = useCallback((x, y) => {
    if (!gameStarted) {
      setGameStarted(true);
      placeMines(x, y);
      calculateAdjacentMines();
    }
    revealCell(x, y);
  }, [gameStarted, placeMines, calculateAdjacentMines, revealCell]);

  const handleCellContextMenu = useCallback((x, y) => {
    toggleFlag(x, y);
  }, [toggleFlag]);

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    initializeBoard();
  }, [initializeBoard]);

  const handleNewGame = useCallback(() => {
    initializeBoard();
  }, [initializeBoard]);

  return (
    <GameContainer>
      <BoardContainer>
        <GameInfo>
          <Counter>
            {mineCount - flaggedCount}
          </Counter>
          <Counter>
            {Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:
            {(timeElapsed % 60).toString().padStart(2, '0')}
          </Counter>
        </GameInfo>
        <Board
          ref={boardRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {board.map((row, x) =>
            row.map((cell, y) => (
              <Cell
                key={`${x}-${y}`}
                cell={cell}
                isFocused={focusedCell.x === x && focusedCell.y === y}
                onClick={() => handleCellClick(x, y)}
                onContextMenu={() => handleCellContextMenu(x, y)}
              />
            ))
          )}
          {gameOver && <GameOverAnimation isWin={revealedCount === (10 * 10) - mineCount} />}
        </Board>
        <ButtonGroup>
          <Button
            variant={difficulty === 'easy' ? 'contained' : 'outlined'}
            onClick={() => handleDifficultyChange('easy')}
          >
            Easy
          </Button>
          <Button
            variant={difficulty === 'medium' ? 'contained' : 'outlined'}
            onClick={() => handleDifficultyChange('medium')}
          >
            Medium
          </Button>
          <Button
            variant={difficulty === 'hard' ? 'contained' : 'outlined'}
            onClick={() => handleDifficultyChange('hard')}
          >
            Hard
          </Button>
          <Button
            variant="outlined"
            onClick={handleNewGame}
          >
            New Game
          </Button>
        </ButtonGroup>
        {gameOver && (
          <GameMessage isWin={revealedCount === (10 * 10) - mineCount}>
            {revealedCount === (10 * 10) - mineCount ? 'You Won!' : 'Game Over!'}
          </GameMessage>
        )}
      </BoardContainer>
      <KeyboardInstructions />
    </GameContainer>
  );
};

export default GameBoard; 