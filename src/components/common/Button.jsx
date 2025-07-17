import React from 'react';
import Button from '@mui/material/Button';

const BWButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    sx={{
      color: 'black',
      borderColor: 'black',
      backgroundColor: 'white',
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 2,
      '&:hover': {
        backgroundColor: '#f5f5f5',
        borderColor: 'black',
      },
    }}
    {...props}
  >
    {children}
  </Button>
);

export default BWButton; 