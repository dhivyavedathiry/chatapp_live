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
const Message =require('./models/messages');

const Group =require('./models/Groups');

const Groupmember=require('./models/groupmembers');


app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true
}));



app.use(bodyParser.json());
app.use(express.json())

// Serve static files from the same directory as the server
app.use(express.static(path.join(__dirname, 'public')));


// Define a route to serve your HTML file

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'signup.html'));
});



const userRoute = require('./routes/userroute.js');
const messageRoute = require('./routes/messageroute.js');

app.use( userRoute);
app.use(messageRoute);


User.hasMany(Message);
Message.belongsTo(User , { constraints: true });


User.belongsToMany(Group, { through: Groupmember });
Group.belongsToMany(User, { through: Groupmember });
Group.belongsTo(User)
Group.hasMany(Message);
Message.belongsTo(Group);


sequelize.sync()

  .catch(err => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000, () => console.log('app running in localhost:3000')); // Start the server
