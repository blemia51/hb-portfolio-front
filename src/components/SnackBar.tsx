import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps } from '@mui/material';

interface Props {
  message: string
  setState: React.ElementType | any
  state: { open: boolean }
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
  severity: AlertProps['severity']
}

const AutohideSnackbar: React.FC<Props> = ({
  message, 
  setState, 
  state, 
  vertical, 
  horizontal, 
  severity
}) => {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({...state, open: false})
  };
 
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
    			variant="filled"
    			sx={{ width: '100%' }}
  			>
					{message}
  			</Alert>
      </Snackbar>
    </div>
  );
}
export default AutohideSnackbar;