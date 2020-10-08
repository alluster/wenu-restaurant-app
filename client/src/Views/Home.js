import React from 'react';
import { Table, Container, Jumbotron } from 'react-bootstrap';


const ItemsList = () => {
	return (
		<Container>
		<Jumbotron> 
			<h1>Restaurant order management</h1>
			<h3>Manage your restaurants products in the "Ménu" section. In "Transportation" view you can manage orders made by customers.</h3>
			<h1>Add a new meal to your menu from "Add New Menu Item</h1>
			<h2>Enjoy!</h2>
		</Jumbotron>
		</Container>
  );
}


export default ItemsList;
