
import React, { useState } from 'react';
import styled from 'styled-components'
import { Jumbotron, Container, Media } from 'react-bootstrap';
import { Children } from 'react';


const Content = styled.div `
	margin-left: auto;
	margin-right: auto;
	max-width: 1200px;
	padding-left: 15px;
	padding-right: 15px;


`;
const Card = styled.div`
	display: flex;
	flex-direction: row;
	height: auto;
	width: 100%;
	background-color: white;
	@media (max-width: 768px) {
		flex-direction: column;

	}
	


`
const TextContainer = styled.div`
	padding: 30px;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;

`


const ImageContainer = styled.div`
	flex: 1;
	background-position: center;
	height: auto;
	min-height: 300px;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	background-image: ${props => `url(${props.image})`};

	@media (max-width: 768px) {
		height: 200px;

	}

`



const Banner = (props) => {
	const buffer = props.image || []
	const b64 = new Buffer.from(buffer).toString('base64')
	const mimeType = "image/jpeg"
	return (
		<Card className={props.className}>
			<TextContainer>
				<h1>{props.heading}</h1>
				<h3 className='mt-3' >{props.subheading}</h3>
				<p className='mt-3'>
					{props.content}
				</p>
				{props.children}
			</TextContainer>
			{
				props.image ?
				<ImageContainer image={`data:${mimeType};base64,${b64}`}/>
				:
				<p>loading image</p>
			}
		</Card>
			
				
  );
}


export default Banner;
