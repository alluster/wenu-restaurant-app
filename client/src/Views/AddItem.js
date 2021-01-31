import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, Container, Form, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

const CustomRow = styled.div `
	margin-top: 20px;
	margin-bottom: 20px;

`

const AddItem = (props) => {
	let history = useHistory();
	const { user } = useAuth0();
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [categories, setCategories] = useState([])
	const [selectedCategory, setSelectedCategory] = useState("Kategoria")
	const [loading, setIsLoading] = useState(false)
	const [category, setCategory] = useState("")
	const [show, setShow] = useState(false);
	const [allergens, setAllergens] = useState("")
	const [meatOrigin, setMeatOrigin] = useState("")

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	const GetCategories = async () => {
		await axios.get('/api/getcategories', {
			params: {
				restaurantId: user.sub
			}
		})
		.then(function (response) {
			let data = response.data
			setCategories(data)
	
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
	
		});
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			return await axios.get('/api/additem',  {
				params: {
					name: name,
					description: description,
					price: price,
					restaurantId: user.sub,
					category: selectedCategory,
					meatOrigin: meatOrigin,
					allergens: allergens
					
				}	
			})
		
			.then(alert("Tuote lisätty"), history.push('/itemslist'))
		} 
		catch (error) {
			console.error(error.message)
		}
	}
	const createCategory = async (e) => {
		e.preventDefault();
		try {
			return await axios.get('/api/addcategory',  {
				params: {
					category: category,
					restaurantId: user.sub	
				}	
			})
			.then(alert("Uusi kategoria lisätty"), setCategory(""))
		} 
		catch (error) {
			console.error(error.message)
		}
	}
	useEffect(() => {
		GetCategories()
	}, [])
	return (
		<Container>


			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>Luo uusi tuotekategoria</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Label>Kategorian nimi:</Form.Label>
					<Form.Control type="text" placeholder="Kategoria" value={category} onChange={(e) => setCategory(e.target.value)} />
				</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Peruuta
				</Button>
				<Button disabled={category.length <= 0} onClick={(e) => createCategory(e) && handleClose()}>Lisää kategoria</Button>

				</Modal.Footer>
			</Modal>
			<Form>	
				<DropdownButton id="dropdown-basic-button" title={selectedCategory}>
					{
						categories.map((item, i) => {
							return (
								<Dropdown.Item key={i} onClick={() => setSelectedCategory(item.category)}>{item.category}</Dropdown.Item>

							)
						})
					}
					<Dropdown.Divider />

					<Dropdown.Item variant="primary" onClick={handleShow}>
       			 		Luo uusi kategoria
      				</Dropdown.Item>
				</DropdownButton>
	
				
				
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Annoksen nimi</Form.Label>
					<Form.Control type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Annoksen kuvaus</Form.Label>
					<Form.Control type="text" placeholder="Kuvaus" value={description} onChange={(e) => setDescription(e.target.value)} />
				</Form.Group>
				<Form.Group >
					<Form.Label>Annoksen hinta / €</Form.Label>
					<Form.Control type="text" placeholder="Hinta" value={price} onChange={(e) => setPrice(e.target.value)} />
				</Form.Group>
				<Form.Group >
					<Form.Label>Annoksen allergeenit</Form.Label>
					<Form.Control type="text" placeholder="Allergeenit" value={allergens} onChange={(e) => setAllergens(e.target.value)} />
				</Form.Group>
				<Form.Group >
					<Form.Label>Lihan alkuperämaa</Form.Label>
					<Form.Control type="text" placeholder="Lihan alkuperämaa" value={meatOrigin} onChange={(e) => setMeatOrigin(e.target.value)} />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
					Lisää annos listalle
				</Button>
			</Form>
		</Container>
  );
}


export default withAuthenticationRequired(AddItem);
