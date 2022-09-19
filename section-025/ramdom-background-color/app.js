const button1 = document.querySelector('#button');

var color = 0;

button1.addEventListener('click', () => {

    const newColor = randomColor();

    const h1 = document.querySelector('#h1');
    h1.innerHTML = newColor;

        if (color < 100) {
            h1.style.color = 'white'
        } else {
            h1.style.color = 'black'
        }

    document.body.style.backgroundColor = newColor;
});

const randomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    color = r+g+b;

    return `rgb(${r}, ${g}, ${b})`;
}