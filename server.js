require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const SQL = require('sql-template-strings')
const sslRedirect = require('heroku-ssl-redirect');
var twilio = require('twilio');
const bodyParser = require('body-parser')
const path = require('path')
const crypto = require('crypto');
const fetch = require('node-fetch');

app.use(sslRedirect());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
const pool = mysql.createPool({
	host: process.env.REACT_APP_DATABASE_HOST,
	user: process.env.REACT_APP_DATABASE_USERNAME,
	password: process.env.REACT_APP_DATABASE_PASSWORD,
	database: process.env.REACT_APP_DATABASE
});
 

var accountSid = 'ACff430f1198ce10a3b4c9f8e2dea00ad2'; // Your Account SID from www.twilio.com/console
var authToken = '479dc8bd74671334d95494b71b0c3dc2';   // Your Auth Token from www.twilio.com/console

// var twilio = require('twilio');
// var client = new twilio(accountSid, authToken);

// client.messages.create({
//     body: 'Uusi ruokatilaus saapunut. Ole hyvä ja siirry https://www.wenu.fi/transportlist',
//     to: '+358442360304',  // Text this number
//     from: '+15012984927' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));

app.get('/api/additem', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`INSERT INTO items (name, description, price) VALUES (${req.query.name}, ${req.query.description},${req.query.price})`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})
app.get('/api/deleteitem/:id', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`DELETE FROM items WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});

})
app.get('/api/getitem/:id', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM items WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
})
app.get('/api/getitems', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM items`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
})
app.get('/api/getorders', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM orders`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
})
app.get('/api/deleteorder/:id', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`DELETE FROM orders WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});

})
app.get('/api/orderrecieved/:id', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`UPDATE orders SET recieved = !recieved WHERE id =${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});

})

app.get('/api/ordertransportation/:id', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`DELETE FROM orders WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});

})
app.get('/api/orderpreparation/:id', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`DELETE FROM orders WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});

})
app.get('/api/orderfalied/:id', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`DELETE FROM orders WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});

})



// OP Checkout test



app.get('/api/getpaymentmethods', (req, res) => {
	const ACCOUNT = '375917';
	const SECRET = 'SAIPPUAKAUPPIAS';
	
	const calculateHmac = (secret, params, body) => {
		const hmacPayload =
		Object.keys(params)
			.sort()
			.map((key) => [ key, params[key] ].join(':'))
			.concat(body ? JSON.stringify(body) : '')
			.join("\n");
	
		return crypto
		.createHmac('sha256', secret)
		.update(hmacPayload)
		.digest('hex');
	};

	const headers = {
		'checkout-account': ACCOUNT,
		'checkout-algorithm': 'sha256',
		'checkout-method': 'GET',
		'checkout-nonce': '564635208570151',
		'checkout-timestamp': '2018-07-06T10:01:31.904Z'
	};
	
	const body = {
		stamp: 'unique-identifier-for-merchant',
		reference: '3759170',
		amount: 1525,
		currency: 'EUR',
		language:'FI',
		items: [
			{
				unitPrice: 1525,
				units: 1,
				vatPercentage: 24,
				productCode: '#1234',
				deliveryDate: '2018-09-01'
			}
		],
		customer: {
			email: 'test.customer@example.com'
		},
		redirectUrls: {
			success: 'https://ecom.example.com/cart/success',
			cancel: 'https://ecom.example.com/cart/cancel'
		}
	};
	
	// Expected HMAC: 3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6
	// res.send(calculateHmac(SECRET, headers))
	const getpaymentmethods = () => {
		const headers = {
			'checkout-account': '375917',
			'checkout-algorithm': 'sha256',
			'checkout-method': 'GET',
			'checkout-nonce': '564635208570151',
			'checkout-timestamp': '2018-07-06T10:01:31.904Z'
		};
		fetch('https://api.checkout.fi/merchants/payment-providers?groups=mobile,creditcard', {
			method: 'get',
			headers: headers
			.then(res => res.json())
			.then(console.log('json'))
		})
	}
		getpaymentmethods()
});
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));

