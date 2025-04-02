import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const GameInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const Counter = styled(Paper)(({ theme }) => ({
  background: '#222',
  color: '#f00',
  fontFamily: 'monospace',
  fontSize: '24px',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  minWidth: '45px',
  textAlign: 'center',
  boxShadow: theme.shadows[2],
}));

export const Board = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 48px)',
  gridTemplateRows: 'repeat(10, 48px)',
  gap: '1px',
  backgroundColor: '#bdbdbd',
  border: '3px solid #7b7b7b',
  borderRightColor: '#fff',
  borderBottomColor: '#fff',
  padding: '5px',
  marginBottom: theme.spacing(2),
  outline: 'none',
  position: 'relative',
  boxShadow: theme.shadows[3],
  width: 'fit-content',
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const GameMessage = styled(Typography)(({ theme, isWin }) => ({
  color: isWin ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 'bold',
  fontSize: '2rem',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
}));

export const GameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

export const BoardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})); 