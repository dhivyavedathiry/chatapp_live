const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const fs = require('fs');



const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();



const sequelize = require('./util/database');

const User = require('./models/users');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

// Serve static files from the same directory as the server
app.use(express.static(path.join(__dirname, 'public')));


// Define a route to serve your HTML file

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'signup.html'));
});



const userRoute = require('./routes/userroute.js');




app.use( userRoute);




sequelize.sync()

  .catch(err => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000, () => console.log('app running in localhost:3000')); // Start the server
