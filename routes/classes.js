const express = require('express');
const routes = express();

routes.use(express.json());

const db = require('../models');

routes.get('/', (req, res) => {
    // Use Mongoose to find all classes in the collection
    db.Class.find({})
        .then((classes) => {
            res.json(classes); // Return the classes as JSON
        })
        .catch((err) => {
            res.status(500).send('Error retrieving classes from the database');
        });
});

routes.get('/:_id', (req, res) => {
    const _id = req.params._id; // Get the class ID from the URL

    // Use Mongoose to find the class by ID
    db.Class.findById(_id)
        .then((classItem) => {
            if (!classItem) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json(classItem);
        })
        .catch((err) => {
            res.status(500).send('Error retrieving the class from the database');
        });
});

// Create a new class
routes.post('/', (req, res) => {
    /* 
    #swagger.parameters['class'] = {
        in: 'body',
        schema: {
            $department: '',
            $code: '',
            $name: '',
            $section: null,
            $capacity: null,
            $students: [
                {
                    $fname: '',
                    $lname: '',
                    $profilepic: null
                }
            ]
        }
    }
    */
    const { department, code, name, section, capacity, students } = req.body; // Assuming you are sending the class data in the request body

    // Create a new instance of the Class model
    const newClass = new db.Class({
        department,
        code,
        name,
        section,
        capacity,
        students,
    });

    // Save the new class to the database
    newClass.save()
        .then((savedClass) => {
            res.status(201).json(savedClass); // Return the saved class as a JSON response
        })
        .catch((err) => {
            res.status(500).send('Error creating the class');
        });
});

// Update a class by _id
routes.put('/:_id', (req, res) => {
    /* 
    #swagger.parameters['class'] = {
        in: 'body',
        schema: {
            $department: '',
            $code: '',
            $name: '',
            $section: null,
            $capacity: null,
            $students: [
                {
                    $fname: '',
                    $lname: '',
                    $profilepic: null
                }
            ]
        }
    }
    */
   
    const classId = req.params._id; // Get the class _id from the URL
    const updatedData = req.body; // New data for the class

    // Use Mongoose to find and update the class by _id
    db.Class.findByIdAndUpdate(classId, updatedData, { new: true })
        .then((updatedClass) => {
            if (!updatedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json(updatedClass);
        })
        .catch((err) => {
            res.status(500).send('Error updating the class');
        });
});

// Delete a class by _id
routes.delete('/:_id', (req, res) => {
    const classId = req.params._id; // Get the class _id from the URL

    // Use Mongoose to find and delete the class by _id
    db.Class.findByIdAndDelete(classId)
        .then((deletedClass) => {
            if (!deletedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.json(deletedClass);
        })
        .catch((err) => {
            res.status(500).send('Error deleting the class');
        });
});


module.exports = routes;