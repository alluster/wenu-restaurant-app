
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Banner from './Banner';
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
					<div>
						{
							restaurants.map((item, i) => {
								return(

									<Banner className="mt-3" key={i} header={item.name} subheader={`${item.street_address}, ${item.postal_code}, ${item.city}`} content={item.description}>
											<Button href={`https://ruokalista-app.herokuapp.com/${item.restaurant_id}`} >Tutustu ruokalistaamme ja tilaa</Button> 
									</Banner>
									

								)
							})
						}
					</div>	

				)
			}
		</Container>
  );
}


export default RestaurantsList;
