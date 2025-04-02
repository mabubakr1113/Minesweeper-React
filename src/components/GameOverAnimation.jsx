import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  ConfettiPiece,
  ShakeContainer,
  PulseContainer,
  AnimationContainer,
  ColorOverlay,
  pulseAnimation
} from '../styles/GameOverAnimation.styles';

const GameOverAnimation = ({ isWin }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const colors = [
    '#FFD700',
    '#FF69B4',
    '#00FF00',
    '#4169E1',
    '#FF4500',
    '#9400D3',
    '#FF1493',
    '#00CED1',
    '#FF8C00',
    '#8A2BE2'
  ];

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    delay: Math.random() * 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
  }));

  if (!isVisible) return null;

  return (
    <>
      <ColorOverlay color={isWin ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 0, 0, 0.3)'} />
      <AnimationContainer isVisible={isVisible}>
        {!isWin && (
          <ShakeContainer>
            <Typography
              variant="h1"
              sx={{
                color: '#ff0000',
                textShadow: '0 0 10px rgba(255,0,0,0.5)',
                animation: `${pulseAnimation} 0.5s ease-in-out infinite`,
                fontSize: '3rem',
              }}
            >
              💥 BOOM! 💥
            </Typography>
          </ShakeContainer>
        )}
        {isWin && (
          <>
            {confettiPieces.map((piece, index) => (
              <ConfettiPiece
                key={index}
                delay={piece.delay}
                color={piece.color}
                rotation={piece.rotation}
              />
            ))}
            <PulseContainer>
              <Typography
                variant="h1"
                sx={{
                  color: '#4CAF50',
                  textShadow: '0 0 10px rgba(76,175,80,0.5)',
                  fontSize: '3rem',
                }}
              >
                🎉 VICTORY! 🎉
              </Typography>
            </PulseContainer>
          </>
        )}
      </AnimationContainer>
    </>
  );
};

export default GameOverAnimation; 