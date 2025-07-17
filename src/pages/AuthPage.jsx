import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AuthCard from '../components/common/AuthCard';
import SuperAdminForm from '../components/auth/SuperAdminForm';
import StaffForm from '../components/auth/StaffForm';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [superAdminMode, setSuperAdminMode] = useState('login');
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && token) {
      if (user.role === 'superadmin') {
        navigate('/dashboard', { replace: true });
      } else if (user.role === 'staff') {
        // Only show toast and navigate if coming from login (not on browser back)
        if (location.state && location.state.justLoggedIn) {
          toast.success('Login successful!');
        }
        navigate('/staffhome', { replace: true });
      }
    }
  }, [user, token, navigate, location.state]);

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
        overflow: 'auto',
      }}
    >
      <Box sx={{ mb: 2, maxWidth: 400, width: '100%', overflow: 'visible' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { background: 'black' } }}
          sx={{
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            '& .MuiTab-root': {
              color: 'black',
              fontWeight: 600,
              fontSize: { xs: 16, sm: 18 },
              textTransform: 'none',
              minWidth: 100,
            },
            '& .Mui-selected': {
              color: 'black',
            },
          }}
        >
          <Tab label="Super Admin" />
          <Tab label="Staff" />
        </Tabs>
      </Box>
      <Box sx={{ maxWidth: { xs: 340, sm: 370 }, width: '100%', overflow: 'visible' }}>
        {tab === 0 ? (
          <AuthCard
            title="Super Admin"
            actions={null}
          >
            <SuperAdminForm mode={superAdminMode} onModeChange={setSuperAdminMode} />
          </AuthCard>
        ) : (
          <AuthCard title="Staff" actions={null}>
            <StaffForm />
          </AuthCard>
        )}
      </Box>
    </Box>
  );
};

export default AuthPage; 