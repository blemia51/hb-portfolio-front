import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useLoginMutation } from '../api/loginApi';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
    onClose: () => void;
  }

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  // Local state for email, password, and error handling
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [login, { isLoading, isError }] = useLoginMutation();

  const { t } = useTranslation()
  
  // Mock authentication function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const result = await login({ email, password }).unwrap()
        console.log('Login successful, token:', result.access_token);
        onClose()
    } catch (err) {
        console.error('login failed:', err)
    }
  };

  // If the user is already logged in
  if (isLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>
          Welcome, Admin!
        </Typography>
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          You can now add or manage your projects.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 1, width: '100%' }}
        >
          {/* Email Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label={t('email')}
            name="email"
            //autoComplete="email"
            autoFocus
            size='small'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            size='small'
            name="password"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Submit Button */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Button
            type="submit"
            // fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2, borderRadius: 20 }}
          >
            {t('login')}
          </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
