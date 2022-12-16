/* 
================================================================
    Title: Logan-team.js
    Author: Carl Logan
    Date: 12/14/2022
    Description: Set the model for the database entries.
================================================================
*/

// import mongoose
const mongoose = require("mongoose");
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;

// set a schema for embedded data in the Player model
let playerSchema = new Schema({
  firstName: {type: String, required: false, unique: false},
  lastName: {type: String, required: false, unique: false},
  salary: {type: Number, required: false, unique: false},
});

// set the model for documents in the Team API
let teamSchema = new Schema({
  name: {type: String, required: false, unique: false},
  mascot: {type: String, required: false, unique: false},
  // use the playerSchema to determine player structure
  players: [playerSchema]
});

// export the model for use externally
module.exports = mongoose.model("Team", teamSchema);