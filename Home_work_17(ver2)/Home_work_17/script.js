const addButton = document.getElementById('addBtn');
const stickersList = document.getElementById('stickersList');
const stickerTemplate = document.getElementById('stickerTemplate').innerHTML;
const REMOVE_CLASS = 'remove';
const USERINPUT_CLASS = 'userInput';
const STICKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

addButton.addEventListener('click', onAddBtnClick);
stickersList.addEventListener('focusout', onStickerAreaFocusOut);
stickersList.addEventListener('click', onStickersListClick);

getData();

function getData() {
    fetch(STICKERS_URL)
        .then((res) => res.json())
        .then(renderData);
}

function renderData(data) {
    data.forEach(generateHtml);
}

function generateHtml(sticker) {
    stickersList.innerHTML += stickerTemplate
        .replace('{{title}}', sticker.description)
        .replace('{{id}}', sticker.id)
        .replace('{{id}}', sticker.id)
}

function onAddBtnClick() {
    createSticker();
}

function createSticker() {
    let sticker = {
        description: ''
    };

    fetch(STICKERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sticker),
    })
        .then((res) => res.json())
        .then((data) => {
            generateHtml(data);
            console.log(data);
        });
}

function onStickersListClick(event) {
    if (event.target.classList.contains(REMOVE_CLASS)) {
        deleteSticker(event.target.parentElement.dataset.stickerId);
    }
}

function onStickerAreaFocusOut(event) {
    const element = event.target;
    if (element.classList.contains(USERINPUT_CLASS)) {
        updateSticker(
            element,
            element.value,
            element.parentElement.dataset.stickerId
        );
    };
}

function updateSticker(sticker, value, id) {
    sticker.description = value;

    fetch(STICKERS_URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sticker),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

function deleteSticker(stickerId) {
    console.log(stickerId);
    fetch(STICKERS_URL + '/' + stickerId, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(refreshList)
        .then(getData);
}

function refreshList() {
    while (stickersList.firstChild) {
        stickersList.removeChild(stickersList.firstChild);
    }
}