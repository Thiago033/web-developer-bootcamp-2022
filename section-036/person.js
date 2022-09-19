const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => {
        console.log("connected to database").load
    })
    .catch(err => {
        console.log("ERROR!", err);
    });

const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});

personSchema.pre('save', async function () {
    console.log('ABOUT TO SAVE!');
});

personSchema.post('save', async function () {
    console.log('JUST SAVED!');
});

const Person = mongoose.model('Person', personSchema);