import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import BWInput from './Input';
import BWButton from './Button';
import Alert from '@mui/material/Alert';

const CommonFormDialog = ({
  open,
  onClose,
  onSubmit,
  form,
  onFormChange,
  fields,
  title,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  error,
  ...props
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <form onSubmit={onSubmit}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
        {fields.map((field) => (
          <BWInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            value={form[field.name] || ''}
            onChange={onFormChange}
            required={field.required}
          />
        ))}
        {props.children}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <BWButton onClick={onClose} type="button">{cancelLabel}</BWButton>
        <BWButton type="submit">{submitLabel}</BWButton>
      </DialogActions>
    </form>
  </Dialog>
);

export default CommonFormDialog; 