import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AuthCard = ({ title, children, actions }) => (
  <Paper
    elevation={3}
    sx={{
      p: { xs: 2, sm: 4 },
      maxWidth: { xs: 320, sm: 350 },
      width: '100%',
      mx: 'auto',
      backgroundColor: 'white',
      border: '1.5px solid black',
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      boxSizing: 'border-box',
    }}
  >
    <Typography variant="h5" sx={{ color: 'black', fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: 20, sm: 24 } }}>
      {title}
    </Typography>
    <Box sx={{ width: '100%' }}>{children}</Box>
    {actions && <Box sx={{ mt: 2, width: '100%' }}>{actions}</Box>}
  </Paper>
);

export default AuthCard; 