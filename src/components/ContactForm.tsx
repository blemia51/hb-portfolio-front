import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSendContactEmailMutation } from '../api/contactApi';


interface ContactProps {
	handleClose: () => void;
}
const ContactForm: React.FC<ContactProps> = ({ handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

	const [sendContactEmail, { isLoading, isError, isSuccess }] = useSendContactEmailMutation();

	const { t } = useTranslation()
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  // Email validation regex
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Reset errors before validation
    setErrors({
      name: '',
      email: '',
    });

    // Name validation
    if (name.trim() === '') {
      setErrors(prevErrors => ({ ...prevErrors, name: 'Name is required' }));
      hasError = true;
    }

    // Email validation
    if (email.trim() === '') {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email address' }));
      hasError = true;
    }

    // If there's an error, stop the form submission
    if (hasError) return;

			try {
				await sendContactEmail({
					name,
					email,
				}).unwrap(); // Unwrap to handle errors or success explicitly
	
				alert('Email sent successfully');
				handleClose();
			} catch (error) {
				console.error('Error sending email:', error);
				alert('Failed to send email');
			}

    // Clear the form after submission
    setName('');
    setEmail('');
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          {/* Name Field */}
          <TextField
           margin="normal"
            size='small'
            InputLabelProps={{
                shrink: true,
              }}
            label={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)} // If there's an error, highlight the input
            helperText={errors.name} // Show the error message below the input
            required
            fullWidth
          />

          {/* Email Field */}
          <TextField
           margin="normal"
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            label={t('email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)} // If there's an error, highlight the input
            helperText={errors.email} // Show the error message below the input
            required
            fullWidth
          />

          {/* Submit Button */}
		    	<Box sx={{
            display: 'flex',
            flexDirection: 'row',
		    		justifyContent: 'center',
            gap: 2,
          }}
		    	>
		    		<Button variant="outlined" color="secondary" onClick={handleClose} sx={{mt: 3, mb: 2, borderRadius: 20}}>
          	  {t('cancel')}
          	</Button>
          	<Button variant="outlined" color="primary" type="submit" sx={{mt: 3, mb: 2, borderRadius: 20}}>
          	  {t('send')}
          	</Button>
		    	</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactForm;
