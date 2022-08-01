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

        //Pick a random number for "price"
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://picsum.photos/200/300',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi sint vitae quo earum vero saepe totam? Voluptatem eveniet, ut expedita iusto ad quasi? Atque aliquam, voluptas ipsam aspernatur explicabo nobis.',
            price
        });

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});