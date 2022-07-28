const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => {
        console.log("connected to database").load
    })
    .catch(err => {
        console.log("ERROR!", err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0  
        }
    }
});

productSchema.methods.greet = function () {
    console.log('hello!');
    console.log(`- from ${this.name}`);
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale
    this.save();
}

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Mountain bike'});
    foundProduct.greet();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0});
}

const Product = mongoose.model('Product', productSchema);

findProduct();

Product.fireSale().then(res => console.log(res));

// const bike = new Product({name: 'Mountain bike', price: 599}, {onSale: true});

// bike.save()
//     .then(data => {
//         console.log('IT WORKED');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('ERROR');
//         console.log(err);
//     })