const express = require('express');
const app = express();
// console.dir(app);

// app.use((req, res) => {
//     console.log("We got a new request!");
//     // res.send("Hello! we got your request!");
//     // res.send({color : 'red'});
//     res.send('<h1>This is a webpage!</h1>');
// });

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});

app.get('/', (req, res) => {
    res.send('This is the home page!');
});

app.get('/p/:page', (req, res) => {
    console.log(req.params);
    const { page } = req.params;
    res.send(`<h1>Browsing the ${page} page!`);
});

app.get('/p/:page/:pageNumber', (req, res) => {
    console.log(req.params);
    const { page, pageNumber } = req.params;
    res.send(`<h1>Browsing the ${page} number ${pageNumber}!`);
});

app.get('/search', (req, res) => {
    console.log(req.query);
    const { q } = req.query;
    
    //didn't work well
    // if (!q) {
    //     res.send('Nothing found if nothing searched!');
    // }

    res.send(`Searching for ${q}`);
});

// app.post('/cats', (req, res) => {
//     res.send('Post request to /cats');
// });


// app.get('/cats', (req, res) => {
//     console.log('Cat request!');
//     res.send('cat response!!!');
// });

// app.get('/dogs', (req, res) => {
//     console.log('Dog request!');
//     res.send('dog response!!!');
// });

app.get('*', (req, res) => {
    res.send('Error! page not found!');
});