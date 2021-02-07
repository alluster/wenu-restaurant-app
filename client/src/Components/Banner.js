
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
	object-position: 50% 50%;
	height: 700px;
	background-repeat: no-repeat;
	background-size: cover;
	width: auto;
	background-image: url(/eating.jpeg);

	@media (max-width: 768px) {
		height: 200px;

	}

`



const Banner = (props) => {

	return (
			<Card className={props.className}>
				<TextContainer>
					<h1>{props.header}</h1>
					<h3 className='mt-3' >{props.subheader}</h3>
					<p className='mt-3'>
					{props.content}
					</p>
					{props.children}
				</TextContainer>
				<ImageContainer />
			</Card>
			
				
  );
}


export default Banner;
