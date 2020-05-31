const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Create Express Server 
const app = express();
const port = 4000;  

// Middleware
// allows us to parse JSON because our server is sending and receiving JSON
app.use(cors());
app.use(express.urlencoded( {extended: true}));
app.use(express.json());

// Test in root domain

app.get('/', (req, res) => {
    res.json( { message: 'Hello World!'})
});

// Connect to Mongo DB Atlas

const MONGO_URI = 'mongodb://Fernando:oathkeeper2@cintanegra-shard-00-00-lydrj.gcp.mongodb.net:27017,cintanegra-shard-00-01-lydrj.gcp.mongodb.net:27017,cintanegra-shard-00-02-lydrj.gcp.mongodb.net:27017/exercise-tracker?ssl=true&replicaSet=CintaNegra-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then( () => console.log('MongoDB database connection successful'))
.catch( () => console.log('Error in connecting to MongoDB database'));

// Routes
// Tell server to use the route files we created, exercises.js and users.js

const exercisesRouter = require('./routes/exercises.js');
const usersRouter = require('./routes/users.js');
// whenever someone goes into Route URL it's going to load everything
//in exercises Router
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



// Starts the Server, starts listening on a port
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});


