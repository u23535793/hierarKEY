import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto';

// Create your custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#f8f8ff', 
    },
    primary: {
      main: '#031f2c', 
    },
    secondary: {
      main: '#cb9043', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <App />
    </ThemeProvider>
  </React.StrictMode>
);