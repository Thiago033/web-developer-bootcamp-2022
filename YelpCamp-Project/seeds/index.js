const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => {
        console.log("Error!", err);
    });

//Pick a random sample from "/seedHelpers"
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        //Pick a random index of a city from "/cities"
        const random1000 = Math.floor(Math.random() * 1000);

        const camp = new Campground({
            title: `${cities[random1000].city}, ${cities[random1000].state}`,
            location: `${sample(descriptors)} ${sample(places)}`
        })

        await camp.save();
    }
}

// title: String,
// price: String,
// description: String,
// location: String

seedDB().then(() => {
    mongoose.connection.close();
});