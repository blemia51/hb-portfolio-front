import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useLoginMutation } from '../api/loginApi';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginFormProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (data: boolean) => void;
    onClose: () => void;
  }

const LoginForm: React.FC<LoginFormProps> = ({ onClose , setIsLoggedIn}) => {
  // Local state for email, password, and error handling
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [login, error,] = useLoginMutation();

  const { t } = useTranslation()
  
  // authentication function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const result = await login({ email, password }).unwrap()
        const token = result.access_token;

        if (token) {
          localStorage.setItem('token', token);
          setIsLoggedIn(true)
          onClose()
        }
        
    } catch (err) {
        console.error('login failed:', err)
    }
  };

   // Toggle password visibility
   const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  
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
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                ),
              }
            }}
            label={t('password')}
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          {/* {error && <Alert severity="error">{error}</Alert>} */}

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
