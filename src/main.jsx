import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/dela-gothic-one';
import './index.css';
import { store } from './store/store';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e63946' },
    secondary: { main: '#b6f23a' },
    text: { primary: '#efdcc3', secondary: '#b3a590' },
    background: { default: '#0b0b0c', paper: 'rgba(24,21,21,0.85)' },
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    h1: { fontWeight: 800 }, h2: { fontWeight: 800 }, h3: { fontWeight: 800 },
    h4: { fontWeight: 800 }, h5: { fontWeight: 800 },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);