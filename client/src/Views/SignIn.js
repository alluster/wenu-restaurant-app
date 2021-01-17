import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import {firebase} from './../firebase';



    


const Input = styled.input`
	padding: 10px; 
	width: 90%;
	margin-top: 20px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background-color: white;
	:focus {
		border-color:#333;
	}
	::placeholder {
		font-size: 10px;
		font-weight: 400;
	}
	
		
	}`

const SubmitButton = styled.button `
	background-color: blue;
	color: white;
	-webkit-text-fill-color: white;
	height: 40px; border-radius: 20px;
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	font-size: 20px;
	padding-left: auto;
	padding-right: auto;
	margin-top: 50px;
	width: 500px;
	@media (max-width: 700px) {
		width: 100%;
    }
`;


const SignIn = (props) => {

	const login = async (email, password) =>  { try {
		 
		await firebase.signInWithEmailAndPassword(email, password) 
		await setUserEmail(firebase.currentUser.email)
		await setUserId(firebase.currentUser.uid)
		}catch(error){
			setError(error.message)
		}
	}	
	
	const history = useHistory();

	const initialState = {
		email: "",
		password: ""
	}
	const [	error, setError	] = useState("")
	const [ userEmail, setUserEmail ] = useState("")
	const [ userId, setUserId ] = useState("")


	const [{ password, email }, setState] = useState(initialState);
	const inputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};
	const clearState = () => {
		setState({ ...initialState });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(email, password)
			clearState()
			history.push("/profile");

		}catch(error) {
			setError(error.message)
		}

		}
	
	useEffect(() => {
		// if(context.user.email) history.push("/profile")
	},[])
	return(

		<div >
			<h1>Kirjaudu sisään</h1>
			
				<form  onSubmit={e => handleSubmit(e)}>
					<Input placeholder="Email" name="email" value={email} onChange={inputChange} type="text" />
					<Input placeholder="Salasana" name="password" value={password} onChange={inputChange} type="text" />	
					<SubmitButton type="submit">Kirjaudu sisään</SubmitButton>
					<p>{error}</p>

				</form>
        </div>
    )
}

export default SignIn;
