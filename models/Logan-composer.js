/* 
================================================================
    Title: Logan-composer.js
    Author: Carl Logan
    Date: 11/12/2022
    Description: Set the model for the database entries.
================================================================
*/

// import mongoose
const mongoose = require("mongoose");
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;

// set the schema for the Composers API
let composerSchema = new Schema({
  firstName: {type: String, required: true, unique: false},
  lastName: {type: String, required: true, unique: false},
});

// export the model for use externally
module.exports = mongoose.model("Composer", composerSchema);