import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omdb from '../../api/omdb';
import { Box, Typography, styled, CircularProgress } from '@mui/material';

const RowContainer = styled(Box)({
  margin: '2rem 0',
  padding: '0 2rem',
  position: 'relative',
});

const PostersContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  gap: '0.5rem',
  padding: '1rem 0',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const MoviePoster = styled('img')(({ islarge }) => ({
  width: islarge ? '300px' : '200px',
  height: islarge ? '450px' : '300px',
  objectFit: 'cover',
  borderRadius: '4px',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    zIndex: 1,
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
  },
}));

const ErrorText = styled(Typography)({
  color: 'red',
  padding: '1rem',
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  width: '100%',
});

function Row({ title, searchQuery, onMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await omdb.get('/', {
          params: { 
            s: searchQuery || 'action',
            page: 1,
            type: 'movie' // Filter only movies
          }
        });

        if (response.data.Response === "False") {
          throw new Error(response.data.Error || "No movies found");
        }

        // Filter out entries without posters
        const filteredMovies = (response.data.Search || [])
          .filter(movie => movie.Poster && movie.Poster !== "N/A");
        
        setMovies(filteredMovies);
        setError('');
      } catch (err) {
        setError(err.message);
        console.error("Row fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 500); // Small delay to avoid rapid successive calls

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleMovieClick = (movie) => {
    if (onMovieSelect) {
      onMovieSelect(movie);
    }
  };

  if (loading) {
    return (
      <RowContainer>
        <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 1 }}>
          {title}
        </Typography>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </RowContainer>
    );
  }

  return (
    <RowContainer>
      <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 1 }}>
        {title}
      </Typography>
      
      {error ? (
        <ErrorText variant="body1">
          {error}
        </ErrorText>
      ) : (
        <PostersContainer>
          {movies.map((movie) => (
            <MoviePoster
              key={movie.imdbID}
              src={movie.Poster}
              alt={movie.Title}
              islarge={movies.length < 5}
              loading="lazy"
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </PostersContainer>
      )}
    </RowContainer>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  onMovieSelect: PropTypes.func,
};

Row.defaultProps = {
  searchQuery: 'action',
  onMovieSelect: null,
};

export default Row;