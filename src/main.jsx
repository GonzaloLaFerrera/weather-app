import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { CssBaseline } from '@mui/material'; //reinicia todos los estilos

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

import { SnackbarProvider } from "notistack";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StrictMode>,
)
