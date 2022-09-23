/**
 * Authentication/Authorization Router
 * @author: Rohtash Lakra
 */
// npm install express
// import express module
const express = require('express');
// import chalk module
const chalk = require('chalk');
// import debug module
const debug = require('debug')('WebApp:authRouter');


// init authRouter
const authRouter = express.Router();


/**
 * define sessionRouter for all sessions
 */
 authRouter.route('/signUp')
    .get((request, response) => {
        debug(`Request SignUp: ${chalk.green(request.url)}`);
        /* Step 1 */
        response.render('signup');
    });



/**
 * export authRouter
 */
module.exports = authRouter;
