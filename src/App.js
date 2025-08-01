import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import PlayPage from './Pages/PlayPage/PlayPage';
import MyListPage from './Pages/MyListPage/MyListPage';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const netflixTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914',
    },
    background: {
      default: '#141414',
      paper: '#222222',
    },
  },
  typography: {
    fontFamily: [
      'Netflix Sans',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={netflixTheme}>
        <CssBaseline />
        <Router>
          <div className="app-container">
            <Nav />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/play/:id" element={<PlayPage />} />
                  <Route path="/mylist" element={<MyListPage />} />
                </Route>

                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;