import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, styled, Box, CircularProgress } from '@mui/material';
import ReactPlayer from 'react-player';

// Styled Components
const BannerContainer = styled('header')(({ bgimage }) => ({
  color: 'white',
  backgroundSize: 'cover',
  backgroundImage: `url(${bgimage})`,
  backgroundPosition: 'center center',
  height: '448px',
  position: 'relative',
}));

const BannerContent = styled('div')({
  marginLeft: '30px',
  paddingTop: '140px',
  height: '190px',
});

const BannerButtons = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
});

const PlayButton = styled(Button)({
  backgroundColor: 'white',
  color: 'black',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
});

const MyListButton = styled(Button)({
  backgroundColor: 'rgba(109, 109, 110, 0.7)',
  color: 'white',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: 'rgba(109, 109, 110, 0.4)',
  },
});

const BannerDescription = styled('p')({
  width: '45rem',
  lineHeight: '1.3',
  paddingTop: '1rem',
  fontSize: '0.8rem',
  maxWidth: '360px',
  height: '80px',
});

const BannerFadeBottom = styled('div')({
  height: '7.4rem',
  backgroundImage: 'linear-gradient(180deg, transparent, rgba(37,37,37,0.61), #111)',
  position: 'absolute',
  bottom: 0,
  width: '100%',
});

function Banner({ movie }) {
  const navigate = useNavigate();
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Updated video URL logic for local files
  const videoUrl = movie?.videoUrl 
    ? movie.videoUrl.startsWith('http') 
      ? movie.videoUrl 
      : `${process.env.PUBLIC_URL}${movie.videoUrl}`
    : `${process.env.PUBLIC_URL}/videos/${movie?.imdbID}.mp4`;

  const handlePlay = () => {
    setIsLoading(true);
    setShowPlayer(true);
  };

  return (
    <BannerContainer bgimage={movie?.Poster}>
      <BannerContent>
        <h1>{movie?.Title}</h1>
        <BannerButtons>
          <PlayButton 
            variant="contained" 
            onClick={handlePlay}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Play'}
          </PlayButton>
          <MyListButton 
            variant="contained"
            onClick={() => navigate('/mylist')}
          >
            My List
          </MyListButton>
        </BannerButtons>
        <BannerDescription>
          {movie?.Plot?.length > 150 ? `${movie.Plot.substring(0, 150)}...` : movie?.Plot}
        </BannerDescription>
      </BannerContent>

      {/* Video Player Modal */}
      {showPlayer && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{
            width: '90%',
            height: '90%',
            position: 'relative'
          }}>
            {isLoading && (
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1
              }}>
                <CircularProgress size={60} color="inherit" />
              </Box>
            )}
            
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              playing
              onReady={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                alert(`Failed to load video at: ${videoUrl}\nPlease check the file exists.`);
                setShowPlayer(false);
              }}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
            />
            
            <Button
              onClick={() => setShowPlayer(false)}
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)'
                }
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}

      <BannerFadeBottom />
    </BannerContainer>
  );
}

export default Banner;