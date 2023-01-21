import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';

import './index.css';
import Root from './components/root';
import configureStore from './store/store';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If returning user has a session token in localStorage
  if (localStorage.jwtToken) {
    
    // Set token as common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode token to obtain user info
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create preconfigured state we can immediately add to our store
    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser,
      }
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // Check if user's token has expired
    if (decodedUser.exp < currentTime) {
      // Log user out and redirect to login page
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // If this is a first time user, start with empty store
    store = configureStore({});
  }

  // Render root component & pass in store as a prop
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});