import { Card, CardHeader, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledJokeCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isCustom' && prop !== 'refreshing'
})<{ isCustom?: boolean; refreshing?: boolean }>(({ isCustom, refreshing }) => ({
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    transition: 'transform 0.2s, border 0.2s, opacity 0.2s',
    border: isCustom ? '2.5px solid #4caf50' : '1.5px solid #e0e0e0',
    boxShadow: isCustom
        ? '0 2px 12px 0 rgba(76,175,80,0.08)'
        : '0 2px 8px 0 rgba(60,60,60,0.04)',
    opacity: refreshing ? 0.7 : 1,
    pointerEvents: refreshing ? 'none' : 'auto',
    '&:hover': {
        border: isCustom ? '2.5px solid #2e7d32' : '1.5px solid #bdbdbd',
        transform: 'scale(1.02)',
    },
}));

export const StyledCardHeader = styled(CardHeader, {
    shouldForwardProp: (prop) => prop !== 'isCustom'
})<{ isCustom?: boolean }>(({ isCustom }) => ({
    width: '100%',
    textAlign: 'center',
    borderRadius: '10px 10px 0 0',
    padding: '12px 16px',
    boxShadow: '0 2px 8px 0 rgba(60,60,60,0.04)',
    background: isCustom ? 'rgba(76, 175, 80, 0.08)' : 'rgba(0,0,0,0.04)',
    borderBottom: isCustom ? '2px solid #4caf50' : '1.5px solid #e0e0e0',
}));

export const StyledHeaderTitle = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isCustom'
})<{ isCustom?: boolean }>(({ isCustom }) => ({
    fontSize: '1.1rem',
    fontWeight: isCustom ? 'bold' : 600,
    color: isCustom ? '#388e3c' : '#333',
    letterSpacing: 0.2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})).withComponent('span');

export const StyledSetup = styled(Typography)({
    fontSize: 18,
    minHeight: 60,
    lineHeight: 1.4,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
}).withComponent('div');

export const StyledPunchline = styled(Typography)({
    fontSize: 14,
    minHeight: 40,
    lineHeight: 1.4,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    color: '#757575',
}).withComponent('div'); 