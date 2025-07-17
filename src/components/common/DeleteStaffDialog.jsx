import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import BWButton from './Button';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteDialog = ({ open, onClose, onDelete, entityName, loading }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>Delete</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete <b>{entityName}</b>?</Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
      <BWButton onClick={onClose} type="button" disabled={loading}>Cancel</BWButton>
      <BWButton onClick={onDelete} color="error" type="button" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Delete'}
      </BWButton>
    </DialogActions>
  </Dialog>
);

export default DeleteDialog; 