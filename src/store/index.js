import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import staffReducer from '../features/staff/staffSlice';
import studentReducer from '../features/superadmin/studentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    students: studentReducer,
  },
});