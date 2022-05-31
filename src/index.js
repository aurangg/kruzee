import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/hkgrotesk/HKGrotesk-Bold.otf';

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripe_key = process.env.REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripe_key)

root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
reportWebVitals();
