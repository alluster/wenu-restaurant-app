import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
  } from "react-router-dom";
import ItemsList from './Views/ItemsList';
import TransportList from './Views/TransportList';
import Home from './Views/Home';
import AddItem from './Views/AddItem';
import Navigation from './Components/Navigation';
import PaymentMethods from './Views/PaymentMethods';
import Footer from './Components/Footer';
import { useAuth0 , withAuthenticationRequired} from "@auth0/auth0-react";

function App() {
	const { isAuthenticated } = useAuth0();
	const [ authenticated, setAuthenticated ] = useState(true)
	const RedirectToHome = () => {
		return (
			<Redirect path="/" />
		)
	}
		
	useEffect(() => {
		// setAuthenticated(isAuthenticated)
	},[])
  return (
	
    <Router>	
		{console.log(withAuthenticationRequired)}
	  <div    
		style={{
			backgroundColor: '#F8F9FA',
			minHeight: "calc(100vh + 300px)"
      }}>
		  <Container fluid>
				<Navigation />
				
		  </Container>
       

        <Switch>
          <Route path="/itemslist" component={ authenticated ? ItemsList : RedirectToHome} />
          <Route path="/transportlist" component={ authenticated ? TransportList : RedirectToHome} />
          <Route path="/additem" component={ authenticated ? AddItem : RedirectToHome} />
          <Route path="/paymentmethods" component={ authenticated ? PaymentMethods : RedirectToHome} />
          <Route exact path="/" component={Home} />
        </Switch>
		<Footer />
      </div>
    </Router>

  );
}

export default App;
