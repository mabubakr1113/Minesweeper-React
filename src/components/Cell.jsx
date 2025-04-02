import React from 'react';
import { CellContainer } from '../styles/Cell.styles';

const Cell = ({ cell, isFocused, onClick, onContextMenu }) => {
  const getCellContent = () => {
    if (cell.isFlagged) {
      return '🚩';
    }
    
    if (!cell.isRevealed) {
      return '';
    }
    
    if (cell.isMine) {
      return '💣';
    }
    
    if (cell.adjacentMines === 0) {
      return '';
    }
    
    const colors = [
      '#0000FF',
      '#008000',
      '#FF0000',
      '#000080',
      '#800000',
      '#008080',
      '#000000',
      '#808080'
    ];
    
    return (
      <span style={{ color: colors[cell.adjacentMines - 1] }}>
        {cell.adjacentMines}
      </span>
    );
  };

  return (
    <CellContainer
      isRevealed={cell.isRevealed}
      isFocused={isFocused}
      onClick={onClick}
      onContextMenu={onContextMenu}
      role="button"
      aria-label={`Cell ${cell.x + 1}, ${cell.y + 1}`}
      tabIndex={isFocused ? 0 : -1}
    >
      {getCellContent()}
    </CellContainer>
  );
};

export default Cell; 