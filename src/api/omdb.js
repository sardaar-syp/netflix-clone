import axios from 'axios';

const omdb = axios.create({
  baseURL: 'https://www.omdbapi.com', // No trailing slash
  timeout: 5000
});

// Always include these default parameters
omdb.defaults.params = {
  apikey: process.env.REACT_APP_OMDB_KEY || 'e04114d0', // Replace with actual key
  r: 'json', // Force JSON response
  type: 'movie' // Default to movies
};

// Enhanced error handling
omdb.interceptors.response.use(
  response => {
    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Movie not found");
    }
    return response;
  },
  error => {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Network error - check internet connection");
    }
    throw error;
  }
);

export default omdb;