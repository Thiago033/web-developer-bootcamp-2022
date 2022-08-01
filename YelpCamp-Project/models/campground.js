const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    location: String,
    image: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Campground', campgroundSchema);