import React, { useState } from 'react';
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

function App() {
	const [ authenticated, setAuthenticated ] = useState(false)
	const RedirectToHome = () => {
		return (
			<Redirect path="/" />
		)
	}
  return (
    <Router>	
	  <div    
		style={{
			backgroundColor: '#F8F9FA',
			minHeight: "100vh"
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
      </div>
    </Router>
  );
}

export default App;
