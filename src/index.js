import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/hkgrotesk/HKGrotesk-Bold.otf';

const root = ReactDOM.createRoot(document.getElementById('root'));

const stripe_key = "pk_test_51JoD3gCiebEAR4BCfpCfVE6P8ppgRPaC1cXrqIseXdmAR5sY1MgZ2X4V7FqcqzHSpyknMesi5qA7STwEobjghYRq00tfJFTLyJ" ;
const stripePromise = loadStripe(stripe_key)

root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
reportWebVitals();
