import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManagementCard from '../../components/common/ManagementCard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SuperAdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
        position: 'relative',
      }}
    >
      <Typography variant="h4" sx={{ color: 'black', fontWeight: 700, mb: 4, textAlign: 'center' }}>
        Super Admin Dashboard
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ width: '100%', maxWidth: 800 }}>
        <Grid item xs={12} sm={6}>
          <ManagementCard
            title="Staff"
            description="Manage staff records, add or update staff information."
            icon={<PeopleIcon fontSize="inherit" />}
            buttonText="Manage Staff"
            to="/staff"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ManagementCard
            title="Students"
            description="Manage student records, add or update student information."
            icon={<SchoolIcon fontSize="inherit" />}
            buttonText="Manage Students"
            to="/students"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminHome; 