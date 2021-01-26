import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Alert, Row } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import ReactCodeSinppet from 'react-code-snippet'

const ItemsList = (props) => {
	let history = useHistory();
	const { user } = useAuth0();
	const [items, setItems] = useState([])
	const [loading, setIsLoading] = useState(false)

	const GetItems = async () => {
		setIsLoading(true)
		await axios.get('/api/getitems', {
			params: {
				restaurantId: user.sub
			}
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
	const DeleteItem = async ( id ) => {
		setIsLoading(true)
		await axios.get(`/api/deleteitem/${id}`, {
	
		})
		.then(
			alert("Tuote poistettu"),
			GetItems()
		)
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
			GetItems()
		});
	}
	useEffect(() => {
		GetItems()
		console.log(items)
	}, [])
	return (
		<Container style={{minHeight: "100vh"}}>
			<Button onClick={() => history.push('/additem')}>Lisää uusi tuote</Button>
				{
					!loading ? 
					
						items.map((item, i) => {
							return(
								<Card key={i} style={{ width: '18rem' }}>
								<Card.Body>
								  <Card.Title>{item.name}</Card.Title>
								  <Card.Subtitle className="mb-2 text-muted">Id: {item.id}</Card.Subtitle>
								  <Card.Text>
									{item.description}
								  </Card.Text>
								  <Card.Text>
									{item.price}
								  </Card.Text>
								  <Button variant="warning" onClick={() => DeleteItem(item.id)}>Poista listalta</Button>
								 
								</Card.Body>
							  </Card>
			
			
							)
						})
					
					
					:
					<h1>Loading </h1>
				}
	
					<Alert variant="dark">
						Voit käydä katsomassa miltä ruokalistasi 
						<Alert.Link target="blank" href={`https://ruokalista-app.herokuapp.com/${user.sub}`}> näyttää</Alert.Link>
					</Alert>
			
				<Alert variant="dark">
				<p>Kopioi tämä koodi kotisivuillesi saadaksesi ruokalistasi näkyviin:</p>
					<ReactCodeSinppet lang="html" code={`<iframe src="https://ruokalista-app.herokuapp.com/${user.sub}" style="height:1000px;width:100%;border:none" >
					</iframe>`}>
					</ReactCodeSinppet>
  				</Alert>
		</Container>
  );
}


export default withAuthenticationRequired(ItemsList);
