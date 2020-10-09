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

function App() {
  return (
    <Router>
      <div>
		  <Container>
			<nav>
			<ul>
				<li>
				<Link to="/">Home</Link>
				</li>
				<li>
				<Link to="/itemslist">Ruokalista</Link>
				</li>
				<li>
				<Link to="/transportlist">Tuotteet kuljetuksessa</Link>
				</li>
			
			</ul>
			</nav>
		  </Container>
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
