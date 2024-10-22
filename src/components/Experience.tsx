import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Dialog, DialogTitle, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExperienceForm from './ExperienceForm';
import { useTranslation } from 'react-i18next';
import { useGetExperiencesQuery } from '../api/experienceApi';
import { format } from 'date-fns';

interface ExperienceProps {
  isLoggedIn: boolean;
}



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

const Experience: React.FC<ExperienceProps> = ({ isLoggedIn }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
 
  const { data: experiences = [], error, isLoading } = useGetExperiencesQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error loading portfolio items</Typography>;
  console.log('exp:', experiences)

  const handleEdit = () => {
    // setSelectedExperience(experience);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedExperience(null);
  };

  const groupByCompany = (experiences: Experiences[]) => {
    return experiences.reduce((acc, experience) => {
      const { company, place, start_date, end_date } = experience;
      const key = `${company} - ${place} - ${start_date}`; // Create a unique key for company
      if (!acc[key]) {
        acc[key] = {
          experiences: [],
          company,
          place,
          start_date,
          end_date,
        };
      }
      acc[key].experiences.push(experience);
      return acc;
    }, {} as { [key: string]: { experiences: Experiences[]; company: string; place: string; start_date: string; end_date: string | null } });
  };

  const groupedExperiences = groupByCompany(experiences);
  console.log('groupedExperiences', groupedExperiences);

  const groupedValue = Object.values(groupedExperiences)
  
  return (
    <Box
      sx={{
        backgroundColor: '#4a4f54',
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
        {t('experience')}
      </Typography>
      {isLoggedIn && (
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
      <Box sx={{ mt: 4, color: 'white', textAlign: 'left', width: '90%' }}>
        {Object.values(groupedExperiences).map(({ experiences, company, place, start_date, end_date }, index) => (
          <div key={`${company}-${start_date}`} style={{ marginBottom: '20px' }}>
            <Typography variant='h6'>
              {experiences[0].title} ({company} – {place}, {format(new Date(start_date), 'MMMM yyyy')}{end_date ? ` - ${format(new Date(end_date), 'MMMM yyyy')}` : ' - Present'})
            </Typography>
            {experiences.map((experience) => (
              <div key={experience.id}>
                <Typography variant="body2" sx={{ mt: 1 }} fontWeight={'fontWeightBold'}>
                {experience.details}
                </Typography>
                <Typography variant="body2">
                  Stack: {experience.stack.join(', ')}
                </Typography>
              </div>
            ))}
            {index < groupedValue.length - 1 &&
              <Divider sx={{ my: 2, backgroundColor: 'white' }} />
            }
          </div>
        ))}
      </Box>
      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Edit Experience')}</DialogTitle>
        <Divider variant='middle' />
          <ExperienceForm
            initialExperience={groupedValue as any} // Pass the selected experience to the form
            onCancel={handleClose} // Cancel handler
              // onUpdate={handleUpdate} // Update handler
          />
      </Dialog>
    </Box>
  );
};

export default Experience;
