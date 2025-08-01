import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styled components
const CarouselContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  marginBottom: theme.spacing(4),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
  },
}));

const MovieSlide = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05)',
    zIndex: 1,
  },
}));

const MovieImage = styled('img')({
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  aspectRatio: '2/3',
  objectFit: 'cover',
});

const MovieTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  marginTop: theme.spacing(1),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '0.9rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const CarouselTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  fontSize: '1.5rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const CustomNextArrow = styled(Box)({
  position: 'absolute',
  right: '-25px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  cursor: 'pointer',
  color: 'white',
  fontSize: '2rem',
  '&:hover': {
    color: '#e50914',
  },
});

const CustomPrevArrow = styled(Box)({
  position: 'absolute',
  left: '-25px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  cursor: 'pointer',
  color: 'white',
  fontSize: '2rem',
  '&:hover': {
    color: '#e50914',
  },
});

function MovieCarousel({ movies, onMovieSelect }) {
  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <CustomNextArrow onClick={onClick}>›</CustomNextArrow>
  );
  
  const PrevArrow = ({ onClick }) => (
    <CustomPrevArrow onClick={onClick}>‹</CustomPrevArrow>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <CarouselContainer>
      <CarouselTitle variant="h5" component="h2">
        Trending Now
      </CarouselTitle>
      
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieSlide key={movie.imdbID} onClick={() => onMovieSelect(movie)}>
            <MovieImage
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
              }}
            />
            <MovieTitle>{movie.Title}</MovieTitle>
          </MovieSlide>
        ))}
      </Slider>
    </CarouselContainer>
  );
}

export default MovieCarousel;