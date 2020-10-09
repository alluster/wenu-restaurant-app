import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const AddItem = (props) => {
	let history = useHistory();

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
					price: price
					
				}	
			})
		
			.then(alert("Tuote lisätty"), history.push.push('/itemslist'))
		} 
		catch (error) {
			console.error(error.message)
		}
	}
	return (
		<Container>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Meal name</Form.Label>
					<Form.Control type="text" placeholder="Enter meal name" value={name} onChange={(e) => setName(e.target.value)} />
						<Form.Text className="text-muted" >
							Make it tasty!
						</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Meal Description</Form.Label>
					<Form.Control type="text" placeholder="Enter meal description" value={description} onChange={(e) => setDescription(e.target.value)} />
					<Form.Text className="text-muted">
						Rock my world!
					</Form.Text>
				</Form.Group>
				<Form.Group >
					<Form.Label>Meal price in €</Form.Label>
					<Form.Control type="text" placeholder="Enter meal price" value={price} onChange={(e) => setPrice(e.target.value)} />
					<Form.Text className="text-muted">
						Make them pay!
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Add item to menu" />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
					Submit
				</Button>
			</Form>
		</Container>
  );
}


export default AddItem;
