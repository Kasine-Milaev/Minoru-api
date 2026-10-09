import { Box, Typography } from '@mui/material';

export default function Logo({ size = 34 }) {
  return (
    <Box display="flex" alignItems="baseline" sx={{ userSelect: 'none' }}>
      <Typography
        component="span"
        sx={{
          fontFamily: '"Dela Gothic One", sans-serif',
          fontSize: size * 1.7,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #e63946, #efdcc3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(230,57,70,.55))',
        }}
      >
        M
      </Typography>
      <Typography
        component="span"
        sx={{ fontFamily: '"Dela Gothic One", sans-serif', fontSize: size, letterSpacing: 1 }}
      >
        inoru
      </Typography>
    </Box>
  );
}