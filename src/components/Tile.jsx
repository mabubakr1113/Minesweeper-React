import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  background-color: ${props => {
    if (props.isFlagged) return '#ff0000';
    if (!props.isRevealed) return '#cccccc';
    if (props.value === -1) return '#000000';
    return '#ffffff';
  }};
  border: 1px solid #999;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.1s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Tile = ({ value, isRevealed, isFlagged, onClick, onRightClick }) => {
  const handleClick = (event) => {
    onClick();
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onRightClick();
  };

  const getText = () => {
    if (isFlagged) return '🚩';
    if (!isRevealed) return '';
    if (value === -1) return '💣';
    return value > 0 ? value.toString() : '';
  };

  return (
    <TileContainer
      isRevealed={isRevealed}
      isFlagged={isFlagged}
      value={value}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getText()}
    </TileContainer>
  );
};

export default Tile; 