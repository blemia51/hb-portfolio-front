import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, IconButton, Dialog, DialogTitle, SnackbarOrigin } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import AboutForm from './AboutForm';
import { AboutOnly, useGetAboutQuery, useUpdateAboutMutation } from '../api/aboutApi';
import AutohideSnackbar from './SnackBar';

interface AboutProps {
  isLoggedIn: boolean;
}

interface State extends SnackbarOrigin {
	open: boolean
}
const modalStyle = {
  width: '600px',
  maxWidth: '90vw',
  height: '300px',
  maxHeight: '80vh',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const About: React.FC<AboutProps> = ({ isLoggedIn }) => {
  const { t } = useTranslation();
  const { data: about, error, isLoading } = useGetAboutQuery();  // Fetch data from API
  const [updateAbout, response] = useUpdateAboutMutation();
  const [open, setOpen] = useState(false);
  const [aboutText, setAboutText] = useState<AboutOnly | undefined>();
  const [state, setState] = React.useState<State>({
		open: false,
		vertical: 'bottom',
		horizontal: 'center',
	});


  // Update aboutText when the API data is available
  useEffect(() => {
      setAboutText(about); // If it's a single object, wrap it in an array
  }, [about]);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('aboutData', aboutText)
  console.log('response', response)
  
  const handleUpdate = (newText: string) => {
    if (aboutText) {
      updateAbout({ id: aboutText.id, updatedText: newText }) // Ensure both id and updatedText are passed
        .unwrap()
        .then(() => {
          console.log("Successfully updated about text");
        })
        .catch((error) => {
          console.error("Error updating about text:", error);
        });
      setOpen(false);
      setState((newState) => ({
        ...newState, 
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
      }))
    }
  };
  

  if (isLoading) {
    return <Typography color="white">{t('loading')}...</Typography>;
  }

  if (error) {
    return <Typography color="white">{t('error')}...</Typography>;
  }

  return (
    <Box
      sx={{
        backgroundColor: '#3c4043',
        padding: 4,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
      }}
    >
      <AutohideSnackbar
        message={
          response.isSuccess
          ? 'About updated successfully' 
          : 'About updated faled'
        }
        severity={response.isSuccess ? 'success' : 'error'}
        state={state} 
				setState={setState}
				vertical={state.vertical}
				horizontal={state.horizontal}
      />
      {/* Title in the Top-Left Corner */}
      <Typography
        variant="h4"
        color="white"
        sx={{
          position: 'absolute',
          top: 8,
          left: 16,
        }}
      >
        {t('about')}
      </Typography>

      {/* Edit button visible only for admin */}
      {isLoggedIn && (
        <IconButton
          onClick={handleEdit}
          sx={{
            position: 'absolute',
            top: 8,
            right: 16,
            color: 'white',
            backgroundColor: '#282c34',
          }}
        >
          <EditIcon />
        </IconButton>
      )}

      <Divider
        sx={{
          marginTop: '30px',
          width: '103%',
          backgroundColor: 'white',
          alignSelf: 'center',
        }}
      />

      {/* About Text */}
      <Box sx={{ mt: 4, color: 'white', textAlign: 'left' }}>
      {about &&
          <Typography variant="body1">
            {about.about}
          </Typography>
      }
      </Box>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: modalStyle }}>
        <DialogTitle>{t('Edit About')}</DialogTitle>
        <Divider variant="middle" />
        <AboutForm
          about={aboutText}  // Pass the current about text
          onCancel={handleClose} // Cancel handler
          onUpdate={handleUpdate} // Update handler
        />
      </Dialog>
    </Box>
  );
};

export default About;
