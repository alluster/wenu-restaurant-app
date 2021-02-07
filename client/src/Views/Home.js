import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import Hero from '../Components/Hero';
import RestaurantsList from '../Components/RestaurantsList';

const AlertStyled = styled.div`
	z-index: 10000;
	width: 100%;
	position: relative;

`;
const Content = styled.div`
	height: calc(100% + 1000px);

`
const Image = styled.img `
	position: relative;
	max-width: 100%;
	min-height: 200px;
	margin-bottom: 50px;
	// transform: translate(0%, 30%);
	z-index: 1000;

`;
const ImageContainer = styled.div`
	width: 100%;
	text-align: center;

`

const Home = () => {

	return (
		<Content>
			<Hero />
			<ImageContainer>
				<Image src="/map.png" />
			</ImageContainer>	
			<RestaurantsList />				
		</Content>
		
  );
}


export default Home;
