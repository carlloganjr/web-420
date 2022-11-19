/* 
================================================================
    Title: Logan-people.js
    Author: Carl Logan
    Date: 11/19/2022
    Description: Set the model for the database entries.
================================================================
*/

// import mongoose
const mongoose = require("mongoose");
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;

// set a schema for embedded data in the Person model
let roleSchema = new Schema({
  text: {type: String, required: false, unique: false},
});

// set a schema for embedded data in the Person model
let dependentSchema = new Schema({
  firstName: {type: String, required: false, unique: false},
  lastName: {type: String, required: false, unique: false},
});

// set the model for documents in the Persons API
let personSchema = new Schema({
  firstName: {type: String, required: true, unique: false},
  lastName: {type: String, required: true, unique: false},
  // use the roleSchema to determine roles structure
  roles: [roleSchema],
  // use the dependentSchema to determine dependents structure
  dependents: [dependentSchema],
  birthDate: {type: String, required: true, unique: false},
});

// export the model for use externally
module.exports = mongoose.model("Person", personSchema);