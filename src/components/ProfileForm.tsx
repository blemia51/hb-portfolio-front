import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Container,
  InputLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileFormProps {
  initialProfile: {
    id?: number
    name: string;
    jobTitle: string;
    techStack: string[];
    linkedin: string;
    github: string;
    email: string;
    profilePic?: string; // URL of the profile picture
  }[];
  onUpdate: (data: any) => void; // Callback function to handle update
  onCancel: () => void; // Callback function to handle cancel
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialProfile,
  onUpdate,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialProfile[0]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      techStack: value.split(',').map((item) => item.trim()), // Convert to array
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate(formData); // Call the update function with form data
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
    <Box sx={{
      mt: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}
    >
      <Box component="form" sx={{ mt: 1, width: '100%' }}>
      {/* <Typography variant="h5" gutterBottom>
        {t('Edit Profile')}
      </Typography> */}

      <TextField
        name="name"
        label={t('Name')}
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
        fullWidth
        size='small'
        sx={{ mb: 2 }}
      />

      <TextField
        name="jobTitle"
        label={t('Job Title')}
        variant="outlined"
        value={formData.jobTitle}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
        fullWidth
        size='small'
        sx={{ mb: 2 }}
      />

      <TextField
        name="techStack"
        label={t('Tech Stack (comma separated)')}
        variant="outlined"
        value={formData.techStack.join(', ')} // Join array for display
        onChange={handleTechStackChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
        fullWidth
        size='small'
        sx={{ mb: 2 }}
      />

      <TextField
        name="linkedin"
        label={t('LinkedIn URL')}
        variant="outlined"
        value={formData.linkedin}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
        fullWidth
        size='small'
        sx={{ mb: 2 }}
      />

      <TextField
        name="github"
        label={t('GitHub URL')}
        variant="outlined"
        value={formData.github}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
        fullWidth
        size='small'
        sx={{ mb: 2 }}
      />

      <TextField
        name="email"
        label={t('Email')}
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
        fullWidth
        size='small'
        sx={{ mb: 2 }}
      />

      {/* Profile Picture Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData((prev) => ({ ...prev, profilePic: reader.result as string }));
            };
            reader.readAsDataURL(file);
          }
        }}
        style={{ marginBottom: '16px' }}
      />

      {formData.profilePic && (
        <img
          src={formData.profilePic}
          alt="Profile Preview"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '16px',
          }}
        />
      )}

      <Box mb={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onCancel} color="secondary">
              {t('Cancel')}
            </Button>
        <Button color="primary" type="submit" disabled={loading} sx={{ borderRadius: 20}}>
          {loading ? <CircularProgress size={24} /> : t('Save')}
        </Button>
        {/* <IconButton onClick={onCancel} color="secondary">
          <EditIcon />
        </IconButton> */}
      </Box>
    </Box>
    </Box>
    </Container>
  );
};

export default ProfileForm;
