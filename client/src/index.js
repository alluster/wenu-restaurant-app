import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './custom.scss';
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.render(
	<Auth0Provider
		domain="wenu.eu.auth0.com"
		clientId="czPgh7GkLoEIq4Bh3yDk7nuxhrrL1mZ7"
		redirectUri={window.location.origin}
	>
		<App />
		  </Auth0Provider>
		  ,
  	document.getElementById('root')
);

