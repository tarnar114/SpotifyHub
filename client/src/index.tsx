import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import {CookiesProvider} from 'react-cookie'
import {CssBaseline} from '@material-ui/core'
ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
    <CssBaseline />
    <App />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

