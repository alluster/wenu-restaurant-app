import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Jumbotron, Alert, Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Hero from '../Components/Hero'
import Container from '../Components/Container'
import { useAuth0 } from "@auth0/auth0-react";


const Content = styled.div`
	height: calc(100% + 1000px);
`
const Image = styled.img `
position: relative;

	max-width: 100%;
	min-height: 200px;
	margin-top: -100px;
	margin-bottom: 50px;
	// transform: translate(0%, 30%);
	z-index: 1000;

`;
const ImageContainer = styled(Container)`
margin-top: 50px;
width: 100%;
`

const Restaurant = () => {
	const { user } = useAuth0();
	const [loading, setIsLoading] = useState(false);
	const [restaurant, setRestaurant] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState();
	const [streetAddress, setStreetAddress] = useState();
	const [postalCode, setPostalCode] = useState();
	const [city, setCity] = useState();
	const [description, setDescription] = useState();

	const [file, setFile] = useState();
	const [fileName, setFileName] = useState()
	const [uploadedFile, setUploadedFile] = useState({})

	const GetRestaurant = async () => {
		setIsLoading(true)
		await axios.get('/api/getrestaurant', {
			params: {
				restaurantId: user.sub
			}
		})
		.then(function (response) {
			let data = response.data[0]
			setRestaurant(data)
			setIsLoading(false)
			console.log(restaurant)
			setName(data.name)
			setStreetAddress(data.street_address)
			setEmail(data.email_address)
			setPostalCode(data.postal_code)
			setDescription(data.description)
			setCity(data.city)

		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
		});
	}
	const editRestaurant = async (e) => {
		setIsLoading(true)
		e.preventDefault();
			await axios.get('/api/editrestaurant',  {
				params: {
					name: name,
					description: description,
					streetAddress: streetAddress,
					postalCode: postalCode, 
					city: city,
					email: email,
					restaurantId: user.sub				}	
			})
		
		.then(alert("Ravintolan tiedot tallennettu"), GetRestaurant(), setIsLoading(false))
		 
		.catch(function (error) {
			console.log(error);
			setIsLoading(false)

		})
		.finally(function () {
			setIsLoading(false)
		});
	}

	const onFileChange = e => {
		setFile(e.target.files[0])
		setFileName(e.target.files[0].name)
	}
	const onFileSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		try {
			const res = await axios.post('/api/upload', formData, {
				headers: {
					'Content-type':'multipart/form-data'
				}
			});
			const { fileName, filePath } = res.data;
			setUploadedFile({ fileName, filePath })
		} catch(err) {
			if(err.response.status === 500) {
				console.log("There was a problem with the server")

			}else {
				console.log(err.response.data.msg)
			}

		}
	}
	useEffect(() => {
		GetRestaurant()
	}, [])
	return (
		<Content>
			<Container>
				<h3>Ravintolan tiedot</h3>
				<p>Voit tehdä muutoksia tietoihin. Muista tallentaa.</p>
				{
					loading ? <h1>Loading..</h1>
					:
				<Form>
			
					<Form.Row>
						<Form.Group as={Col} >
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Ravintolan nimi</Form.Label>
							<Form.Control type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)}/>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}  >
							<Form.Label>Ravintolan kuvaus</Form.Label>
							<Form.Control as="textarea" rows={3} type="text" placeholder="Kuvaus" value={description} onChange={(e) => setDescription(e.target.value)}/>
						</Form.Group>
					</Form.Row>

					<Form.Group >
						<Form.Label>Katuosoite</Form.Label>
						<Form.Control placeholder="Katuosoite" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
					</Form.Group>
					<Form.Row>

						<Form.Group as={Col} >
							<Form.Label>Postinumero</Form.Label>
							<Form.Control placeholder="Postinumero" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Kaupunki</Form.Label>
							<Form.Control placeholder="Kaupunki" value={city} onChange={(e) => setCity(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.File onChange={onFileChange} id="exampleFormControlFile1" label="Example file input" />
						</Form.Group>
						<Button variant="primary"  onClick={onFileSubmit}>
						Tallenna kuva
					</Button>
					</Form.Row>
					

				

					<Button variant="primary" type="submit" onClick={(e) => editRestaurant(e)}>
						Tallenna tiedot
					</Button>
					</Form>
					
				}
				
				{
						uploadedFile ? 
						<div>{
console.log(uploadedFile.filePath)}
						<img src={`.${uploadedFile.filePath}`} alt="image" />

						</div>
						
						 :
						 ""
					}
				</Container>
					
		</Content>
		
  );
}


export default Restaurant;
