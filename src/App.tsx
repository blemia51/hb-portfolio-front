import React from 'react';
import { Container } from '@mui/material';
import Home from './components/Home';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Container maxWidth="lg">
      <Home />
    </Container>
    </LocalizationProvider>
  );
};

export default App;
