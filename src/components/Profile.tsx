import React, { useState } from 'react';
import { Box, Typography, CircularProgress, IconButton, Dialog, DialogTitle, Divider } from '@mui/material';
import { useGetProfileQuery } from '../api/profileApi';
import ProfileForm from './ProfileForm';
import { Email, GitHub, LinkedIn, Edit } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface ProfileProps {
  isLoggedIn: boolean;
}

interface Profile {
  id?: number;
  name: string;
  jobTitle: string;
  techStack: string[];  // Make sure this is an array of strings
  linkedin: string;
  github: string;
  email: string;
  profilePic?: string;
}
const Profile: React.FC<ProfileProps> = ({ isLoggedIn }) => {
  const { data: profile = [], error, isLoading } = useGetProfileQuery();
  // const [updateProfile] = useUpdateProfileMutation();
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [homeProfileOpen, setProfileFormOpen] = useState(false);

  const handleProfileFormOpen = () => {
    setProfileFormOpen(true)
    setEditMode(true)
  }
  const handleProfileFormClose = () => {
    setProfileFormOpen(false)
    setEditMode(false)
  }
    
  console.log('profile', profile)

  const handleSave = async (updatedProfile: Partial<Profile | undefined>) => {
    // if (profile) {
    //   await updateProfile({ id: profile.id, ...updatedProfile });
    //   setEditMode(false);
    // }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error loading profile data</Typography>;

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      
      {isLoggedIn && (
          <IconButton
            onClick={handleProfileFormOpen}
            sx={{
              position: 'absolute',
              top: -5,
              right: 40,
              color: 'white',
              backgroundColor: '#3c4043',
            }}
          >
            <Edit />
          </IconButton>
        )}
      
      <Box>
        {Array.isArray(profile) && profile.map((item: Profile) => (
          <Box key={item.id}>
            <Typography variant="h5">{item.name}</Typography>
            <Typography variant="h4">{t(`jobTitle.${item.jobTitle}`, item.jobTitle)}</Typography>
            <Typography variant="body1">{item?.techStack?.map((val) => val).join(" | ")}</Typography>
            {/* Social Media Icons (LinkedIn, GitHub, Email) */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4, // Margin top for spacing
                flexWrap: 'wrap', // Allow icons to wrap on smaller screens
              }}
            >
              {/* LinkedIn Icon */}
              <IconButton
                color="primary"
                aria-labelledby="LinkedIn"
                href={item.linkedin}
                target="_blank"
                sx={{ mx: 1 }} // Margin between icons
              >
                <LinkedIn sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>

              {/* GitHub Icon */}
              <IconButton
                color="primary"
                aria-labelledby="GitHub"
                href={item.github}
                sx={{ mx: 1 }}
              >
                <GitHub sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>

              {/* Email Icon */}
              <IconButton
                color="primary"
                aria-labelledby="Email"
                href={`mailto:${item.email}`}
                sx={{ mx: 1 }}
              >
                <Email sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Box>

            <Dialog open={homeProfileOpen} onClose={handleProfileFormClose} >
              <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                paddingBottom: 0,
              }}
              >
                <DialogTitle>{t('Edit Profile')}</DialogTitle>
                <IconButton onClick={handleProfileFormClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider variant='middle' />
              <ProfileForm
                editMode={editMode}
                initialProfile ={profile}
                onUpdate={handleSave}
                onCancel={() => setProfileFormOpen(false)}
              />
            </Dialog>
          </Box>
        ))}
      </Box>
    </Box>
    
  );
};

export default Profile;
