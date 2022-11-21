/* 
================================================================
    Title: Logan-user.js
    Author: Carl Logan
    Date: 11/21/2022
    Description: Set the model for the database entries.
================================================================
*/

// import mongoose
const mongoose = require("mongoose");
// initialize the mongoose Schema Object
const Schema = mongoose.Schema;

// set the schema for the API
let userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: false},
  emailAddress: {type: String, required: true, unique: false},
});

// export the model for use externally
module.exports = mongoose.model("User", userSchema);