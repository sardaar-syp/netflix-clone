import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { auth, signInWithEmailAndPassword } from '../../firebase';

// Styled Components
const LoginContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
  backgroundSize: 'cover',
  padding: '20px',
});

const LoginLogo = styled('img')({
  width: '180px',
  marginBottom: '40px',
  cursor: 'pointer',
});

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px',
  width: '100%',
  maxWidth: '450px',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  borderRadius: '4px',
  gap: theme.spacing(2),
}));

const SignInButton = styled(Button)({
  backgroundColor: '#e50914',
  color: 'white',
  fontWeight: 'bold',
  padding: '16px',
  fontSize: '16px',
  borderRadius: '4px',
  marginTop: '24px',
  '&:hover': {
    backgroundColor: '#f40612',
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#737373',
  border: 'none',
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home');
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('Account disabled');
          break;
        case 'auth/user-not-found':
          setError('No account with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Try later.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Link to="/">
        <LoginLogo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
      </Link>
      
      <FormContainer component="form" onSubmit={handleLogin}>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
          variant="filled"
          InputProps={{ style: { backgroundColor: '#333', color: 'white' } }}
        />
        
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
          variant="filled"
          InputProps={{ 
            style: { backgroundColor: '#333', color: 'white' },
            inputProps: { minLength: 6 }
          }}
        />
        
        <SignInButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </SignInButton>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" style={{ marginLeft: '5px' }}>Remember me</label>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Need help?
          </Typography>
        </Box>
        
        <Typography variant="body1" mt={2}>
          New to Netflix?{' '}
          <RegisterButton component={Link} to="/signup">
            Sign up now
          </RegisterButton>
        </Typography>
      </FormContainer>
    </LoginContainer>
  );
}

export default Login;