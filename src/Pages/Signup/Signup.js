import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

// ... (keep all styled components the same)

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
      // Directly navigate to home page after successful signup
      navigate('/home');
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

  // ... (keep the rest of your JSX the same)
}

export default Signup;