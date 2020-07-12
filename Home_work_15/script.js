const albumList = document.getElementById('albumList');
const photosList = document.getElementById('photosList');
const albumTemplate = document.getElementById('albumTemplate').innerHTML;
const photoTemplate = document.getElementById('photoTemplate').innerHTML;
const CHOOSE_CLASS = 'choose';
// const FIRST_BOOT_ALBUM = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
const ALBUMS_LIST_URL = 'https://jsonplaceholder.typicode.com/albums';
const ALBUM_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';


getAlbums();

// function init() {
//     const dataAlbums = getAlbums();
//     // getAlbums();
//     console.log(dataAlbums);
//     getFirstAlbumPhotos(dataAlbums);
// };

function getAlbums() {
    fetch(ALBUMS_LIST_URL)
        .then((res) => res.json())
        .then((data) => {
            generateAlbumHtml(data);
            console.log(data);
            // getFirstAlbumPhotos(data);
            showAlbum(data[0].id);
            // return data;
        })
        // .then((data) => getFirstAlbumPhotos(data))
};

function generateAlbumHtml(data) {
    for (let i = 0; i < data.length; i++) {
        albumList.innerHTML += albumTemplate
            .replace('{{albumTitle}}', data[i].title)
            .replace('{{albumId}}', data[i].id);              
    }
    // showAlbum(data[0].id);
    albumList.children[0].classList.add(CHOOSE_CLASS);
    albumList.addEventListener('click', onAlbumListClick);
};

// function getFirstAlbumPhotos(dataAlbums) {
//     if (dataAlbums.length) {
//         showAlbum(dataAlbums[0].id);
//     }
// }


function onAlbumListClick(event) {
    hidePrevAlbum(event, event.target.parentElement);
    showAlbum(event.target.dataset.listId);
    toggleClass(event.target);
};

function toggleClass(el) {
    if (el.classList.contains('album')) {
        for (i = 0; i < albumList.children.length; i++) {
            albumList.children[i].classList.remove(CHOOSE_CLASS);
        }
        el.classList.toggle(CHOOSE_CLASS);
    }
};

function hidePrevAlbum(el) {
    if (el.target.classList.contains('album')) {
        while (photosList.firstChild) {
            photosList.removeChild(photosList.firstChild);
        }
    }
};

function showAlbum(el) {
    const albumId = el;
    const albumUrl = ALBUM_URL + albumId;
    getPhotos(albumUrl);
}

function getPhotos(albumUrl) {
    fetch(albumUrl)
        .then((res) => res.json())
        .then(generatePhotosHtml);
}

function generatePhotosHtml(data) {
    for (let i = 0; i < data.length; i++) {
        photosList.innerHTML += photoTemplate
            .replace('{{photoTitle}}', data[i].title)
            .replace('{{photoId}}', data[i].id)
            .replace('{{photoUrl}}', data[i].thumbnailUrl);
    }
};