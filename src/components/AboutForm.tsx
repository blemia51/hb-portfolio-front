import React, { useState } from 'react';
import { Box, TextField, Button, DialogActions, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface AboutFormProps {
  about: string | null;
  onCancel: () => void;
  onUpdate: (updatedAbout: string) => void;
}

const AboutForm: React.FC<AboutFormProps> = ({ about, onCancel, onUpdate }) => {
  const { t } = useTranslation();
  const [aboutText, setAboutText] = useState<any>(about);
  console.log('aboutText', aboutText)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(aboutText);
  };

  return (
    <Container 
      maxWidth="sm"
      sx={{ width: '90vw' }} 
      >
      <Box sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      >
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            size='small'
            label="About"
            margin="normal"
            type="text"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            multiline
            rows={6}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
          <DialogActions>
            <Button onClick={onCancel} color="secondary">
              {t('Cancel')}
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {t('Update')}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutForm;
