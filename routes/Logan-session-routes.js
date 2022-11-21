/* 
================================================================
    Title: Logan-session-routes.js
    Author: Carl Logan
    Date: 11/21/2022
    Description: Set up the routes for the API.
================================================================
*/

// modules to require
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// the schema for the users collection
const User = require("../models/Logan-user.js");
const saltRounds = 10;

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - NodeSecurity
 *     operationId: signup
 *     description: Create a user document.
 *     summary: Create a new user.
 *     requestBody:
 *       description: Create a new user document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *       required: true 
 *     responses:
 *       '200':
 *         description: Registered user.
 *       '401':
 *         description: Username is already in use.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for signup method
router.post('/signup', async(req, res) => {
  try {
    // check the username first
    User.findOne({userName: req.body.userName}, (e, user) => {
      if(!user) {
        // require the userName, password, and emailAddress
        let newRegisteredUser = new User({
          userName: req.body.userName,
          password: req.body.password,
          emailAddress: req.body.emailAddress
        });
        // hash the password
        let hashedPassword = bcrypt.hashSync(newRegisteredUser.password, saltRounds);
        newRegisteredUser.password = hashedPassword;
        // create a new document in the database using data from request body
        User.create(newRegisteredUser, (e, user) => {
          if(e) {
            console.log(e);
            // send the 501 message
            res.status(501).send({
              'message': `MongoDB Exception: ${e}`
            });
          }
          else {
            res.json(user);
          }
        });
      }
      else if(user) {
        // send the 401 message
        res.status(401).send({
          'message': 'Username is already in use.'
        });
      }
    });
  }
  catch(e) {
    console.log(e);
    // send the 500 message
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - NodeSecurity
 *     operationId: login
 *     description: Login based on credentials in a document.
 *     summary: Login using document data.
 *     requestBody:
 *       description: Login using document data.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *       required: true 
 *     responses:
 *       '200':
 *         description: User logged in.
 *       '401':
 *         description: Invalid username and/or password.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for signup method
router.post('/login', async(req, res) => {
  try {
    // check the username first
    User.findOne({userName: req.body.userName}, (e, user) => {
      if(user) {
        // check the password
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(passwordIsValid) {
          // send the 200 message
          res.status(200).send({
            'message': 'User logged in.'
          });
        }
        else {
          // send the 401 message
          res.status(401).send({
            'message': 'Invalid username and/or password.'
          });
        }
      }
      else if(!user) {
        // send the 401 message
        res.status(401).send({
          'message': 'Invalid username and/or password.'
        });
      }
    });
  }
  catch(e) {
    console.log(e);
    // send the 500 message
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// export the module for external use
module.exports = router;