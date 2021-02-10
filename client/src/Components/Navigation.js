import React from 'react';
import { Navbar, Nav, Container, Button, NavItem } from 'react-bootstrap';
import {
	Link
  } from "react-router-dom";
  import { useAuth0 } from "@auth0/auth0-react";

const Navigation = (props) => {
	const { loginWithRedirect, logout, user } = useAuth0();

	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand><Link to="/"><img src="logo-dark.svg" height="30px"/></Link></Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />

			<Container>
				<Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">

				
					{
						props.auth ?
						<Nav >

							<Nav>
								<Nav.Link className="link" href="/transportlist">Tilausseuranta</Nav.Link>
								<Nav.Link href="/itemslist">Ruokalista</Nav.Link>	
								<Nav.Link href="/restaurant">Ravintolan tiedot</Nav.Link>							
						
								<Nav.Link>
									{user.name}
								</Nav.Link>
							</Nav>
							<Nav >
								<Nav.Item>
									<Button onClick={() => logout({ returnTo: window.location.origin })}>Kirjaudu ulos</Button>

								</Nav.Item>
							</Nav>
							</Nav>

						
						:
							<Nav >
								<Nav.Link ><Button onClick={() => loginWithRedirect()}>Kirjaudu</Button></Nav.Link>
							</Nav>
					}

				</Navbar.Collapse>

			</Container>
		
	  </Navbar>
  );
}


export default Navigation;

