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
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CommonFormDialog from '../../components/common/CommonFormDialog';
import DeleteStaffDialog from '../../components/common/DeleteStaffDialog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStaff, addStaff, updateStaff, deleteStaff, updateStaffPermissions } from '../../features/staff/staffSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ALL_PERMISSIONS = ['view', 'edit', 'create', 'delete'];

const staffFields = [
  { label: 'Username', name: 'username', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'passwordConfirm', type: 'password' },
];

const staffEditFields = [
  { label: 'Username', name: 'username', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
];

const StaffPage = () => {
  const dispatch = useDispatch();
  const { staffList, loading, error } = useSelector((state) => state.staff);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', passwordConfirm: '' });
  const [editStaffId, setEditStaffId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [editPermissions, setEditPermissions] = useState({ view: false, edit: false, create: false, delete: false });

  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  const handleAddPermissionClick = (event, staffId) => {
    setAnchorEl(event.currentTarget);
    setSelectedStaffId(staffId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedStaffId(null);
  };

  // Helper to convert backend permissions object to array
  const getPermissionArray = (permissionsObj) =>
    permissionsObj ? Object.entries(permissionsObj).filter(([_, v]) => v).map(([k]) => k) : [];

  const handleAddPermission = async (permission) => {
    const staff = staffList.find((s) => s._id === selectedStaffId);
    if (!staff) return handleCloseMenu();
    const permissions = { ...staff.permissions, [permission]: true };
    try {
      const res = await dispatch(updateStaffPermissions({ id: staff._id, permissions })).unwrap();
      toast.success(res.message || 'Permission added!');
      dispatch(fetchAllStaff());
    } catch (err) {
      toast.error(err || 'Failed to add permission');
    }
    handleCloseMenu();
  };

  const handleDeletePermission = async (staffId, permission) => {
    const staff = staffList.find((s) => s._id === staffId);
    if (!staff) return;
    const permissions = { ...staff.permissions, [permission]: false };
    try {
      const res = await dispatch(updateStaffPermissions({ id: staff._id, permissions })).unwrap();
      toast.success(res.message || 'Permission removed!');
      dispatch(fetchAllStaff());
    } catch (err) {
      toast.error(err || 'Failed to remove permission');
    }
  };

  const handleOpenAddDialog = () => {
    setForm({ username: '', email: '', password: '', passwordConfirm: '' });
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleOpenEditDialog = (staff) => {
    setForm({
      username: staff.username || '',
      email: staff.email || '',
      password: '',
      passwordConfirm: '',
    });
    setEditPermissions({ ...ALL_PERMISSIONS.reduce((acc, perm) => ({ ...acc, [perm]: false }), {}), ...staff.permissions });
    setEditStaffId(staff._id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditStaffId(null);
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.passwordConfirm) return;
    if (form.password !== form.passwordConfirm) return;
    try {
      await dispatch(addStaff({
        username: form.username,
        email: form.email,
        password: form.password,
      })).unwrap();
      setAddDialogOpen(false);
      toast.success('Staff added successfully!');
      dispatch(fetchAllStaff());
    } catch (err) {
      toast.error(err || 'Failed to add staff');
    }
  };

  const handleEditPermissionsChange = (e) => {
    setEditPermissions((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleEditStaff = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email) return;
    if (form.password && form.password !== form.passwordConfirm) return;
    try {
      const updateData = {
        username: form.username,
        email: form.email,
      };
      if (form.password) updateData.password = form.password;
      // Update staff info
      await dispatch(updateStaff({ id: editStaffId, updateData })).unwrap();
      // Update permissions
      await dispatch(updateStaffPermissions({ id: editStaffId, permissions: editPermissions })).unwrap();
      setEditDialogOpen(false);
      setEditStaffId(null);
      toast.success('Staff updated successfully!');
      dispatch(fetchAllStaff());
    } catch (err) {
      toast.error(err || 'Failed to update staff');
    }
  };

  // Delete staff logic
  const handleOpenDeleteDialog = (staff) => {
    setStaffToDelete(staff);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setStaffToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!staffToDelete) return;
    try {
      const res = await dispatch(deleteStaff(staffToDelete._id)).unwrap();
      setDeleteDialogOpen(false);
      setStaffToDelete(null);
      toast.success(res.message || 'Staff deleted successfully!');
      dispatch(fetchAllStaff());
    } catch (err) {
      toast.error(err || 'Failed to delete staff');
      setDeleteDialogOpen(false);
      setStaffToDelete(null);
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
          Staff Management
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
          Add Staff
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table sx={{ minWidth: 320 }} aria-label="staff table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'black' }}>Permissions</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: 'black' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffList.map((staff) => {
                const permissionsArr = getPermissionArray(staff.permissions);
                return (
                  <TableRow key={staff._id}>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {permissionsArr.length > 0
                          ? permissionsArr.map((perm) => (
                              <Chip
                                key={perm}
                                label={perm}
                                color="primary"
                                size="small"
                                sx={{ textTransform: 'capitalize', bgcolor: '#222', color: 'white' }}
                              />
                            ))
                          : <Typography variant="body2" color="text.secondary">No permissions</Typography>}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small">
                        <EditIcon onClick={() => handleOpenEditDialog(staff)} />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => handleOpenDeleteDialog(staff)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {selectedStaffId && staffList.length > 0 &&
          (() => {
            const staff = staffList.find((s) => s._id === selectedStaffId);
            const permissionsArr = staff ? getPermissionArray(staff.permissions) : [];
            return ALL_PERMISSIONS.filter(
              (perm) => !permissionsArr.includes(perm)
            ).map((perm) => (
              <MenuItem key={perm} onClick={() => handleAddPermission(perm)}>
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </MenuItem>
            ));
          })()}
      </Menu>
      <CommonFormDialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddStaff}
        form={form}
        onFormChange={handleFormChange}
        fields={staffFields}
        title="Add Staff"
        submitLabel={loading ? <CircularProgress size={20} /> : 'Submit'}
        cancelLabel="Cancel"
      />
      <CommonFormDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        onSubmit={handleEditStaff}
        form={form}
        onFormChange={handleFormChange}
        fields={staffEditFields}
        title="Edit Staff"
        submitLabel={loading ? <CircularProgress size={20} /> : 'Update'}
        cancelLabel="Cancel"
      >
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Permissions</Typography>
          <FormGroup row>
            {ALL_PERMISSIONS.map((perm) => (
              <FormControlLabel
                key={perm}
                control={
                  <Checkbox
                    checked={!!editPermissions[perm]}
                    onChange={handleEditPermissionsChange}
                    name={perm}
                    color="primary"
                  />
                }
                label={perm.charAt(0).toUpperCase() + perm.slice(1)}
              />
            ))}
          </FormGroup>
        </Box>
      </CommonFormDialog>
      <DeleteStaffDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDelete={handleConfirmDelete}
        staffName={staffToDelete?.username}
        loading={loading}
      />
    </Box>
  );
};

export default StaffPage; 