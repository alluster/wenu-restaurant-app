import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Jumbotron, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import Hero from '../Components/Hero'
import Container from '../Components/Container'


const AlertStyled = styled.div`
	z-index: 10000;
	width: 100%;
	postion: relative;
`;
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

const Home = () => {

	return (
		<Content>
			
			<Hero />
			<ImageContainer>
						<Image src="/app.png" />

			</ImageContainer>
				<Container>

					
				</Container>
					
		</Content>
		
  );
}


export default Home;
