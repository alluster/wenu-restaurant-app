
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
	min-height: 400px;
	bottom: 0;
	margin-top: -400px;
	background-color: #F4F4F2;
	margin-top: 200px;
	min-height: 100%;
	// display: flex;
	`;

const CustomRow = styled(Row) `
	// margin-top: 50px;
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
				<CustomRow >
					<Col className='mt-2' md={3}>
						<img src="./logo-dark.svg" alt="logo" height="50px"/>
					</Col>
					<Col md={9}>
					<Emailer />

					</Col>
				</CustomRow>

			</Container>
				<Container>
					<Row className='mt-5'>
					<Col lg={3} >
						<p>© Wenu 2020–2021</p>

					</Col>
					
					<Col lg={3}  >
						<p>Käyttöehdot</p>

					</Col>
					</Row>
					
				</Container>


		</Content>
  );
}


export default Footer;
