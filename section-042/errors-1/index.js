const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./appError');

app.use(morgan('tiny'));

app.listen('3000', () => {
    console.log('App is running on port 3000');
});

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('/dogs', (req, res, next) => {
    console.log('dogs page');
    next();
});

const verifyPassword = ((req, res, next) => {
    const { password } = req.query;

    if (password === 'secretpassword') {
        next();
    }

    // res.send('You need a password!');
    // res.status(401);
    // throw new AppError(401, 'Password required!');

    throw new AppError('Password required!', 401); 
});

// app.use((req, res, next) => {
//     console.log('first middleware');
//     return next(); //or just "next()"
// })

// app.use((req, res, next) => {
//     console.log('second middleware');
//     return next(); //or just "next()"
// })

// app.use((req, res, next) => {
//     console.log('third middleware');
//     return next(); //or just "next()"
// })

app.get('/', (req, res) => {
    console.log(req.requestTime);
    res.send('home page');
});

app.get('/test', (req, res) => {
    res.send('test page');
});

app.get('/dogs', (req, res) => {
    res.send('dogs page');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Secret page');
});

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403);
});

app.use((err, req, res, next) => {
    // console.log("********* ERROR *********");
    // res.status(500).send('Something broke!');
    // next(err);

    // "= 500" -> set status 500 by default
    const { status = 500, message = "Something went wrong"} = err;
    res.status(status).send(message);
});

app.use((req, res) => {
    res.send('NOT FOUND!');
});