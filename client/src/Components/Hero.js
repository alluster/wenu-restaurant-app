
import React, { useState } from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Card, Accordion, Col,Button, Row, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from './Container'
import { useAuth0 } from "@auth0/auth0-react";
import Emailer from './Emailer';

const Content = styled.div `
	position: relative;
	x-index: 1;
	width: 100%;
	height: calc(100% + 300px);
	// background-image: url('bg.svg');
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
	// background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
	// clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
	background-color: #F4F4F2;
	`;



const Text = styled.div`
	// color: white;
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
	margin-top: 80px;
	padding-left: 15px;
	@media (max-width: 768px) {
		margin-top: 30px;

	}

`

const H1 = styled.h1`
	font-weight: bold;
	font-size: 80px;
	margin-bottom: 50px;
	@media (max-width: 768px) {
		font-size: 50px;
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
						<H1>Tilaa ruokaa kuljetettuna suoraan ravintolalta ja säästä!</H1>
						<h3>Palvelumme avulla ravintolat myyvät ruokaa kotiinkujetuksella - omilla ehdoillaan!</h3>

						{
							isAuthenticated ? "" :<div>
								<Button size="lg" className='mt-4' variant="outline-primary" onClick={() => loginWithRedirect()}>Kirjaudu palveluun tästä</Button>
								</div>
						}
						{
							isAuthenticated ?
								""
								:
								<CustomRow>
									<Emailer />
								</CustomRow>
						}
					
					
						</Text>		
				</Container>
			
				
		</Content>
  );
}


export default Hero;
