const express = require('express');
const routes = express();

routes.use(express.json());

const { jwt, verifyToken, secretKey } = require('../middleware/middleware');

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
routes.get('/userClasses/:_id', (req, res) => {
    // Use Mongoose to find all classes from a user id
    const _id = req.params._id; // Get the user ID from the URL

    // Use Mongoose to find the user by ID
    db.User.findById(_id)
        .then((userItem) => {
            if (!userItem) {
                return res.status(404).json({ message: 'User not found' });
            } else if (!userItem.classlist) {
                return res.status(404).json({ message: 'Classlist not found' });
            }
            res.json(userItem.classlist);
        })
        .catch((err) => {
            res.status(500).send('Error retrieving the classlist from the database');
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
                null
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
                null
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

// Route to verify an existing user and log them in / provide a JWT for frontend
routes.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await db.User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate and return a JWT
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: 86400 }); // Token expires in 24 hours
    res.json({ token });
});

// Route to get class information for each class in a user's classlist
routes.get('/:userId/classesInfo', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID to get their classlist
        const user = await db.User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the class IDs from the user's classlist
        const classIds = user.classlist;

        // Use the class IDs to find the corresponding class information (excluding students array)
        const classes = await db.Class.find({ _id: { $in: classIds } }, { students: 0 });

        res.json({ classes });
    } catch (error) {
        console.error('Error fetching user classes: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = routes;