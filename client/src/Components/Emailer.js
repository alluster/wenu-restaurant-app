
import React, { useState } from 'react';
import styled from 'styled-components'
import {  Col, Row, Form, Button} from 'react-bootstrap';
import axios from 'axios';


const CustomRow = styled(Row) `
	margin-top: 50px;
`

const Emailer = () => {
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
				
					<Col md={10}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control 
								size="lg"
								type="email" 
								value={email} 
								onChange={(e) => setEmail(e.target.value)} 
								placeholder="Anna email saadaksesi lisätietoa palvelustamme" 
							/>
						
						</Form.Group>
					</Col>
					<Col md={2}>
						<Button size="lg" variant="primary" type="submit" onClick={(e) => sendEmail(e)}>Lähetä</Button>
					</Col>
				</CustomRow>
			
  );
}


export default Emailer;
