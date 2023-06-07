const express = require('express');
const session = require('express-session');
const configRoutes = require('./routes');
const cors = require("cors");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
    next();
});
const whitelist = ["http://localhost:3000", "https://mygymroutine-2d445.web.app"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 6000000 },
    })
);

configRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${port}`);
});
