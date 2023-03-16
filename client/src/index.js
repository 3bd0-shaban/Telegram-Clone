import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PeerProvider } from './Context/PeerContext';
import PersistLogin from './Utils/PersistLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/*" element={
              <PeerProvider>
                <App />
              </PeerProvider>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);