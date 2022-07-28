const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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

//Show all products
app.get('/products', async (req, res) => {
    const { category } = req.query;

    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category});
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
});

//Form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

//Creating a new product on database
app.post('/products/', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products');
});

//Get and show a product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product });
});

//Update a product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories});
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${product._id}`);
});
//---------------------------

//Delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})