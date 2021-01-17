import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
	Link
  } from "react-router-dom";
  import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
	const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand><Link to="/"><img src="logo-dark.svg" height="50px"/></Link></Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />

			<Container>
			<Navbar.Collapse id="responsive-navbar-nav">

				<Nav className="mr-auto">
				
				{
					isAuthenticated ?
					<Navbar.Collapse id="responsive-navbar-nav">

					<Nav className="mr-auto">
							<Nav.Link className="link" href="/transportlist">Tilausseuranta</Nav.Link>
							<Nav.Link href="/itemslist">Ruokalista</Nav.Link>
							<Nav.Link href="/">Ravintolan tiedot</Nav.Link>
							
							<Nav.Link>
								{user.name}
							</Nav.Link>
							<Nav.Link>
								<button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
							</Nav.Link>
							</Nav>
					</Navbar.Collapse>
					:
					<Navbar.Collapse id="responsive-navbar-nav">

					<Nav className="mr-auto">
						<Nav.Link><button onClick={() => loginWithRedirect()}>Kirjaudu</button></Nav.Link>
						</Nav>
					</Navbar.Collapse>
				}

					</Nav>
				</Navbar.Collapse>

			</Container>
		
	  </Navbar>
  );
}


export default Navigation;

