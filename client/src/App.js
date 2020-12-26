import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import ItemsList from './Views/ItemsList';
import TransportList from './Views/TransportList';
import Home from './Views/Home';
import AddItem from './Views/AddItem';
import Navigation from './Components/Navigation';

function App() {
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
          <Route path="/itemslist">
            <ItemsList />
          </Route>
          <Route path="/transportlist">
            <TransportList />
          </Route>
		  <Route path="/additem">
            <AddItem />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
