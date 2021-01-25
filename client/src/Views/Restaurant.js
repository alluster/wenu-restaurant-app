import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Jumbotron, Alert, Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Hero from '../Components/Hero'
import Container from '../Components/Container'

const AlertStyled = styled.div`
	z-index: 10000;
	width: 100%;
	postion: relative;
`;
const Content = styled.div`
	height: calc(100% + 1000px);
`
const Image = styled.img `
position: relative;

	max-width: 100%;
	min-height: 200px;
	margin-top: -100px;
	margin-bottom: 50px;
	// transform: translate(0%, 30%);
	z-index: 1000;

`;
const ImageContainer = styled(Container)`
margin-top: 50px;
width: 100%;
`

const Restaurant = () => {

	return (
		<Content>
			<Container>
				<h3>Ravintolan tiedot</h3>
				<Form>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="formGridAddress1">
						<Form.Label>Address</Form.Label>
						<Form.Control placeholder="1234 Main St" />
					</Form.Group>

					<Form.Group controlId="formGridAddress2">
						<Form.Label>Address 2</Form.Label>
						<Form.Control placeholder="Apartment, studio, or floor" />
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridCity">
						<Form.Label>City</Form.Label>
						<Form.Control />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
						<Form.Label>State</Form.Label>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Choose...</option>
							<option>...</option>
						</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
						<Form.Label>Zip</Form.Label>
						<Form.Control />
						</Form.Group>
					</Form.Row>

					<Form.Group id="formGridCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
					</Form>
					
				</Container>
					
		</Content>
		
  );
}


export default Restaurant;