import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Container, Jumbotron, Alert } from 'react-bootstrap';
import axios from 'axios';
import Hero from '../Components/Hero'

const AlertStyled = styled.div`
	z-index: 10000;
	width: 100%;
`;
const Content = styled.div`
	height: calc(100% + 1000px);
`

const Home = () => {

	return (
		<Content>
			
			<Hero />
				<Container>
					<Alert variant="light">
						<Alert.Heading>Hei, tervetuloa Wenu palveluun!</Alert.Heading>
						<p>
							Kehitämme Wenu -palvelua parasta aikaa. Pyrimme aloittamaan ruokatoimitusten tekemisen vuoden 2021 alkupuolella.
						</p>
						<hr />
						<p className="mb-0">
						Mikäli kaipaat lisätietoja tai haluat Wenu palvelun käyttöön, ota yhteyttä! aleksanteri@helau.io
						</p>
					</Alert>
				</Container>
					
		</Content>
		
  );
}


export default Home;
