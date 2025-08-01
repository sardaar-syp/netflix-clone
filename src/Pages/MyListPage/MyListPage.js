import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Nav from '../../components/Nav/Nav';
import Row from '../../components/Row/Row';  // Updated import path
import { useSelector } from 'react-redux';

const MyListContainer = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#111',
  color: 'white',
  paddingTop: '70px',
});

const Title = styled(Typography)({
  marginLeft: '20px',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
});

function MyListPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const myList = useSelector(state => state.user.myList) || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MyListContainer>
      <Nav isScrolled={isScrolled} />
      
      <Box sx={{ marginTop: '50px' }}>
        <Title variant="h2">My List</Title>
        
        {myList.length > 0 ? (
          <Row 
            title="Your Saved Titles" 
            movies={myList}
            isLargeRow
          />
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '50vh'
          }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
              Your list is empty
            </Typography>
            <Typography variant="body1" sx={{ color: '#aaa' }}>
              Add movies and TV shows to your list to watch them later
            </Typography>
          </Box>
        )}
      </Box>
    </MyListContainer>
  );
}

export default MyListPage;