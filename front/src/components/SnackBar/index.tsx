import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { SyntheticEvent, forwardRef } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning'
  isToastOpen: boolean
  handleClose: (event: SyntheticEvent | Event, reason?: string) => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SimpleSnackbar({
  isToastOpen,
  handleClose,
  type,
  message,
}: ToastProps) {
  return (
    <Snackbar
      open={isToastOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
