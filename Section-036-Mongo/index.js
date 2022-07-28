const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => {
        console.log("connected to database").load
    })
    .catch(err => {
        console.log("ERROR!", err);
    });


// {
//     title: 'Amadeus',
//     year: 1986,
//     score: 96,
//     rating: 'R'
// }

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score:  Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);
// const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 96, rating: 'R'});

Movie.insertMany([
    { title: 'Abc', year: 1, score: 10, rating: 'X' },
    { title: 'Bcd', year: 2, score: 20, rating: 'Z' },
    { title: 'Cde', year: 3, score: 30, rating: 'Y' },
    { title: 'Def', year: 4, score: 40, rating: 'W' }
])
    .then(data => {
        console.log('It worked!');
        console.log(data);
    })