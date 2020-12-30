
import React, { useState } from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Card, Accordion, Col, Row, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from './Container'
const Content = styled.div `
	position: relative;
	x-index: 1;
	min-height: calc(100vh);
	width: 100%;
	background-image: url('bg.svg');
	background-repeat: no-repeat;
	margin-bottom: 50px;
	background-size: cover;
	overflow: hidden;

`;

const Image = styled.img `
	float: right;
	max-width: 100%;
	min-height: 200px;
	// transform: translate(0%, 30%);


`;
const ImageContainer = styled.div`
margin-top: 50px;
`


const Text = styled.div`
	color: white;
	min-height: 200px;
	max-width: 100%;
	margin-top: 100px;
	@media (max-width: 768px) {
		margin-top: 50px;

	}
`
const CustomRow = styled(Row) `
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

	return (
		<Content>
			
			<Container>
		<Text>
						<H1>Ruokalista ja tilausten hallinta yhdellä koodilla ravintolan kotisivuille.</H1>
						<h3>Wenu ohjelmiston avulla saat ravintolasi kotisivuille oman, helposti päivitettävän ruokalistan, jonka avulla asiakkaasi voivat tilata ruokaa kotiinkuljetuksella kotiin suoraan verkkosivuiltanne.</h3>
						</Text>		
				</Container>
				<Container>
					<ImageContainer>
						<Image src="/app.png" />

					</ImageContainer>
				</Container>
				
		</Content>
  );
}


export default Hero;
