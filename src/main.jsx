import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store.js';

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <GoogleOAuthProvider clientId="315611503194-2seool4q280fcq69qpb76il6u630bd6i.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Router>
  </Provider>
);
