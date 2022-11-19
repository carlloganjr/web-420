/* 
================================================================
    Title: Logan-person-routes.js
    Author: Carl Logan
    Date: 11/19/2022
    Description: Set up the routes for the Person API.
================================================================
*/

// modules to require
const express = require("express");
const router = express.Router();
// the schema for the people collection
const Person = require("../models/Logan-people.js");

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     operationId: findAllPersons
 *     description: API to find and create persons.
 *     summary: returns an array of persons.
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   roles: 
 *                     type: array
 *                     items:
 *                       properties:
 *                         _id:
 *                           type: string
 *                         text:
 *                           type: string
 *                   dependents:
 *                     type: array
 *                     items:
 *                       properties:
 *                         _id:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                   birthDate:
 *                     type: string 
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for findAllPersons method
router.get('/persons', async(req, res) => {
  try {
    // find and return all documents in the people database
    Person.find({}, (e, persons) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(persons);
      }
    });
  }
  catch(e) {
    console.log(e);
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     operationId: createPerson
 *     description: Create a new people document.
 *     summary: Create a new person.
 *     requestBody:
 *       description: Create a new people document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles: 
 *                 type: array
 *                 items:
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 type: string
 *                 example: MM/DD/YY
 *       required: true 
 *     responses:
 *       '200':
 *         description: Person documents created.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for createPerson method
router.post('/persons', async(req, res) => {
  try {
    // require the data for creating new Person
    let newPerson = new Person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate
    });
    // create a new document in the database using data from request body
    Person.create(newPerson, (e, person) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(person);
      }
    });
  }
  catch(e) {
    console.log(e);
    res.status(500).send({
      'message': `Server Exception: ${e.message}`
    });
  }
});

// export the module for external use
module.exports = router;