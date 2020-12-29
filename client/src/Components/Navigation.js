import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
	Link
  } from "react-router-dom";

const Navigation = () => {

	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand><Link to="/"><img src="logo-dark.svg" height="50px"/></Link></Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />

			<Container>
			<Navbar.Collapse id="responsive-navbar-nav">

				<Nav className="mr-auto">
				<Nav.Link className="link" href="/transportlist">Tilausseuranta</Nav.Link>
				<Nav.Link href="/itemslist">Ruokalista</Nav.Link>
				<Nav.Link href="/">Ravintolan tiedot</Nav.Link>
				<Nav.Link href="/">Kirjaudu</Nav.Link>

					</Nav>
				</Navbar.Collapse>

			</Container>
		
	  </Navbar>
  );
}


export default Navigation;

