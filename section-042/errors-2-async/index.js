const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require("./appError");

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => {
        console.log("ERROR!", err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000');
});

//Product categories
const categories = ['fruit', 'vegetable', 'dairy']

//function to wrap async errors
function wrapAsync(fn) {
    return function (res, req, next) {
        fn(res, req, next).catch(err => next(err));
    }
}

//Show all products
app.get('/products', async (req, res, next) => {
    const { category } = req.query;

    try {
        if (category) {
            const products = await Product.find({ category });
            res.render('products/index', { products, category});
        } else {
            const products = await Product.find({});
            res.render('products/index', { products, category: 'All' });
        } 

    } catch (err) {
        next(err);
    }
});

//Form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

//Creating a new product on database
app.post('/products/', async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/products');
    } catch (err) {
        next(err);
    }
});
 
//Get and show a product
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product){
        throw next(new AppError("This product does not exist.", 404));
    }

    res.render('products/details', { product });
}));

//Update a product
app.get('/products/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product){
            throw next(new AppError("This product does not exist.", 404));
        }

        res.render('products/edit', { product, categories});
    } catch (err) {
        next(err);
    }
});

app.put('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
        res.redirect(`/products/${product._id}`);  
    } catch (err) {
        next(err);
    }
});
//---------------------------

//Delete a product
app.delete('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');

    } catch (err) {
        next(err);
    }
});

//Handiling async errors
app.use((err, req, res, next) => {
    console.log(err.name);
    next(err);
});

app.use((err, req, res, next) => {
    const {status = 500, message = "Something went wrong!" } = err;
    res.status(status).send(message);
});