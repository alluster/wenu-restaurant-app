import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import {
	Link
  } from "react-router-dom";
  import { useAuth0 } from "@auth0/auth0-react";

const Navigation = (props) => {
	const { loginWithRedirect, logout, user } = useAuth0();

	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand><Link to="/"><img src="logo-dark.svg" height="50px"/></Link></Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />

			<Container>
			<Navbar.Collapse id="responsive-navbar-nav">

				<Nav className="mr-auto">
				
				{
					props.auth ?
					<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
							<Nav.Link className="link" href="/transportlist">Tilausseuranta</Nav.Link>
							<Nav.Link href="/itemslist">Ruokalista</Nav.Link>
							{/* <Nav.Link href="/restaurant">Ravintolan tiedot</Nav.Link> */}
							
							<Nav.Link>
								{user.name}
							</Nav.Link>
							<Nav.Link inline>
								<Button onClick={() => logout({ returnTo: window.location.origin })}>Kirjaudu ulos</Button>
							</Nav.Link>
							</Nav>
					</Navbar.Collapse>
					:
					<Navbar.Collapse id="responsive-navbar-nav">

					<Nav className="mr-auto">
						<Nav.Link inline><Button onClick={() => loginWithRedirect()}>Kirjaudu</Button></Nav.Link>
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

