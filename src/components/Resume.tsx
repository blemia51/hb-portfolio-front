import React from 'react';
import { Box, Grid } from '@mui/material';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
interface ResumeProps {
  isLoggedIn: boolean;
}

const Resume: React.FC<ResumeProps> = ({ isLoggedIn }) => {
  // const isMobile = window.innerWidth <= 768; // Example way to check for mobile
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
          <About isLoggedIn={isLoggedIn}/>
        </Grid>

        {/* Skills and Experience Section */}
        <Grid container item spacing={4}>
          {/* Skills Section - 1/3 Width */}
          <Grid item xs={12} md={4}>
            <Skills isLoggedIn={isLoggedIn} userId={1} />
          </Grid>

          {/* Experience Section - 2/3 Width */}
          <Grid item xs={12} md={8}>
            <Experience isLoggedIn={isLoggedIn} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resume;
