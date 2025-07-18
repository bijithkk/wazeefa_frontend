import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CommonFormDialog from '../../components/common/CommonFormDialog';
import DeleteDialog from '../../components/common/DeleteStaffDialog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudents, addStudent, updateStudent, deleteStudent } from '../../features/superadmin/studentSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';

const studentFields = [
  { label: 'Name', name: 'name', required: true },
  { label: 'Age', name: 'age', type: 'number', required: true },
  { label: 'Grade', name: 'grade', required: true },
  { label: 'Contact Number', name: 'contactInfo', required: true },
];

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { studentList, loading, error } = useSelector((state) => state.students);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', grade: '', contactInfo: '' });
  const [editStudentId, setEditStudentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentFormError, setStudentFormError] = useState('');

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  const handleOpenAddDialog = () => {
    setForm({ name: '', age: '', grade: '', contactInfo: '' });
    setStudentFormError('');
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setStudentFormError('');
  };

  const handleOpenEditDialog = (student) => {
    setForm({
      name: student.name || '',
      age: student.age || '',
      grade: student.grade || '',
      contactInfo: student.contactInfo || '',
    });
    setEditStudentId(student._id || student.id);
    setStudentFormError('');
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditStudentId(null);
    setStudentFormError('');
  };

  const handleOpenDeleteDialog = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStudentFormError('');
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    // Validation
    if (!form.name || !form.age || !form.grade || !form.contactInfo) {
      setStudentFormError('All fields are required');
      return;
    }
    if (/^\d+$/.test(form.name)) {
      setStudentFormError('Please enter a valid name');
      return;
    }
    if (!/^\d{10}$/.test(form.contactInfo)) {
      setStudentFormError('Please enter a valid phone number');
      return;
    }
    setStudentFormError('');
    try {
      await dispatch(addStudent(form)).unwrap();
      setAddDialogOpen(false);
      toast.success('Student added successfully!');
      dispatch(fetchAllStudents());
    } catch (err) {
      toast.error(err || 'Failed to add student');
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    // Validation
    if (!form.name || !form.age || !form.grade || !form.contactInfo) {
      setStudentFormError('All fields are required');
      return;
    }
    if (/^\d+$/.test(form.name)) {
      setStudentFormError('Please enter a valid name');
      return;
    }
    if (!/^\d{10}$/.test(form.contactInfo)) {
      setStudentFormError('Please enter a valid phone number');
      return;
    }
    setStudentFormError('');
    try {
      await dispatch(updateStudent({ id: editStudentId, updateData: form })).unwrap();
      setEditDialogOpen(false);
      setEditStudentId(null);
      toast.success('Student updated successfully!');
      dispatch(fetchAllStudents());
    } catch (err) {
      toast.error(err || 'Failed to update student');
    }
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await dispatch(deleteStudent(studentToDelete._id || studentToDelete.id)).unwrap();
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
      toast.success('Student deleted successfully!');
      dispatch(fetchAllStudents());
    } catch (err) {
      toast.error(err || 'Failed to delete student');
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 1100, mx: 'auto', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'black' }}>
          Student Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'black',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            '&:hover': { background: '#222' },
          }}
          onClick={handleOpenAddDialog}
        >
          Add Student
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table sx={{ minWidth: 320 }} aria-label="students table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Grade</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Contact</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: 'black' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList && studentList.length > 0 ? studentList.map((student) => (
                <TableRow key={student._id || student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.contactInfo}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" size="small" onClick={() => handleOpenEditDialog(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleOpenDeleteDialog(student)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No students found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CommonFormDialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddStudent}
        form={form}
        onFormChange={handleFormChange}
        fields={studentFields}
        title="Add Student"
        submitLabel={loading ? <CircularProgress size={20} /> : 'Submit'}
        cancelLabel="Cancel"
        error={studentFormError}
      />
      <CommonFormDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        onSubmit={handleEditStudent}
        form={form}
        onFormChange={handleFormChange}
        fields={studentFields}
        title="Edit Student"
        submitLabel={loading ? <CircularProgress size={20} /> : 'Update'}
        cancelLabel="Cancel"
        error={studentFormError}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDelete={handleConfirmDelete}
        entityName={studentToDelete?.name}
        loading={loading}
      />
    </Box>
  );
};

export default StudentsPage; 