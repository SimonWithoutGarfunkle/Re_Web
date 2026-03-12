import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme.js';
import './styles/global.css';

import AppliPage   from './pages/AppliPage.jsx';
import ProjetPage  from './pages/ProjetPage.jsx';
import CreateursPage from './pages/CreateursPage.jsx';
import LoginPage   from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<AppliPage />}    />
          <Route path="/projet"     element={<ProjetPage />}   />
          <Route path="/createurs"  element={<CreateursPage />} />
          <Route path="/login"      element={<LoginPage />}    />
          <Route path="/register"   element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
