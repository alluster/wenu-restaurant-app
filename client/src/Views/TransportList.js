import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Button, Accordion, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios'

const TransportList = () => {
	const [items, setItems] = useState([])
	const [loading, setIsLoading] = useState(false)
	const GetOrders = async () => {
		setIsLoading(true)

		await setInterval(() => {
			 axios.get('/api/getorders', {
			})
			.then(function (response) {
				let data = response.data
				setItems(data)
				setIsLoading(false)
		
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				setIsLoading(false)
		
			});
		  }, 3000);

	}
	const DeleteOrder = async ( id ) => {
		setIsLoading(true)
		await axios.get(`/api/deleteorder/${id}`, {
	
		})
		.then(
			alert("Tilaus poistettu"),
		
		)
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			GetOrders()
			setIsLoading(false)
		});
	}
	const OrderRecieved= async (id) => {
		await axios.get(`/api/orderrecieved/${id}`, {
		})
		.then(function (response) {
			GetOrders()
	
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
	
		});
	}
		
	
	useEffect(() => {
		GetOrders()
		
	}, [])
	return (
		<Container style={{minHeight: "100vh"}}>
								<Accordion  >

				{
					!loading ? 

						items.slice(0).reverse().map((item, i) => {
							return(
								
								<Card key={i}>
								<Card.Header>
								  <Accordion.Toggle as={Button} variant="link" eventKey={`${i}`}>
									{item.item_name}
								  </Accordion.Toggle >
								</Card.Header>
								<Accordion.Collapse eventKey={`${i}`} >
								  <Card.Body>

								  <Form.Check
										type="checkbox"
										id={item.id + 'recieved'}
										label="Order recieved"
										checked={item.recieved}
										onChange={() => OrderRecieved(item.id)}
									/>
								 	<Form.Check
										type="checkbox"
										id="prepared"
										label="Order prepared"
										custom
									/>
								   <Form.Check
										type="checkbox"
										id="paid"
										label="Order paid"
										custom
									/>
									<Form.Check
										type="checkbox"
										id="delivered"
										label="Order delivered"
										custom
									/>
							 	<Form>
									<Form.Row>
										<Form.Group  as={Col} md="6" controlId="validationCustom01">
											<Form.Label>Tilauksen saapumisaika</Form.Label>
											<Form.Control
												required
												disabled
												type="text"
												placeholder="Tilauksen saapumisaika"
												defaultValue=""
											/>
										</Form.Group>
										<Form.Group as={Col} md="6" controlId="validationCustom02">
											<Form.Label>Tilaus valmis kuljetettavaksi</Form.Label>
											<Form.Control
												
												type="text"
												placeholder="Klo"
												defaultValue=""
											/>
										</Form.Group>
									
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col} md="6" controlId="validationCustom03">
											<Form.Label>Tilaus perillä noin</Form.Label>
											<Form.Control type="text" placeholder="Klo" required />
											<Form.Control.Feedback type="invalid">
												Anna toimitusaika
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group as={Col} md="3" >
											<Form.Label>Katuosoite</Form.Label>
											<Form.Control type="text" disabled placeholder="Katuosoite" required defaultValue={item.order_address} />
										</Form.Group>
										<Form.Group as={Col} md="3" >
											<Form.Label>Kaupunki</Form.Label>
											<Form.Control type="text" disabled placeholder="Kaupunki" required />
										</Form.Group>
										<Form.Group as={Col} md="3" >
											<Form.Label>Postinumero</Form.Label>
											<Form.Control type="text" disabled placeholder="Postinumero" required />
										</Form.Group>
										<Form.Group as={Col} md="12" >
											<Form.Label>Lisätiedot kuljettajalle</Form.Label>
											<Form.Control type="textarea" disabled placeholder="Lisätiedot kuljettajalle" required />
										</Form.Group>
									</Form.Row>
									
									</Form>
								
							 	
							  <Button onClick={() => DeleteOrder(item.id)}>Tuote on kuljetettu asiakkaalle</Button>
								  </Card.Body>
								</Accordion.Collapse>
							  </Card>

						
			
			
							)
						})
					
					:
					<h1>Loading </h1>
				}
			
			
			</Accordion>

		</Container>
  );
}


export default TransportList;
