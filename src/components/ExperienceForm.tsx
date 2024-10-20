import React, { useState } from 'react';
import { Box, TextField, Button, DialogActions, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers';


interface Experiences {
  id?: number;
  title: string;
  company: string;
  place: string;
  start_date: string;
  end_date: string | null;
  stack: string[];
  details: string;
}
interface ExperienceFormProps {
  initialExperience: {
    experiences: Experiences[]
    id?: number;
    title: string;
    company: string;
    place: string;
    start_date: string;
    end_date: string | null;
    stack: string[];
    details: string;
  };
  onCancel: () => void;
  // onUpdate: (updatedExperience: {
  //   title: string;
  //   company: string;
  //   duration: string;
  //   stack: string;
  //   details: string;
  // }) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ initialExperience, onCancel }) => {
  const { t } = useTranslation();
  const [experience, setExperience] = useState(initialExperience);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('toto')
  };

  const handleStartDateChange = (date: Date | null) => {
    setExperience((prev) => ({
      ...prev,
      start_date: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setExperience((prev) => ({
      ...prev,
      end_date: date ? date.toISOString().split('T')[0] : '',
    }));
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
          <TextField
            size="small"
            margin="normal"
            id="title"
            name="title"
            label={t('Title')}
            type="text"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            value={experience.title}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            id="company"
            name="company"
            label={t('Company')}
            type="text"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            value={experience.company}
            onChange={handleChange}
          />
           <Grid container spacing={2}>
            <Grid item xs={6}>
            <DatePicker
                label={t('Start Date')}
                value={experience.start_date ? new Date(experience.start_date) : null}
                onChange={handleStartDateChange}
                slotProps={{ textField: { size: 'small', fullWidth: true, InputLabelProps:{
                  shrink: true,
                } } }} // Proper TextField usage inside DatePicker
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label={t('End Date')}
                value={experience.end_date ? new Date(experience.end_date) : null}
                onChange={handleEndDateChange}
                slotProps={{ textField: { size: 'small', fullWidth: true, InputLabelProps:{
                  shrink: true,
                } } }} // Proper TextField usage inside DatePicker
              />
            </Grid>
          </Grid>
          <TextField
            size="small"
            margin="normal"
            id="stack"
            name="stack"
            label={t('Stack')}
            type="text"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            value={experience.stack}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            id="details"
            name="details"
            label={t('Details')}
            type="text"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            multiline
            minRows={4}
            value={experience.details}
            onChange={handleChange}
          />

          {/* Dialog Actions: Cancel & Update */}
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

export default ExperienceForm;
