import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Details, NotFound } from '@/pages';
import { AppContextProvider } from '@/context';
import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/details/:type/:id' element={<Details />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
