import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.querySelector('#root')).render(
<BrowserRouter>
  <App/>
</BrowserRouter>
)
