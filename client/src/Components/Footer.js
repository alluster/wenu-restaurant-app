
import React, { useState } from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Card, Accordion, Col, Row, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Container from './Container'
const Content = styled.div `
	padding-top: 50px;
	width: 100%;
	height: 600px;
	bottom: 0;
	margin-top: -600px;
	background-color: #2400FF;
	margin-top: 200px;
	`;



const Footer = () => {

	return (
		<Content>
			<Container>
				<Row>
				<Col md={12}>
					<img src="./logo-white.png" alt="logo" height="50px"/>
				</Col>

				</Row>
				
			</Container>

		</Content>
  );
}


export default Footer;
