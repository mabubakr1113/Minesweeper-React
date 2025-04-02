import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const InstructionsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  minWidth: '200px',
  maxWidth: '250px',
}));

const Key = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.5, 1),
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  boxShadow: theme.shadows[1],
}));

const KeyboardInstructions = () => {
  return (
    <InstructionsContainer elevation={2}>
      <Typography variant="h6" gutterBottom>
        Keyboard Controls
      </Typography>
      <Typography variant="body2" paragraph>
        <Key>↑</Key> <Key>↓</Key> <Key>←</Key> <Key>→</Key> - Navigate cells
      </Typography>
      <Typography variant="body2" paragraph>
        <Key>Space</Key> or <Key>Enter</Key> - Reveal cell
      </Typography>
      <Typography variant="body2" paragraph>
        <Key>F</Key> - Toggle flag
      </Typography>
      <Typography variant="body2" paragraph>
        <Key>N</Key> - New game
      </Typography>
      <Typography variant="body2">
        <Key>D</Key> - Change difficulty
      </Typography>
    </InstructionsContainer>
  );
};

export default KeyboardInstructions; 