const express = require('express');
const routes = express();

routes.use(express.json());

const db = require('../models');

// Add routes here

// create new user
routes.post('/', (req, res) => {
    /* 
    #swagger.parameters['user'] = {
        in: 'body',
        schema: {
            $fname: '',
            $lname: '',
            $username: '',
            $password: null,
            $classlist: [
                String
            ]
        }
    }
    */
    const { fname, lname, username, password, classlist } = req.body; // Assuming you are sending the user data in the request body

    // Create a new instance of the User model
    const newUser = new db.User({
        fname,
        lname,
        username,
        password,
        classlist,
    });

    // Save the new user to the database
    newUser.save()
        .then((savedClass) => {
            res.status(201).json(savedClass); // Return the saved user as a JSON response
        })
        .catch((err) => {
            res.status(500).send('Error creating the user');
        });
});


// Update a user by _id
routes.put('/:_id', (req, res) => {
    /* 
    #swagger.parameters['user'] = {
        in: 'body',
        schema: {
            $fname: '',
            $lname: '',
            $username: '',
            $password: null,
            $classlist: [
                String
            ]
        }
    }
    */
   
    const userId = req.params._id; // Get the user _id from the URL
    const updatedData = req.body; // New data for the user

    // Use Mongoose to find and update the user by _id
    db.User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch((err) => {
            res.status(500).send('Error updating the user');
        });
});

// Get classlist by id
routes.get('/', (req, res) => {
    // Use Mongoose to find all classes from a user id
    db.User.find({})
        .then((classlist) => {
            res.json(classlist); // Return the classlist as JSON
        })
        .catch((err) => {
            res.status(500).send('Error retrieving the class list from the database');
        });
});


routes.get('/', (req, res) => {
    // Use Mongoose to find all users in the collection
    db.User.find({})
        .then((users) => {
            res.json(users); // Return the users as JSON
        })
        .catch((err) => {
            res.status(500).send('Error retrieving users from the database');
        });
});

routes.get('/:_id', (req, res) => {
    const _id = req.params._id; // Get the user ID from the URL

    // Use Mongoose to find the user by ID
    db.User.findById(_id)
        .then((userItem) => {
            if (!userItem) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(userItem);
        })
        .catch((err) => {
            res.status(500).send('Error retrieving the user from the database');
        });
});

// Create a new user
routes.post('/', (req, res) => {
    /* 
    #swagger.parameters['user'] = {
        in: 'body',
        schema: {
            $fname: '',
            $lname: '',
            $username: '',
            $password: '',
            $classlist: [
                ''
            ]
        }
    }
    */
    const { fname, lname, username, password, classlist } = req.body; // Assuming you are sending the user data in the request body

    // Create a new instance of the User model
    const newUser = new db.User({
        fname,
        lname,
        username,
        password,
        classlist,
    });

    // Save the new user to the database
    newUser.save()
        .then((savedUser) => {
            res.status(201).json(savedUser); // Return the saved user as a JSON response
        })
        .catch((err) => {
            res.status(500).send('Error creating the user');
        });
});

// Update a user by _id
routes.put('/:_id', (req, res) => {
    /* 
    #swagger.parameters['user'] = {
        in: 'body',
        schema: {
            $fname: '',
            $lname: '',
            $username: '',
            $password: '',
            $classlist: [
                ''
            ]
        }
    }
    */
   
    const userId = req.params._id; // Get the user_id from the URL
    const updatedData = req.body; // New data for the user

    // Use Mongoose to find and update the user by _id
    db.User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch((err) => {
            res.status(500).send('Error updating the user');
        });
});

// Delete a user by _id
routes.delete('/:_id', (req, res) => {
    const userId = req.params._id; // Get the user_id from the URL

    // Use Mongoose to find and delete the user by _id
    db.User.findByIdAndDelete(userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(deletedUser);
        })
        .catch((err) => {
            res.status(500).send('Error deleting the user');
        });
});


module.exports = routes;