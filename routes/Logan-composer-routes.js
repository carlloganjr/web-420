/* 
================================================================
    Title: Logan-composer-routes.js
    Author: Carl Logan
    Date: 11/12/2022
    Description: Set up the routes for the Composer API.
================================================================
*/

// modules to require
const express = require("express");
const router = express.Router();
// the schema for the composer collection
const Composer = require("../models/Logan-composer.js");

// openapi language used to describe the API via swagger
/** 
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     operationId: findAllComposers
 *     description: API to find and create composers.
 *     summary: returns an array of composers.
 *     responses:
 *       '200':
 *         description: Array of composer documents.
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
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for findAllComposers method
router.get('/composers', async(req, res) => {
  try {
    // find and return all documents in the composers database
    Composer.find({}, (e, composers) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(composers);
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
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     operationId: findComposerById
 *     description: Find a composer by Id.
 *     summary: Returns an object of a composer.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Return a composer document.
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for findComposerById method
 router.get('/composers/:id', async(req, res) => {
  try {
    // request the id 
    let composerId = req.params.id;
    // find a composer using the provided id
    Composer.findOne({_id: composerId}, (e, composer) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(composer);
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
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     operationId: createComposer
 *     description: Create a new composer document.
 *     summary: Create a new composer.
 *     requestBody:
 *       description: Create a new composer document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *       required: true 
 *     responses:
 *       '200':
 *         description: Composer document.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for createComposer method
router.post('/composers', async(req, res) => {
  try {
    // require the first and last name
    let newComposer = new Composer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    // create a new document in the database using the first and last name
    Composer.create(newComposer, (e, composer) => {
      if(e) {
        console.log(e);
        res.status(501).send({
          'message': `MongoDB Exception: ${e}`
        });
      }
      else {
        res.json(composer);
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
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     operationId: updateComposerById
 *     description: Update a composer by Id.
 *     summary: Update a composer document.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       description: Update a new composer document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *       required: true
 *     responses:
 *       '200':
 *         description: Update a composer document.
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       '401':
 *         description: Invalid composer id.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for updateComposerById method
router.put('/composers/:id', async(req, res) => {
  try {
    // request the id 
    let composerId = req.params.id;
    // find a composer using the provided id
    Composer.findOne({_id: composerId}, (e, composer) => {
      // if the composer exists
      if(composer) {
        // some database error
        if(e) {
          console.log(e);
          res.status(501).send({
            'message': `MongoDB Exception: ${e}`
          });
        }
        // successfully found
        else {
          res.status(200).send({
            'message': 'Composer updated.'
          });
          // set new information in the document
          composer.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName
          });
          // write to the document
          composer.save((e, updatedComposer) => {
            if(e) {
              console.log(e);
              res.json(updatedComposer);
            }
            else {
              res.json(updatedComposer);
            }
          });
        }
      }
      if(!composer) {
        // send the 401 message
        res.status(401).send({
          'message': 'Invalid composer id.'
        });
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
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     operationId: deleteComposerById
 *     description: Delete a composer by Id.
 *     summary: Delete a composer document.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Deleted composer document.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
// route for deleteComposerById method
router.delete('/composers/:id', (req, res) => {
  try {
    // request id
    let composerId = req.params.id;
    // find document using the request id and delete
    Composer.findByIdAndDelete({_id: composerId}, (e, composer) => {
        if (e) {
            console.log(e);
            res.status(501).send({
                'message': `MongoDB Exception: ${e}`
            });
        } 
        // if no errors occur respond with successful deletion
        else if(composer) {
          res.status(200).send({
            'message': 'Deleted composer document.'
          });
        }
    });
  } catch(e) {
      console.log(e);
      res.status(500).send({
          'message': `Server Exception: ${e.message}`
      });
  }
})

// export the module for external use
module.exports = router;