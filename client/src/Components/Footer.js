
import React, { useState } from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Card, Accordion, Col, Row, Alert, Form, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from './Container';
import axios from 'axios';
import Emailer from './Emailer';

const Content = styled.div `
	padding-top: 50px;
	width: 100%;
	height: 400px;
	bottom: 0;
	margin-top: -400px;
	background-color: #F4F4F2;
	margin-top: 200px;
	min-height: 100%;
	// display: flex;
	`;

const CustomRow = styled(Row) `
	margin-top: 50px;
`

const BottomRow = styled.div`
	min-height: 100%;
	padding-top: 100px;
	bottom: 0 !important;
	justify-content: flex-end;
	// margin-top: -100px;
	height: 100px;
	// position: absolute;
	background-color: #F4F4F2;
	width: 100%;
	z-index: 1000000;
`

const Footer = () => {
	const sendEmail = async (e) => {
		e.preventDefault();
		try {
			return await axios.get('/api/sendemail',  {
				params: {
					email: email
					
				}	
			})
		
			.then(alert("Kiitos yhteydenotostasi"), setEmail(""))
		} 
		catch (error) {
			console.error(error.message)
			// setEmail("")
		}
	}
	const [email, setEmail] = useState("")
	return (
		<Content>
			<Container>
				<CustomRow>
					<Col md={3}>
						<img src="./logo-dark.svg" alt="logo" height="50px"/>
					</Col>
					<Col md={9}>
					<Emailer />

					</Col>
				</CustomRow>

			</Container>
			<BottomRow> 
				<Container>
					<Row>
					<Col lg={3} >
						<p>© Wenu 2020–2021</p>

					</Col>
					
					<Col lg={3}  >
						<p>Käyttöehdot</p>

					</Col>
					</Row>
					
				</Container>
			</BottomRow>


		</Content>
  );
}


export default Footer;
