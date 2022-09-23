/**
 * Initial application.
 * @author: Rohtash Lakra
 */
// npm install express
// import express module
const express = require('express');
// import chalk module
const chalk = require('chalk');
// import debug module
const debug = require('debug')('WebApp');
// import morgan module
const morgan = require('morgan');
// import path module
const path = require('path');


// define listening port
const PORT = process.env.PORT || 3000;


// init express app
const app = express();

// init sessionRouter 
const sessionRouter = require("./src/routers/sessionRouter");
const adminRouter = require("./src/routers/adminRouter");
const authRouter = require("./src/routers/authRouter");

/**
 * bind modules/resources
 */
// use morgan like morgan('combined') or morgan('tiny')
app.use(morgan('tiny'))
// bind static resources to load automatically from 'public' folder
app.use(express.static(path.join(__dirname, '/public/')));
// app.use('*/public',express.static(path.join(__dirname, '/public/')));

/**
 * set templates
 */
app.set('views', './src/views');
app.set('view engine', 'ejs');


// handle sessions request with sessionRouter
app.use('/sessions', sessionRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);


// consume '/' request
app.get(["/", "/index.html"], (request, response) => {
    // console.log(`Request: ${request.url}`)
    debug(`Request: ${chalk.green(request.url)}`);
    // response.send("Welcome to Node.js Application.");
    response.render('index', { title: 'Dashboard', businessName: 'RSL Inc', data: ['Home', 'About Us', 'Contact Us'] });
});


/**
 * register listener on the configured port
 */
app.listen(PORT, () => {
    // console.log(`Listening on the port ${port} ...`)
    debug(`Listening on port ${chalk.green(PORT)} ...`);
})

