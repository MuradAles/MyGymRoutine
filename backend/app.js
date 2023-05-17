const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');

app.use(express.json());

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 6000000 }
    })
);

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
