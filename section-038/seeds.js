const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => {
        console.log("ERROR!", err);
    });

// const p = new Product({
//     name: 'Ruby grape fruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(err => {
//         console.log(e);
//     });

const seedProducts = [
    {
        name: 'Ruby grape fruit',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Carrot',
        price: 0.99,
        category: 'vegetable'
    },
    {
        name: 'Milk',
        price: 3.99,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })