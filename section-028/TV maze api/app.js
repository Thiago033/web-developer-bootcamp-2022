const form = document.querySelector('#searchForm');
const showList = document.querySelector('#showList')
const apiLink = "https://api.tvmaze.com/search/shows"

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(apiLink, config);

    makeImages(res.data);

    form.elements.query.value = '';
});

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;

            const showName = document.createElement('p');
            showName.textContent = result.show.name;

            const newShow = document.createElement('div');
            newShow.classList.add('container');
            newShow.append(showName, img);
            showList.append(newShow);
        }
    }
}