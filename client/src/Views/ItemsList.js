import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Card, Container, Button, Alert, CardDeck, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import ReactCodeSinppet from 'react-code-snippet'

const CustomRow = styled.div `
margin-top: 20px;
margin-bottom: 20px;

`
const ItemsList = () => {
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
	}, [])
	return (
		<Container style={{minHeight: "100vh"}}>
			<CustomRow>
				<Button  onClick={() => history.push('/additem')}>Lisää ruokalistalle uusi tuote</Button>
			</CustomRow>
			
			
			{
				!loading ? 
				<Row>

					{
						items.map((item, i) => {
							return(
								<Col lg={4} >
								
									<Card key={i} >
										<Card.Body>
											<Card.Title>
												<Card.Subtitle className="mb-1 text-muted">Annoksen nimi:</Card.Subtitle> 
												{item.name}
											</Card.Title>
											<Card.Text>
												<Card.Subtitle className="mb-1 text-muted">Kuvaus:</Card.Subtitle> 
												{item.description}
											</Card.Text>
											<Card.Text>
												<Card.Subtitle className="mb-1 text-muted">Kategoria:</Card.Subtitle> 
												{item.category}
											</Card.Text>
											<Card.Text>
												<Card.Subtitle className="mb-1 text-muted">Hinta sis alv.:</Card.Subtitle> 
												{item.price}
											</Card.Text>
											<Card.Text>
												<Card.Subtitle className="mb-1 text-muted">Allergeenit:</Card.Subtitle> 
												{item.allergens}
											</Card.Text>
											<Card.Text>
												<Card.Subtitle className="mb-1 text-muted">Lihan alkuperämaa:</Card.Subtitle> 
												{item.meat_origin}
											</Card.Text>									

					
											<Button variant="warning" onClick={() => DeleteItem(item.id)}>Poista listalta</Button>
										</Card.Body>
									</Card>
								</Col>

			
							)
						})
					}
				</Row>
				:
				<h1	h1>Loading </h1>
			}

			<Alert variant="ligh">
				Esikatsele ruokalistaasi 
				<Alert.Link target="blank" href={`https://ruokalista-app.herokuapp.com/${user.sub}`}> Esikatsele</Alert.Link>
			</Alert>
			
			<Alert variant="light">
				<p>Kopioi tämä koodi kotisivuillesi saadaksesi ruokalistasi näkyviin:</p>
				<ReactCodeSinppet lang="html" code={`<iframe src="https://ruokalista-app.herokuapp.com/${user.sub}" style="height:1000px;width:100%; border:none" ></iframe>`}>
				</ReactCodeSinppet>
			</Alert>
		</Container>
  );
}


export default withAuthenticationRequired(ItemsList);
