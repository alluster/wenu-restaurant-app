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
var nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');

app.use(sslRedirect());
app.use(fileUpload());
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


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: process.env.REACT_APP_EMAIL,
	  pass: process.env.REACT_APP_EMAIL_PASSWORD
	}
  });

  app.get('/api/sendemail', (req, res) => {
	var mailOptions = {
		from: process.env.REACT_APP_EMAIL,
		to: process.env.REACT_APP_EMAIL,
		subject: 'Haluaisin tietää lisää Wenu palvelustanne',
		text: `${req.query.email}`
	  };
  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
	  console.log(error);
	} else {
	  console.log('Email sent: ' + info.response);
	}
  });
  })
// var twilio = require('twilio');
// var client = new twilio(accountSid, authToken);

// client.messages.create({
//     body: 'Uusi ruokatilaus saapunut. Ole hyvä ja siirry https://www.wenu.fi/transportlist',
//     to: '+358442360304',  // Text this number
//     from: '+15012984927' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));
app.post('/api/upload', (req, res) => {
	if(req.files === null) {
		return res.status(400).json({msg: "No file uploaded"})
	}
	const file = req.files.file;
	file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
		if(err) {
			console.error(err);
			return res.status(500).send(err);
		}
		res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
		})
	})


app.get('/api/additem', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`INSERT INTO items (name, description, price, restaurant_id, category, meat_origin, allergens) VALUES (${req.query.name},${req.query.description},${req.query.price},${req.query.restaurantId}, ${req.query.category}, ${req.query.meatOrigin}, ${req.query.allergens})`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})
app.get('/api/addcategory', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`INSERT INTO categories (category, restaurant_id) VALUES (${req.query.category},${req.query.restaurantId})`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})
app.get('/api/orderrecieved', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`UPDATE orders SET order_recieved=${req.query.fieldState} WHERE order_id=${req.query.orderId}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})
app.get('/api/orderprepared', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`UPDATE orders SET order_prepared=${req.query.fieldState} WHERE order_id=${req.query.orderId}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})
app.get('/api/orderindelivery', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`UPDATE orders SET order_in_delivery=${req.query.fieldState} WHERE order_id=${req.query.orderId}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})
app.get('/api/orderdelivered', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`UPDATE orders SET order_delivered=${req.query.fieldState} WHERE order_id=${req.query.orderId}`
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
		query = SQL`SELECT * FROM items WHERE restaurant_id=${req.query.restaurantId}`
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
app.get('/api/getcategories', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM categories WHERE restaurant_id=${req.query.restaurantId}`
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
		query = SQL`SELECT * FROM orders WHERE restaurant_id=${req.query.restaurantId}` 
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



app.get('/api/getrestaurant', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM restaurants WHERE restaurant_id=${req.query.restaurantId}`
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
app.get('/api/getrestaurants', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM restaurants `
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
app.get('/api/editrestaurant', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`UPDATE restaurants SET name=${req.query.name}, description=${req.query.description}, email_address=${req.query.email}, street_address=${req.query.streetAddress}, postal_code=${req.query.postalCode}, city=${req.query.city} WHERE restaurant_id=${req.query.restaurantId}`
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
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));

