import React, { useState } from 'react';
import { Navbar, Nav, Container, Card, Accordion, } from 'react-bootstrap';
import {
	Link
  } from "react-router-dom";

const Order = (props) => {

	return (
		<Card>
		<Card.Header>
		  <Accordion.Toggle as={Button} variant="link" eventKey={props.eventKey}>
			Click me!
		  </Accordion.Toggle>
		</Card.Header>
		<Accordion.Collapse eventKey={props.eventKey} >
		  <Card.Body>Hello! I'm the body</Card.Body>
		</Accordion.Collapse>
	  </Card>
  );
}


export default Order;
