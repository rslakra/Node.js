/**
 * Session Router
 * @author: Rohtash Lakra
 */
// npm install express
// import express module
const express = require('express');
// import chalk module
const chalk = require('chalk');
// import debug module
const debug = require('debug')('WebApp:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');
const path = require("path");
// import morgan module
// const morgan = require('morgan');
// import path module
// const path = require('path');


// load sessions.json data file
// const sessionsData = require('../data/sessions.json');

// init sessionRouter
const sessionRouter = express.Router();


/**
 * 
 * @param {*} str 
 * @returns 
 */
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }


/**
 * define sessionRouter for all sessions
 */
sessionRouter.route('/')
    .get((request, response) => {
        debug(`Request Sessions: ${chalk.green(request.url)}`);
        /* Step 1 */
        // response.send('Hello, Sessions');
        // response.render('sessions', {
        //     sessions:[
        //         {
        //             "title": "Session Title 1",
        //             "description": "Session Description 1",
        //             "imageName": "beach1.jpeg"
        //         }
        //     ]
        // });
        // use the sessions json data instead of static data.

        /* Step 2 */
        // response.render('sessions', {
        //     sessions: sessionsData
        // });

        /* Step 3 */
        const dbUrl = "mongodb+srv://testMongo:Test!Mongo!8759@cluster0.68edn9v.mongodb.net/?retryWrites=true&w=majority";
        const dbName = "WebApp";
    
        // await async
        (async function mongoConnection(){
            let mongoClient;
            try {
                mongoClient = await MongoClient.connect(dbUrl);
                debug('Connected to Mongo DB.');
                const dbConnection = mongoClient.db(dbName);
                // Get all the session data from db
                const sessions = await dbConnection.collection('sessions').find().toArray();
                // debug('sessions: ' + sessions);
                //sends dbResponse back to response
                response.render('sessions',  { sessions } );
            } catch (error) {
                debug(error.stack);
            }finally {
                mongoClient.close();
            }

        }());

    });


/**
 * define sessionRouter with param for single session
 * To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):
 * for example, ".route('/:id(\\d+)')"
 */
// sessionRouter.route('/:id(\\d+)')
sessionRouter.route('/:id')
    .get((request, response) => {
        const sessionId = request.params.id;
        debug(`Request Session: ${chalk.green(request.url)}`); 
        /* Step 1 */
        // response.send('Hello, Session ' + sessionId);

        /* Step 2 */
        // if(isNumeric(sessionId)) {
        //     debug(`Processing: ${chalk.green(request.url)}`);
        //     response.render('session', {
        //         session: sessionsData[sessionId]
        //     });
        // }else{
        //     debug(`${chalk.red(request.url)}`); 
        // }

        /* Step 3 */
        const dbUrl = "mongodb+srv://testMongo:Test!Mongo!8759@cluster0.68edn9v.mongodb.net/?retryWrites=true&w=majority";
        const dbName = "WebApp";
    
        // await async
        (async function mongoConnection(){
            let mongoClient;
            try {
                mongoClient = await MongoClient.connect(dbUrl);
                debug('Connected to Mongo DB.');
                const dbConnection = mongoClient.db(dbName);
                // Get all the session data from db
                const session = await dbConnection
                    .collection('sessions')
                    .findOne({ _id : new ObjectId(sessionId)});
                // debug('session: ' + session);
                //sends dbResonse back to response
                response.render('session',  { session } );
            } catch (error) {
                debug(error.stack);
            }finally {
                mongoClient.close();
            }

        }());
    });



/**
 * export sessionRouter
 */
module.exports = sessionRouter;



