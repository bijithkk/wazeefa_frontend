import React from 'react';
import Box from '@mui/material/Box';
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';

const App = () => (
  <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
    <Header />
    <AppRoutes />
  </Box>
);

export default App;
