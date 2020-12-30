
import React, { useState } from 'react';
import styled from 'styled-components'


const Content = styled.div `
	margin-left: auto;
	margin-right: auto;
	max-width: 1200px;
	padding-left: 15px;
	padding-right: 15px;


`;



const Container = ({children}) => {

	return (
		<Content >
			
			{children}
				
		</Content>
  );
}


export default Container;
