import React from 'react';
import TextField from '@mui/material/TextField';

const BWInput = ({ label, type = 'text', ...props }) => (
  <TextField
    label={label}
    type={type}
    variant="outlined"
    fullWidth
    InputLabelProps={{ style: { color: 'black' } }}
    InputProps={{
      style: {
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 8,
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
      mb: 2,
    }}
    {...props}
  />
);

export default BWInput; 