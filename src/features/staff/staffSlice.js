import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllStaff = createAsyncThunk(
  'staff/fetchAllStaff',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.get(
        'https://wazeefa-backend.onrender.com/superadmin/staff/',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res.data.data.staff;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch staff');
    }
  }
);

export const addStaff = createAsyncThunk(
  'staff/addStaff',
  async (staffData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.post(
        'https://wazeefa-backend.onrender.com/superadmin/staff/',
        staffData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data.staff;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add staff');
    }
  }
);

export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
  async ({ id, updateData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch(
        `https://wazeefa-backend.onrender.com/superadmin/staff/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update staff');
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staff/deleteStaff',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.delete(
        `https://wazeefa-backend.onrender.com/superadmin/staff/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete staff');
    }
  }
);

export const updateStaffPermissions = createAsyncThunk(
  'staff/updateStaffPermissions',
  async ({ id, permissions }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch(
        `https://wazeefa-backend.onrender.com/superadmin/staff/${id}`,
        { permissions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update permissions');
    }
  }
);

// staff
export const addStudent = createAsyncThunk(
  'staff/addStudent',
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.post(
        'https://wazeefa-backend.onrender.com/staff/student/',
        studentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data.student;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'staff/updateStudent',
  async ({ id, updateData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch(
        `https://wazeefa-backend.onrender.com/staff/student/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data.student;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update student');
    }
  }
);

export const fetchStudents = createAsyncThunk(
  'staff/fetchStudents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.get('https://wazeefa-backend.onrender.com/staff/student/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data.students;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'staff/deleteStudent',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.delete(
        `https://wazeefa-backend.onrender.com/staff/student/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete student');
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staffList: [],
    studentList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStaffPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaffPermissions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateStaffPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staffSlice.reducer;