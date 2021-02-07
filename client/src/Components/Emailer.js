
import React, { useState } from 'react';
import styled from 'styled-components'
import {  Col, Row, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";



const CustomRow = styled(Row) `
	// margin-top: 50px;
	padding-left: -15px;
	@media (max-width: 768px) {
		margin-top: 80px;

	}
`

const Emailer = () => {
	const { isAuthenticated } = useAuth0();

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
		
				<CustomRow>
					<Col md={12}>
						{
							isAuthenticated ? 
								<h3>Ota yhteys tukeen</h3>
								:
								<h3>Ota yhteyttä niin kerromme lisää!</h3>
						}
									
										</Col>
					<Col md={10}>
						<Form.Group className='mt-2' controlId="formBasicEmail">
							<Form.Control 
								size="lg"
								type="email" 
								value={email} 
								onChange={(e) => setEmail(e.target.value)} 
								placeholder="Anna email -osoitteesi" 
							/>
						
						</Form.Group>
					</Col>
					<Col md={2}>
						<Button  className='mt-2' size="lg" variant="primary" type="submit" onClick={(e) => sendEmail(e)}>Lähetä</Button>
					</Col>
				</CustomRow>
			
  );
}


export default Emailer;
