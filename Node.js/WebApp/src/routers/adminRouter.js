const express = require('express');
const debug = require('debug')('WebApp:adminRouter');
const {MongoClient} = require('mongodb');
// load sessions.json data file
const sessionsData = require('../data/sessions.json');

const adminRouter = express.Router();


adminRouter.route('/').get((request, response) =>{
    const dbUrl = "mongodb+srv://testMongo:Test!Mongo!8759@cluster0.68edn9v.mongodb.net/?retryWrites=true&w=majority";
    const dbName = "WebApp";

    // await async
    (async function mongoConnection(){

        let mongoClient;

        try {
            mongoClient = await MongoClient.connect(dbUrl);
            debug('Connected to Mongo DB.');

            const dbConnection = mongoClient.db(dbName);


            // insert session data in db.
            const dbResponse = await dbConnection.collection('sessions').insertMany(sessionsData);

            //sends dbResonse back to response
            response.json(dbResponse);

        } catch (error) {
            debug(error.stack);
        }

        mongoClient.close();

    }());
});


module.exports = adminRouter;
