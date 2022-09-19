const form = document.querySelector('form');
const groceryList = document.querySelector('#list');

console.log(form);

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const productInput = form.elements.product;
    const quantityInput = form.elements.qty;

    addGroceries(productInput.value, quantityInput.value);

    productInput.value = '';
    quantityInput.value = '';
});

const addGroceries = (product, quantity) => {
    const newGrocery = document.createElement('li');
    newGrocery.append(`${quantity} ${product}`);
    groceryList.appendChild(newGrocery);
}