const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
/*
commandline setup: 
npm init -y
npm install mongoose express dotenv
npm install cors
nodemon server.js
*/

const port = process.env.PORT;

require('./config/mongoose.config');

app.use(cors(), express.json(), express.urlencoded({extended: true}));


const StoreRoutes = require('./routes/store.routes');
StoreRoutes(app);







app.listen( port, () => console.log(`Listening on port: ${port}`) );
