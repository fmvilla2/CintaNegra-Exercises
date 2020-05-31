
// We need the express Router, because this is a route we're creating.

const router = require('express').Router(); 
let User = require('../models/user.model'); // Require Mongoose Model we created 

// 1st Route: First Endpoint that handles incoming HTTP 'GET' requests on the /Users URL path. So we have our root URL which is localhost:4000, and then it's '/Users' => (localhost:4000/users), then if it's just a '/' at the end (localhost:4000/users/) then it's a 'GET' request according to this route and will return users from database in JSON format.  

router.route('/').get( (req, res) => {
    User.find()  // Mongoose method that gets a list of all the Users from MongoDB database, find method returns a promise.
    .then( users => res.json(users))
    .catch( err => res.status(400).json( 'Error: ' + err));
});

// Second ENDPOINT handles HTTP 'POST' requests, takes username from request and assigns it to 'newUser' using the user model and then saves it to MONGODB database and then we return 'user added!' in JSON. 

router.route('/add').post( (req, res) => {
    const username = req.body.username;
    const newUser = new User( {username} );

    newUser.save()
    .then( () => res.json('User added!'))
    .catch( err => res.status(400).json('Error: ' + err));
});

// Export router

module.exports = router;

