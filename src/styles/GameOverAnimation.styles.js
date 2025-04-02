import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';

export const confettiAnimation = keyframes`
  0% { 
    transform: translateY(0) rotate(0deg) translateX(0); 
    opacity: 1; 
  }
  25% { 
    transform: translateY(100px) rotate(180deg) translateX(20px); 
    opacity: 0.8; 
  }
  50% { 
    transform: translateY(200px) rotate(360deg) translateX(-20px); 
    opacity: 0.6; 
  }
  75% { 
    transform: translateY(300px) rotate(540deg) translateX(20px); 
    opacity: 0.4; 
  }
  100% { 
    transform: translateY(400px) rotate(720deg) translateX(0); 
    opacity: 0; 
  }
`;

export const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const fadeOutAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const colorOverlayAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0.3; }
  100% { opacity: 0; }
`;

export const ConfettiPiece = styled(Box)(({ theme, delay, color, rotation }) => ({
  position: 'absolute',
  width: '8px',
  height: '8px',
  backgroundColor: color,
  animation: `${confettiAnimation} 2s ease-out ${delay}s forwards`,
  left: `${Math.random() * 100}%`,
  top: '0',
  borderRadius: '50%',
  transform: `rotate(${rotation}deg)`,
  boxShadow: '0 0 5px rgba(0,0,0,0.2)',
}));

export const ShakeContainer = styled(Box)(({ theme }) => ({
  animation: `${shakeAnimation} 0.5s ease-in-out infinite`,
  transformOrigin: 'center',
}));

export const PulseContainer = styled(Box)(({ theme }) => ({
  animation: `${pulseAnimation} 1s ease-in-out infinite`,
  transformOrigin: 'center',
}));

export const AnimationContainer = styled(Box)(({ theme, isVisible }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: isVisible ? 'none' : `${fadeOutAnimation} 0.5s ease-out forwards`,
  zIndex: 1000,
  pointerEvents: 'none',
}));

export const ColorOverlay = styled(Box)(({ theme, color }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: color,
  animation: `${colorOverlayAnimation} 3s ease-out forwards`,
  pointerEvents: 'none',
  zIndex: 999,
})); 