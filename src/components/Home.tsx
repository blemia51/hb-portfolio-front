import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, Dialog, IconButton, MenuItem, Select, FormControl, Divider } from '@mui/material';
import LoginForm from './LoginForm';
import CloseIcon from '@mui/icons-material/Close';
import profileImage from '../assets/profile.jpg';
import ContactForm from './ContactForm';
import enFlag from '../assets/en-flag.png';
import deFlag from '../assets/de-flag.png';
import frFlag from '../assets/fr-flag.png';
import { useTranslation } from 'react-i18next';
import Profile from './Profile';
import Resume from './Resume';
import { useVerifyTokenMutation } from '../api/profileApi';
// import HomeForm from './HomeForm';

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en'); // Default language
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    jobTitle: '',
    techStack: [],
    linkedin: '',
    github: '',
    email: '',
    profilePic: '',
  });

  const [verifyToken, { isLoading }] = useVerifyTokenMutation();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (token) {
        try {
          // Call the RTK mutation to verify the token
          const result = await verifyToken({ token }).unwrap();

          if (result.isValid) {
            setIsLoggedIn(true); // Token is valid
          } else {
            // Token is invalid or expired, log the user out
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            // navigate('/login');
          }
        } catch (err) {
          // Handle the error, e.g., network issues
          console.error('Error verifying token:', err);
          setIsLoggedIn(false);
          // navigate('/login');
        }
      } else {
        setIsLoggedIn(false);
        // navigate('/login');
      }
    };

    checkToken(); // Call the function when the component mounts
  }, [verifyToken]);

  // Open/Close the modal login
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContactOpen = () => setContactOpen(true);
  const handleContactClose = () => setContactOpen(false);

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  // const handleUpdate = (data: any) => {
  //   setProfileData(data);
    //setEditing(false);
  // };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
  };

  return (
    <Box
      sx={{
        backgroundColor: '#282c34',
        paddingTop: 16,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        // minHeight: '100vh', // Ensures full height
      }}
    >
      {/* Admin Login Button and Contact Button at Top-Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: {xs: 260, sm: 186 } ,
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on smaller screens
        }}
      >
        {/* Language Selector */}
        <FormControl sx={{ minWidth: 100 }}>
          <Select
            labelId="language-select-label"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as string)}
            label={t('language')}
            sx={{
              color: 'lightgray',
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
              '& fieldset': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="en">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={enFlag} alt="English" style={{ width: 24, height: 24, marginRight: 8 }} />
              </Box>
            </MenuItem>
            <MenuItem value="de">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={deFlag} alt="Deutsch" style={{ width: 24, height: 24, marginRight: 8 }} />
              </Box>
            </MenuItem>
            <MenuItem value="fr">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={frFlag} alt="Français" style={{ width: 24, height: 24, marginRight: 8 }} />
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleContactOpen}
          sx={{
            minWidth: 120,
            color: '#ffffff',
            mt: { xs: 1, sm: 0 }, // Add margin top on smaller screens
          }}
        >
          {t('resume')}
        </Button>
        {!isLoggedIn ? (
          <Button
            onClick={handleOpen}
            sx={{
              minWidth: 120,
              color: '#ffffff',
              mt: { xs: 1, sm: 0 }, // Add margin top on smaller screens
              ml: { sm: 2 }, // Add left margin on larger screens
            }}
          >
            {t('login')}
          </Button>
        ) : (
          <Button
          // variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
        )
        }
      </Box>

      {/* Circular Profile Picture */}
      <Avatar
        alt="Profile Picture"
        src={profileImage}
        sx={{
          width: { xs: 150, sm: 200 }, // Responsive width
          height: { xs: 150, sm: 200 },
          mb: 4, // margin bottom
          border: 'lightgrey, 3px, solid',
        }}
      />
      {/* Full Stack Developer Title */}
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#ffffff',
            transform: 'translateX(-100%)', // Initially offscreen
            animation: 'slideIn 1.5s forwards', // Slide in animation
            animationDelay: '0.5s', // Delay before the animation starts
            opacity: 0, // Initially hidden
            '@keyframes slideIn': {
              '0%': {
                transform: 'translateX(-100%)',
                opacity: 0,
              },
              '100%': {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
          }}
        >
          <Profile isLoggedIn={isLoggedIn} />
        </Typography>
        <Resume isLoggedIn={isLoggedIn} />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            paddingBottom: 0,
          }}
        >
          <Typography variant="h6">{t('login')}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider variant='middle' />
        <LoginForm 
          onClose={handleClose} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      </Dialog>

      <Dialog open={contactOpen} onClose={handleContactClose}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            paddingBottom: 0,
          }}
        >
          <Typography variant="h6">{t('send_resume')}</Typography>
          <IconButton onClick={handleContactClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider variant='middle' />
        <ContactForm handleClose={handleContactClose} />
      </Dialog>
    </Box>
  );
};

export default Home;
