
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'

import { Navbar, Nav, Card, Accordion, Col,Button, Row, Alert} from 'react-bootstrap';
import Container from './Container'



const RestaurantsList = () => {
	const [ restaurants, setRestaurants ] = useState([])
	const [loading, setIsLoading] = useState()
	const GetRestaurants = async () => {
		setIsLoading(true)
		await axios.get('/api/getrestaurants', {
			// params: {
			// 	restaurantId: user.sub
			// }
		})
		.then(function (response) {
			let data = response.data
			setRestaurants(data)
			setIsLoading(false)


		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
		});
	}

	useEffect(() => {
		GetRestaurants()
	}, [])

	return (
		<Container>
			
			{
				loading ?
				<h4>Loading</h4>:
				(
					
				restaurants.map((item, i) => {
					return(
						<Col md={4}>

						<Card key={i} >
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">{item.street_address} {item.city}</Card.Subtitle>
								<Card.Text>
								{item.description}
								</Card.Text>
									<Button href={`https://ruokalista-app.herokuapp.com/${item.restaurant_id}`} >Tutustu ruokalistaamme ja tilaa</Button> 
							</Card.Body>
							</Card>
							</Col>

					)
				})
				)
			}
		</Container>
  );
}


export default RestaurantsList;
