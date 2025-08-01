import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const LogoImage = styled('img')(({ size = 'medium' }) => ({
  width: size === 'large' ? '180px' : 
         size === 'medium' ? '120px' : '90px',
  height: 'auto',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

const Logo = ({ size = 'medium', onClick }) => {
  return (
    <Link to="/" onClick={onClick}>
      <LogoImage 
        src="/images/netflix-logo.png" 
        alt="Netflix Logo"
        size={size}
      />
    </Link>
  );
};

export default Logo;