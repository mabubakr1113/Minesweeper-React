import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const CellContainer = styled(Box)(({ theme, isRevealed, isFocused }) => ({
  width: 48,
  height: 48,
  backgroundColor: isRevealed ? '#e0e0e0' : '#c0c0c0',
  border: '1px solid',
  borderColor: isRevealed ? '#a0a0a0' : '#fff #808080 #808080 #fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '20px',
  cursor: 'pointer',
  userSelect: 'none',
  outline: isFocused ? `2px solid ${theme.palette.primary.main}` : 'none',
  outlineOffset: '-2px',
  position: 'relative',
  transition: 'background-color 0.2s ease',
  
  '&:hover': {
    backgroundColor: isRevealed ? '#d0d0d0' : '#b0b0b0',
  },

  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    zIndex: 1,
  }
})); 