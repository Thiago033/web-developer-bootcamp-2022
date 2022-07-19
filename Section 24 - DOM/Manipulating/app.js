const allImages = document.getElementsByTagName('img');

for (const img of allImages) {
    console.log(img.src);
}

const h1 = document.querySelector('h1');
h1.style.color = 'purple';

const h2 = document.querySelector('h2');
h2.setAttribute('class', 'purple');
