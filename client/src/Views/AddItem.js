import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

const AddItem = (props) => {
	let history = useHistory();
	const { user } = useAuth0();
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			return await axios.get('/api/additem',  {
				params: {
					name: name,
					description: description,
					price: price,
					restaurantId: user.sub
					
				}	
			})
		
			.then(alert("Tuote lisätty"), history.push('/itemslist'))
		} 
		catch (error) {
			console.error(error.message)
		}
	}
	return (
		<Container>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Annoksen nimi</Form.Label>
					<Form.Control type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
						<Form.Text className="text-muted" >
							
						</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Annoksen kuvaus</Form.Label>
					<Form.Control type="text" placeholder="Kuvaus" value={description} onChange={(e) => setDescription(e.target.value)} />
					<Form.Text className="text-muted">
						
					</Form.Text>
				</Form.Group>
				<Form.Group >
					<Form.Label>Annoksen hinta / €</Form.Label>
					<Form.Control type="text" placeholder="Hinta" value={price} onChange={(e) => setPrice(e.target.value)} />
					<Form.Text className="text-muted">
						
					</Form.Text>
				</Form.Group>
			
				<Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
					Lisää annos listalle
				</Button>
			</Form>
		</Container>
  );
}


export default withAuthenticationRequired(AddItem);
