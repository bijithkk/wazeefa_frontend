import React, { useState, useEffect } from 'react';
import BWInput from '../common/Input';
import BWButton from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginStaff } from '../../features/auth/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const StaffForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/staffhome', { state: { justLoggedIn: true } });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    dispatch(loginStaff({ email: form.email, password: form.password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <BWInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      <BWInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <BWButton fullWidth type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </BWButton>
    </form>
  );
};

export default StaffForm; 