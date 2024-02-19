const formWrapper = document.querySelector('.form-wrapper');
const form = document.querySelector('#form');
const searchInput = document.querySelector('#search-input');
const buttonWrapper = document.querySelector('.button-wrapper');
const searchButton = document.querySelector('#searchButton');
const clearButton = document.querySelector('#clearButton');
const imageListWrapper = document.querySelector('.image-list-wrapper');

const runEventListener = () => {
    form.addEventListener('submit', search);
    clearButton.addEventListener('click', clear);
};

const search = (e) => {
    const value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: 'GET',
        headers: {
            Authorization:
                'Client-ID RrB76bERIISrElKBtSSYdd7LBgHQqjJVQrN83Dh8_T8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            Array.from(data.results).forEach((image) => {
                addImageToUI(image.urls.small);
            });
        })
        .catch((err) => console.log(err));
    e.preventDefault();

    imageListWrapper.innerHTML = '';
};

const clear = () => {
    searchInput.value = '';
    imageListWrapper.innerHTML = '';
};

const addImageToUI = (url) => {
    const div = document.createElement('div');
    div.className = 'card';

    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.height = '400';
    img.width = '400';

    div.appendChild(img);
    imageListWrapper.appendChild(div);
};

runEventListener();
