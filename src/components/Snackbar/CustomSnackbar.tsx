import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Snackbar, Alert, AlertColor, SnackbarOrigin } from '@mui/material';

interface SnackbarProps {
  snackbarColor?: AlertColor;
  res: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  verticalPosition?: SnackbarOrigin['vertical'];
}

export const CustomSnackbar = ({
  snackbarColor,
  res,
  open,
  setOpen,
  verticalPosition,
}: SnackbarProps) => {
  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: `${verticalPosition ? verticalPosition : 'bottom'}`,
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarColor}
          sx={{ width: '100%' }}
        >
          {res}
        </Alert>
      </Snackbar>
    </>
  );
};
