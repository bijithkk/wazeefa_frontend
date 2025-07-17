import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllStudents = createAsyncThunk(
  'students/fetchAllStudents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.get(
        'https://wazeefa-backend.onrender.com/superadmin/student/',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res.data.data.students;
    } catch (err) {
      console.log('error:-',err)
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.post(
        'https://wazeefa-backend.onrender.com/superadmin/student/',
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
  'students/updateStudent',
  async ({ id, updateData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch(
        `https://wazeefa-backend.onrender.com/superadmin/student/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.delete(
        `https://wazeefa-backend.onrender.com/superadmin/student/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete student');
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    studentList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
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

export default studentSlice.reducer; 