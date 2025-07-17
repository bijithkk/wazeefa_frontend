import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import BWInput from '../common/Input';
import BWButton from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signupSuperadmin, loginSuperadmin } from '../../features/auth/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuperAdminForm = ({ mode, onModeChange }) => {
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', username: '' });
  const dispatch = useDispatch();
  const { loading, error, user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'login' && token) {
      toast.success('Login successful!');
      navigate('/dashboard');
    }
  }, [token, navigate, mode]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (!form.username || !form.email || !form.password || !form.passwordConfirm) return;
      if (form.password !== form.passwordConfirm) return;
      dispatch(signupSuperadmin({ username: form.username, email: form.email, password: form.password }))
        .unwrap()
        .then(() => {
          toast.success('SignUp successful!');
          setForm((prev) => ({ email: prev.email, password: '', passwordConfirm: '', username: '' }));
          onModeChange('login');
        })
        .catch(() => {});
    } else {
      if (!form.email || !form.password) return;
      dispatch(loginSuperadmin({ email: form.email, password: form.password }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mode === 'signup' && (
        <BWInput label="Username" name="username" value={form.username} onChange={handleChange} required />
      )}
      <BWInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      <BWInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      {mode === 'signup' && (
        <BWInput label="Confirm Password" name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={handleChange} required />
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <BWButton fullWidth type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : mode === 'login' ? 'Login' : 'Sign Up'}
      </BWButton>
      <Box sx={{ mt: 1, textAlign: 'center' }}>
        {mode === 'login' ? (
          <span style={{ color: 'black' }}>
            New here?{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onModeChange('signup')}>
              Sign Up
            </span>
          </span>
        ) : (
          <span style={{ color: 'black' }}>
            Already have an account?{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onModeChange('login')}>
              Login
            </span>
          </span>
        )}
      </Box>
    </form>
  );
};

export default SuperAdminForm; 