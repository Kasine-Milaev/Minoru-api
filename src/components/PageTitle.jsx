import { Box, Stack, Typography } from '@mui/material';

export default function PageTitle({ icon, children, variant = 'h4', mb = 3 }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} mb={mb}>
      <Box
        sx={{
          width: 44,
          height: 44,
          minWidth: 44,
          flexShrink: 0,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#efdcc3',
          background: 'linear-gradient(135deg, #e63946, #8c2f39)',
          boxShadow: '0 4px 14px rgba(230,57,70,.45)',
        }}
      >
        {icon}
      </Box>
      <Typography variant={variant} sx={{ minWidth: 0 }}>
        {children}
      </Typography>
    </Stack>
  );
}