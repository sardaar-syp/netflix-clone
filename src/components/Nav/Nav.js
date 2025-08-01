// src/components/Nav/Nav.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';  // Correct import path
import './Nav.css';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
    navigate('/login');
  };

  return (
    <div className={`nav ${scrolled && 'nav__black'}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          onClick={() => navigate('/')}
        />
        <button className="nav__signInButton" onClick={handleAuth}>
          {user ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}

export default Nav;