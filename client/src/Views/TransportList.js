import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Form, FormControl, Button, Accordion, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import Timestamp from 'react-timestamp';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import OrderState from '../Components/orderState';
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth0 } from "@auth0/auth0-react";

const State = styled.div`
  height: 60px;
  border: 0.5px #000 solid;
  border-radius: 4px;
  padding-left: 10px; 
  padding-right: 20px; 
  width: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`


const TransportList = () => {
	const { user } = useAuth0();
	const [items, setItems] = useState([])
	const [loading, setIsLoading] = useState(false)
	const [recieved, setRecieved] = useState(true);
	const [prepared, setPrepared] = useState(true);
	const [inDelivery, setInDelivery] = useState(true);
	const [delivered, setDelivered] = useState(true);

	const GetOrders = async () => {
		setIsLoading(true)
		await setInterval(() => {
			axios.get(`/api/getorders`, {
				params: {
					restaurantId: user.sub
				}
				})
				.then(function (response) {
					let data = response.data
					setItems(data)
					setIsLoading(false)
					console.log(response)
			
				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {
					setIsLoading(false)
			
				});
		  	}, 10000);

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
	
	const orderRecieved = async (id) => {
		await axios.get(`/api/orderrecieved`, {
			params: {
				fieldState: recieved ? 1 : 0 ,
				orderId: id
			}
		})
		.then(function (response) {
			GetOrders()
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
	
		});
	
	}
	const orderPrepared = async (id) => {
		await axios.get(`/api/orderprepared`, {
			params: {
				fieldState: prepared ? 1 : 0 ,
				orderId: id
			}
		})
		.then(function (response) {
			GetOrders()
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
		});
	}
	const OrderInDelivery = async (id) => {
		await axios.get(`/api/orderindelivery`, {
			params: {
				fieldState: inDelivery ? 1 : 0 ,
				orderId: id
			}
		})
		.then(function (response) {
			GetOrders()
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
		});
	}
	const OrderDelivered = async (id) => {
		await axios.get(`/api/orderdelivered`, {
			params: {
				fieldState: delivered ? 1 : 0 ,
				orderId: id
			}
		})
		.then(function (response) {
			GetOrders()
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
		});
	}
	useEffect(() => {
		GetOrders()
		console.log(items)
	}, [])


	return (
		<Container style={{minHeight: "100vh"}}>
			{
				!items.length > 0 && !loading ? <h1>Ei tilauksia</h1> : ""
			}
				<Accordion  >

				{
					!loading ? 

						items.slice(0).reverse().map((item, i) => {
							return(
								
								<Card key={i}>
								<Card.Header>
								  <Accordion.Toggle as={Button} variant="link" eventKey={`${i}`}>
								 <Row>
								 <Col xs="auto"> <span>{item.item_name}</span>
								  </Col>

									<Col xs="auto">
										<Form.Label htmlFor="inlineFormInputGroup" srOnly>
										</Form.Label>
										<InputGroup className="mb-2">
											<InputGroup.Prepend>
											<InputGroup.Text>Tilaus saapunut</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl id="inlineFormInputGroup" placeholder={item.order_paid}
									/>
										</InputGroup>
										</Col>
								 </Row>
								

								  </Accordion.Toggle >
								</Card.Header>
								<Accordion.Collapse eventKey={`${i}`} >
								  <Card.Body>
								  <Row>			
									<Col sm>
									<State>
											<Form.Check
												type="checkbox"
												id="recieved"							
												label="Tilaus saapunut keittiöön"
												custom
												checked={item.order_recieved}
												onChange={() => {
													setRecieved(!recieved)
													orderRecieved(item.order_id)
												}
												}
											/>
										</State>

									</Col>
									<Col sm>
									<State>
											<Form.Check
												type="checkbox"
												id="prepared"							
												label="Tilaus valmis toimitettavaksi"
												custom
												checked={item.order_prepared}
												onChange={() => {
													setPrepared(!prepared)
													orderPrepared(item.order_id)
												}
												}
											/>
										</State>

									</Col>

									</Row>
							 	<Form>
									<Form.Row>
										<Form.Group  as={Col} md="6" controlId="validationCustom01">
											<Form.Label>Tilauksen saapumisaika</Form.Label>
											<Form.Control
												required
												disabled
												type="text"
												placeholder="Tilauksen saapumisaika"
												defaultValue={item.order_paid}
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
									<h4>Kuljettaja täyttää:</h4>
									<Row>			
									<Col sm>
									<State>
											<Form.Check
												type="checkbox"
												id="in_delivery"							
												label="Tilaus kuljetuksessa"
												custom
												checked={item.order_in_delivery}
												onChange={() => {
													setInDelivery(!inDelivery)
													OrderInDelivery(item.order_id)
												}
												}
											/>
										</State>

									</Col>
									<Col sm>
									<State>
											<Form.Check
												type="checkbox"
												id="delivered"							
												label="Tilaus toimitettu asiakkaalle"
												custom
												checked={item.order_delivered}
												onChange={() => {
													setDelivered(!delivered)
													OrderDelivered(item.order_id)
												}
												}
											/>
										</State>

									</Col>

									</Row>
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
											<Form.Control type="text" disabled placeholder="Katuosoite" required defaultValue={item.customer_street} />
										</Form.Group>
										<Form.Group as={Col} md="3" >
											<Form.Label>Postinumero</Form.Label>
											<Form.Control type="text" disabled placeholder="Katuosoite" required defaultValue={item.customer_postal_code} />
										</Form.Group>
										<Form.Group as={Col} md="3" >
											<Form.Label>Kaupunki</Form.Label>
											<Form.Control type="text" disabled placeholder="Kaupunki" required defaultValue={item.customer_city}/>
										</Form.Group>
										<Form.Group as={Col} md="12" >
											<Form.Label>Lisätiedot keittiölle</Form.Label>
											<Form.Control type="textarea" disabled placeholder="Lisätiedot kuljettajalle" required defaultValue={item.comments_kitchen}/>
										</Form.Group>
										<Form.Group as={Col} md="12" >
											<Form.Label>Lisätiedot kuljettajalle</Form.Label>
											<Form.Control type="textarea" disabled placeholder="Lisätiedot kuljettajalle" required defaultValue={item.comments_transport}/>
										</Form.Group>
									</Form.Row>
									
									</Form>
								
							 	
							  <Button onClick={() => DeleteOrder(item.id)}>Tilaus on kuljetettu asiakkaalle</Button>
								  </Card.Body>
								</Accordion.Collapse>
							  </Card>

						
			
			
							)
						})
					
					:
					
					<div style={{width: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: '100px'}}>
						<ClipLoader   size={40} />					
					</div>

				}
			
			
			</Accordion>

		</Container>
  );
}


export default withAuthenticationRequired(TransportList);
