import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Nav from '../../components/Nav/Nav';
import Banner from '../../components/Banner/Banner';
import Row from '../../components/Row/Row';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import omdb from '../../api/omdb';

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await omdb.get('/', {
          params: { 
            s: 'popular',
            type: 'movie',
            page: 1
          }
        });

        if (response.data.Response === "False") {
          throw new Error(response.data.Error || "Failed to fetch trending movies");
        }

        const movies = response.data.Search 
          ? response.data.Search.slice(0, 10).filter(movie => movie.Poster !== "N/A")
          : [];

        // Add local video paths to movies
        const moviesWithVideos = movies.map(movie => ({
          ...movie,
          videoUrl: `/videos/${movie.imdbID}.mp4` // Points to public/videos folder
        }));

        setTrendingMovies(moviesWithVideos);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedMovie(null);
    }
  };

  // Helper function to handle movie selection
  const handleMovieSelect = (movie) => {
    setSelectedMovie({
      ...movie,
      videoUrl: `/videos/${movie.imdbID}.mp4`
    });
  };

  return (
    <Box sx={{ 
      backgroundColor: '#111', 
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      <Nav />
      
      {/* Search Bar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '20px',
        marginTop: '80px',
        position: 'sticky',
        top: '0',
        zIndex: 100,
        backgroundColor: '#111'
      }}>
        <Box 
          component="form" 
          onSubmit={handleSearch} 
          sx={{ 
            width: '100%', 
            maxWidth: '600px',
            transition: 'all 0.3s ease',
            '&:focus-within': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon sx={{ color: 'white' }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
              }
            }}
          />
        </Box>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh'
        }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box sx={{ 
          color: 'white', 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: 'rgba(229, 9, 20, 0.2)',
          margin: '20px',
          borderRadius: '4px'
        }}>
          {error}
        </Box>
      )}

      {/* Movie Carousel */}
      {!isLoading && !error && trendingMovies.length > 0 && (
        <MovieCarousel 
          movies={trendingMovies} 
          onMovieSelect={handleMovieSelect} 
        />
      )}

      {/* Banner with video playback */}
      {selectedMovie && <Banner movie={selectedMovie} />}
      
      {/* Rows of movies */}
      {!isLoading && !error && (
        <Box sx={{ 
          marginTop: selectedMovie ? '-120px' : '20px',
          transition: 'margin-top 0.3s ease'
        }}>
          <Row 
            title={searchQuery ? `Search Results for "${searchQuery}"` : "Trending Now"} 
            searchQuery={searchQuery || 'popular'} 
            onMovieSelect={handleMovieSelect}
          />
          {!searchQuery && (
            <>
              <Row 
                title="Action Movies" 
                searchQuery="action" 
                onMovieSelect={handleMovieSelect}
              />
              <Row 
                title="Comedy Movies" 
                searchQuery="comedy" 
                onMovieSelect={handleMovieSelect}
              />
              <Row 
                title="Documentaries" 
                searchQuery="documentary" 
                onMovieSelect={handleMovieSelect}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Home;