import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Dialog, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import AboutForm from './AboutForm';
import { useGetAboutQuery } from '../api/aboutApi';


interface AboutProps {
  isAdmin: boolean;
};

interface About {
  about?: {
    id: number;
    about: string;
  };
}


const modalStyle = {
  width: '600px',     // Set the width
  maxWidth: '90vw',   // Responsive width for smaller screens
  height: '400px',    // Set the height
  maxHeight: '80vh',  // Allow responsive height for smaller screens
  padding: '20px',    // Padding inside the modal
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',  // Center content vertically
  alignItems: 'center',      // Center content horizontally
};


const About: React.FC<AboutProps> = ({ isAdmin }) => {
  const { t } = useTranslation();
  const { data: toto, error, isLoading } = useGetAboutQuery();

  const [open, setOpen] = useState(false);
  const [aboutText, setAboutText] = useState(toto);


  console.log('Edit About Section' , toto);

  const handleEdit = () => {
    setOpen(true)
    console.log('Edit About Section');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    // Logic to update the "About" section
    console.log("Updated About text:", aboutText);
    setOpen(false)
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
        borderRadius: 4
      }}
    >
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
      {isAdmin && (
        <IconButton
          onClick={handleEdit}
          sx={{
            position: 'absolute',
            top: 8,
            right: 16,
            color: 'white',
            backgroundColor: '#282c34'
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
      <Box sx={{ mt: 4, color: 'white', textAlign: 'left' }}>
        <Typography variant="body1">
        {/* {Object.values(about as About).map((item) => item.about)} */}
        </Typography>
      </Box>
       {/* Edit Modal */}
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Edit About')}</DialogTitle>
        <Divider variant='middle' />
        <AboutForm
          // about={about} // Pass the initial about text
          onCancel={handleClose} // Cancel handler
          onUpdate={handleUpdate} // Update handler
        />
      </Dialog>
    </Box>
  );
};

export default About;
