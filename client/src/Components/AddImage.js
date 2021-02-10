
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Banner from './Banner';
import { Navbar, Nav, Card, Accordion, Col,Button, Row, Alert, Form} from 'react-bootstrap';
import Container from './Container'



const CustomRow = styled(Row) `
	margin-top: 50px;
	padding-left: 20px;
	@media (max-width: 768px) {
		margin-top: 80px;

	}`


const AddImage = props => {

	const [file, setFile] = useState();
	const [fileName, setFileName] = useState()
	const [uploadedFile, setUploadedFile] = useState({})
	const [imageBlob, setImageBlob] = useState()
	const [imageUrl, setImageUrl] = useState()
	const [loading, setIsLoading] = useState(false);




	const onFileChange = e => {
		setFile(e.target.files[0])
		setFileName(e.target.files[0].name)

	}
	const onFileSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		try {
			await axios.post('/api/upload', formData, {
				headers: {
					'Content-type':'multipart/form-data',
					'restaurantid': props.id
				}
			});

		} catch(err) {
			if(err.response.status === 500) {
				console.log("There was a problem with the server")

			}else {
				console.log(err.response.data.msg)
			}

		}
	}

	useEffect(() => {
	}, [])
	return (
		<CustomRow>

			<Form.Row>
				<Form.File
					type="file"
					id="imageupload"
					onChange={onFileChange}  
					label="Vaihda tai lisää uusi kuva" 
				/>
				<Button type="button"  onClick={onFileSubmit}>
					Tallenna kuva
				</Button>
			</Form.Row>	
		</CustomRow>

  );
}


export default AddImage;
