
import React, { useState } from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Container, Card, Accordion, Col, Row, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Content = styled.div `
	position: absolute;
	x-index: 1;
	height: 100vh;
	width: 100%;
	background-image: url('bg.svg');
	background-repeat: no-repeat;
	// background-size: cover;
	// background-position: right top;


`;

const Image = styled.img `
	text-align: right;
	height: auto;
	width: auto;
	float: right;
	// margin-top: -10vh;
	max-width: 100vw;


`;
const CustomRow = styled(Row) `
	height: auto;
`
const Text = styled.div`
	text-align: left;
	top: 50%;
	// transform: translate(-50%, -50%);
	color: white;
`
const H1 = styled.h1`
	font-weight: bold;
	font-size: 80px;
	margin-bottom: 50px;
`;
const H2 = styled.h2`

`;
const AlertStyled = styled.div`
	z-index: 10000;
	margin-top: 80px;
	// left: 25%;
	width: 100%;
`;
const Hero = () => {

	return (
		<Content>

			<Container>
			<AlertStyled>
				<Container>
					<Alert variant="light">
						<Alert.Heading>Hei, tervetuloa Wenu palveluun!</Alert.Heading>
						<p>
							Wenu palvelun kehittäminen on tällä hetkellä kesken. Pyrimme aloittamaan ruokatoimitusten tekemisen vuoden 2021 alkupuolella.
						</p>
						<hr />
						<p className="mb-0">
						Mikäli kaipaat lisätietoja tai haluat Wenu palvelun käyttöön, ota yhteyttä! aleksanteri@halua.io
						</p>
					</Alert>
				</Container>
					
			</AlertStyled>
				<CustomRow>
					<Col md={12} >
						<Text>
						<H1>Ruokalista ja tilausten hallinta helposti.</H1>
						<h3>Yhdellä koodilla ravintolasi koko tilausjärjestelmä.</h3>
						</Text>
						
					</Col>
				</CustomRow>
				
				<Col md={12} >
					<Image src="/app.png" />
				</Col>	
			</Container>
		</Content>
  );
}


export default Hero;
