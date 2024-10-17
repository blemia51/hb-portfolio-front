import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import { useGetAboutQuery } from '../api/aboutApi';
import { useGetExperiencesQuery } from '../api/experienceApi';
import { format } from 'date-fns';


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

const Resume: React.FC = () => {
  // const isMobile = window.innerWidth <= 768; // Example way to check for mobile

  const { data: about, error, isLoading } = useGetAboutQuery();
  const { data: experiences = [] } = useGetExperiencesQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error loading portfolio items</Typography>;
  console.log('exp:', experiences)

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
  
  // Example usage with fetched data:
  
    const groupedExperiences = groupByCompany(experiences);
    console.log('groupedExperiences', groupedExperiences);
  


  return (
    <Box
      sx={{
        backgroundColor: '#282c34',
        minHeight: '100vh',
        padding: 4,
      }}
    >
       <Grid container spacing={4}>
        {/* About Section */}
        <Grid item xs={12}>
          <About isAdmin={true}/>
        </Grid>

        {/* Skills and Experience Section */}
        <Grid container item spacing={4}>
          {/* Skills Section - 1/3 Width */}
          <Grid item xs={12} md={4}>
            <Skills isAdmin={true} />
          </Grid>

          {/* Experience Section - 2/3 Width */}
          <Grid item xs={12} md={8}>
            <Experience isAdmin={true} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resume;
