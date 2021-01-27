
import React, { useState } from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Card, Accordion, Col,Button, Row, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from './Container'
import { useAuth0 } from "@auth0/auth0-react";

const Content = styled.div `
	position: relative;
	x-index: 1;
	width: 100%;
	height: calc(100% + 300px);
	// background-image: url('bg.svg');
	background-repeat: no-repeat;
	margin-bottom: 20px;
	background-size: cover;
	overflow: hidden;
	background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);

	`;



const Text = styled.div`
	color: white;
	min-height: 200px;
	max-width: 100%;
	margin-top: 100px;
	margin-bottom: 200px;

	@media (max-width: 768px) {
		margin-top: 20px;
		margin-bottom: 150px;

	}
`
const CustomRow = styled(Row) `
margin-top: 40px;
`

const H1 = styled.h1`
	font-weight: bold;
	font-size: 80px;
	margin-bottom: 50px;
	@media (max-width: 768px) {
		font-size: 40px;
		margin-bottom: 20px;

	  }
`;
const H2 = styled.h2`

`;

const Hero = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		<Content>
			
			<Container>
		<Text>
						<H1>Ruokalista ja tilausten hallinta yhdellä koodilla ravintolan kotisivuille.</H1>
						<h3>Wenu ohjelmiston avulla saat ravintolasi kotisivuille oman, helposti päivitettävän ruokalistan, jonka avulla asiakkaasi voivat tilata ruokaa kotiinkuljetuksella kotiin suoraan verkkosivuiltanne.</h3>
						<CustomRow>
						{
							isAuthenticated ? "" :<Button size="lg" variant="success" onClick={() => loginWithRedirect()}>Kirjaudu palveluun tästä</Button>
						}
						</CustomRow>
					
						</Text>		
				</Container>
			
				
		</Content>
  );
}


export default Hero;
