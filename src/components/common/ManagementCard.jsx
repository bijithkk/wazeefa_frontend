import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const ManagementCard = ({ title, description, icon, buttonText, onButtonClick, to }) => (
  <Card
    sx={{
      p: 2,
      width: { xs: '100%', sm: 320 },
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1.5px solid black',
      borderRadius: 3,
      boxShadow: 2,
      boxSizing: 'border-box',
      m: 1,
    }}
  >
    <CardContent sx={{ width: '100%', textAlign: 'center', p: 0 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 48 }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ color: 'black', fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'black', mb: 1 }}>
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'center', width: '100%' }}>
      {to ? (
        <Button
          component={RouterLink}
          to={to}
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
          fullWidth
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          onClick={onButtonClick}
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
          fullWidth
        >
          {buttonText}
        </Button>
      )}
    </CardActions>
  </Card>
);

export default ManagementCard; 