import React from 'react';
import { Container } from '@mui/material';
import Home from './components/Home';
import Resume from './components/Resume';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Container maxWidth="lg">
      <Home />
      <Resume/>
    </Container>
    </LocalizationProvider>
  );
};

export default App;
