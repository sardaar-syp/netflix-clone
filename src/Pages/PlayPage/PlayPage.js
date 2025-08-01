import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { PlayArrow, Add, ThumbUp, VolumeOff, VolumeUp } from '@mui/icons-material';
import Nav from '../../components/Nav/Nav';
import axios from '../../axios';
import requests from '../../requests';

const PlayContainer = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#111',
  color: 'white',
});

const Backdrop = styled('div')({
  position: 'relative',
  height: '56.25vw', // 16:9 aspect ratio
  minHeight: '400px',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, #111 0%, transparent 100%)',
  },
});

const Content = styled(Box)({
  position: 'absolute',
  bottom: '10%',
  left: '4%',
  maxWidth: '600px',
});

const Controls = styled(Box)({
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
});

function PlayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const request = await axios.get(requests.fetchMovieDetails.replace('{id}', id));
        setMovie(request.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        navigate('/');
      }
    };

    fetchMovie();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, navigate]);

  if (!movie) return <div>Loading...</div>;

  return (
    <PlayContainer>
      <Nav isScrolled={isScrolled} />
      
      <Backdrop style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <Content>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {movie.title || movie.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {movie.overview}
          </Typography>
          
          <Controls>
            <Button 
              variant="contained" 
              startIcon={<PlayArrow />}
              sx={{
                backgroundColor: '#e50914',
                color: 'white',
                '&:hover': { backgroundColor: '#f40612' }
              }}
            >
              Play
            </Button>
            <IconButton 
              sx={{ 
                backgroundColor: 'rgba(42,42,42,0.6)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.5)'
              }}
            >
              <Add />
            </IconButton>
            <IconButton 
              sx={{ 
                backgroundColor: 'rgba(42,42,42,0.6)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.5)'
              }}
            >
              <ThumbUp />
            </IconButton>
            <IconButton 
              onClick={() => setIsMuted(!isMuted)}
              sx={{ 
                backgroundColor: 'rgba(42,42,42,0.6)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.5)'
              }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Controls>
        </Content>
      </Backdrop>
      
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          More Like This
        </Typography>
        {/* You would add a Row component here with similar movies */}
      </Box>
    </PlayContainer>
  );
}

export default PlayPage;