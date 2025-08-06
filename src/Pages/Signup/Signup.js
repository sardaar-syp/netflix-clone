import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

// Styled components (example, customize as needed)
const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const ErrorText = styled(Typography)({
  color: 'red',
  marginTop: '8px',
});

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home'); // navigate after signup
    } catch (err) {
      console.error('Registration error:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email already in use');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSignUp}>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign Up
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />

      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />

      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        required
      />

      {error && <ErrorText>{error}</ErrorText>}

      <Box mt={2} position="relative">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          Sign Up
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'primary.main',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>

      <Typography variant="body2" align="center" mt={2}>
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
    </FormContainer>
  );
}

export default Signup;
