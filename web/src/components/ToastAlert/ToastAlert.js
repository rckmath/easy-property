import React, { forwardRef } from 'react'
import { Alert as MuiAlert, Snackbar } from '@mui/material'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />
})

const ToastAlert = ({ content, openMessage, onClose, type }) => {
  return (
    <Snackbar open={openMessage} autoHideDuration={4500} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {content}
      </Alert>
    </Snackbar>
  )
}

export default ToastAlert
