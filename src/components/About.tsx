import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, IconButton, Dialog, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import AboutForm from './AboutForm';
import { useGetAboutQuery } from '../api/aboutApi';

interface AboutProps {
  isAdmin: boolean;
}

interface About {
  id: number;
  about: string;
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

const About: React.FC<AboutProps> = ({ isAdmin }) => {
  const { t } = useTranslation();
  const { data: aboutData, error, isLoading } = useGetAboutQuery();  // Fetch data from API
  const [open, setOpen] = useState(false);
  const [aboutText, setAboutText] = useState<Array<About>>([]);


  // Update aboutText when the API data is available
  useEffect(() => {
    if (aboutData && Array.isArray(aboutData)) {
      setAboutText(aboutData); // If the data is already an array
    } else if (aboutData && typeof aboutData === 'object' && 'about' in aboutData) {
      setAboutText([aboutData]); // If it's a single object, wrap it in an array
    }
  }, [aboutData]);
  
  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (newText: string) => {
    // Assuming you want to update the first element in the array (or the only element if there's just one):
    setAboutText((prevAboutText) => {
      if (prevAboutText.length > 0) {
        // Update the first element (or create logic to update specific items if you have multiple)
        return [{ ...prevAboutText[0], about: newText }];
      } else {
        // If the array is empty, create a new entry
        return [{ id: 1, about: newText }];
      }
    });
  
    console.log("Updated About text:", newText);
    setOpen(false);
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
      {isAdmin && (
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
      {aboutText  && aboutText.map((item) => (
          <Typography key={item.id} variant="body1">
            {item?.about}
          </Typography>
        ))}
      </Box>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: modalStyle }}>
        <DialogTitle>{t('Edit About')}</DialogTitle>
        <Divider variant="middle" />
        <AboutForm
          about={aboutText ? aboutText[0]?.about : ''}  // Pass the current about text
          onCancel={handleClose} // Cancel handler
          onUpdate={handleUpdate} // Update handler
        />
      </Dialog>
    </Box>
  );
};

export default About;
