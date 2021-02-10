import React, { useState, setState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import {
	Link
  } from "react-router-dom";

const State = styled.div`
  height: 60px;
  border: 0.5px #000 solid;
  border-radius: 4px;
  padding-left: 10px; 
  padding-right: 20px; 
  width: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`


const OrderState = (props) => {

	const [checked, setChecked] = useState(props.orderRecieved);

	const orderRecievedFieldName = 'order_recieved'
	const handleChange = async () => {
		await axios.get(`/api/orderstate`, {
			params: {
				fieldName: orderRecievedFieldName,
				fieldState: checked,
				orderId: props.orderId
			}
		})
		.then(function (response) {
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
	
		});
	
	}
	useEffect(() => {
	}, []);

	return (
		<div>
			<Row>

				<Col sm>
				<State>
						<Form.Check
							type="checkbox"
							id={props.orderId}							
							label="Tilaus saapunut keittiöön"
							custom
							checked={checked}
							onChange={() => {
								setChecked(!checked)
								handleChange()
							}
							}
						/>
					</State>
				
				</Col>
				
		
	 		 </Row>
	  </div>

		
		
  );
}


export default OrderState;
