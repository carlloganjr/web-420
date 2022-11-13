/* 
================================================================
    Title: app.js
    Author: Carl Logan
    Date: 10/21/2022
    Description: API project setup.
================================================================
*/

// the require stack
const express = require('express');
const http = require('http');
const swaggerUI = require('swagger-ui-express');
const swaggerJS = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composersAPI = require('./routes/Logan-composer-routes');

const app = express();
// set the port
const PORT = process.env.PORT || 3000;

app.use(express.json())
.use(express.urlencoded({'extended': true}));

// connect to MongoDB
const conn = 'mongodb+srv://web420_user:GtGFfEK0jfDSmcZs@bellevueuniversity.dbdc0d0.mongodb.net/web420DB';
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})

// create the API documentation
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 RESTful APIs',
      version: '1.0.0',
    },
  },
  // the documentation will be created from these route files
  apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJS(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use('/api', composersAPI);

http.createServer(app)
.listen(PORT, (e) => {
  console.log(`Application started and listening on ${PORT}`);
});
