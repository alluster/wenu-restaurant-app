import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'

const TransportList = () => {
	const [items, setItems] = useState([])
	const [loading, setIsLoading] = useState(false)
	const GetOrders= async () => {
		setIsLoading(true)
		await axios.get('/api/getorders', {
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
		<Container>
				{
					!loading ? 
					
						items.slice(0).reverse().map((item, i) => {
							return(
								<Card key={i} style={{ width: '18rem' }}>
								<Card.Body>
								  <Card.Title>{item.item_name}</Card.Title>
								  <Card.Subtitle className="mb-2 text-muted">Id: {item.id}</Card.Subtitle>
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
								  <Card.Text>
									 	Ordered meal name:  {item.item_name}
								  </Card.Text>
								  <Card.Text>
									  Ordered meal id: {item.item_id}
								  </Card.Text>
								  <Card.Text>
									  Ordered meal address: {item.order_address}
								  </Card.Text>
								  <Button onClick={() => DeleteOrder(item.id)}>Tuote on kuljetettu asiakkaalle</Button>
								</Card.Body>
							  </Card>
			
			
							)
						})
					
					
					:
					<h1>Loading </h1>
				}
			
			
			
		</Container>
  );
}


export default TransportList;
