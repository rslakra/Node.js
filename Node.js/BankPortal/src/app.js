const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//load static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));


// read accountData data
const accountData = fs.readFileSync('src/json/accounts.json');
const accounts = JSON.parse(accountData);

// read users data
const userData = fs.readFileSync('src/json/users.json', { encoding : 'utf-8'});
const users = JSON.parse(userData);


// load index.ejs file
app.get('/', (req, res) => {
    console.log('Loading: ' + req.url);
    res.render('index', { title : 'Account Summary', accounts : accounts});
});


app.get('/checking', (req, res) => {
    console.log('Loading: ' + req.url);
    res.render('account', { title : 'Checking', account : accounts.checking });
});

app.get('/savings', (req, res) => {
    console.log('Loading: ' + req.url);
    res.render('account', { title : 'Savings', account: accounts.savings });
});

app.get('/credit', (req, res) => {
    console.log('Loading: ' + req.url);
    res.render('account', { title : 'Credit Card', account : accounts.credit });
});



// load profile file
app.get('/profile', (req, res) => {
    console.log('Loading: ' + req.url);
    res.render('profile',  { title : 'Profile', user: users[0] });
});


// transfer get route
// app.get('/transfer', (req, res) => {
//     console.log('Get: ' + req.url);
//     res.render('transfer', { title : 'Transfer' });
// });

// routes for '/transfer' end-point
app.route('/transfer')
    .get((req, res) => {
        console.log('Get: ' + req.url);
        res.render('transfer', { title : 'Transfer' });
    })
    .post((req, res) => {
        console.log('Post: ' + req.url);
        // res.render('transfer', { title : 'Transfer' });
    })
;




// listten on port {PORT}
app.listen(PORT,(req, res) => {
    console.log('Listening on port:' + PORT);
});