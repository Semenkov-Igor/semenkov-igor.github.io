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
    stickersList.innerHTML = data.map(getSticker).join('\n');
}

function getSticker(sticker) {
    return stickerTemplate
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
            getData(data);
            console.log(data);
        });
}

function onStickersListClick(event) {
    if (event.target.classList.contains(REMOVE_CLASS)) {
        deleteSticker(event.target.parentElement.dataset.stickerId);
    }
}

function onStickerAreaFocusOut(event) {
    if (event.target.classList.contains(USERINPUT_CLASS)) {
        const stickerId = event.target.parentElement.dataset.stickerId;
        const value = event.target.value;
        let sticker;
        fetch(STICKERS_URL + '/' + stickerId)
            .then((res) => res.json())
            .then((data) => {
                sticker = data;
                sticker.description = value;
                updateSticker(sticker)
            })
    };
}

function updateSticker(sticker) {
    fetch(STICKERS_URL + '/' + sticker.id, {
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