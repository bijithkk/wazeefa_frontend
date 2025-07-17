import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const signupSuperadmin = createAsyncThunk(
  'auth/signupSuperadmin',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://wazeefa-backend.onrender.com/superadmin/auth/signup',
        formData
      );
      return res.data.data.Superadmin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);

export const loginSuperadmin = createAsyncThunk(
  'auth/loginSuperadmin',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://wazeefa-backend.onrender.com/superadmin/auth/login',
        formData
      );
      return {
        user: res.data.data.superadmin,
        token: res.data.data.accessToken,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const loginStaff = createAsyncThunk(
  'auth/loginStaff',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://wazeefa-backend.onrender.com/staff/auth/login',
        formData
      );
      return {
        user: res.data.data.staff,
        token: res.data.data.accessToken,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupSuperadmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupSuperadmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupSuperadmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Superadmin Login
      .addCase(loginSuperadmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSuperadmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginSuperadmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Staff Login
      .addCase(loginStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;