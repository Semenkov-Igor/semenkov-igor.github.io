const $addButton = $('#addBtn');
const $stickersList = $('#stickersList');
const stickerTemplate = $('#stickerTemplate').html();
const REMOVE_CLASS = 'remove';
const USERINPUT_CLASS = 'userInput';
const STICKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

$addButton.on('click', createSticker);
$stickersList.on('focusout', '.' + USERINPUT_CLASS, onStickerAreaFocusOut);
$stickersList.on('click', '.' + REMOVE_CLASS, onStickersListClick);

getData();

function getData() {
    fetch(STICKERS_URL)
        .then((res) => res.json())
        .then(renderData);
}

function renderData(data) {
    $stickersList.html(data.map(generateHtml).join('\n'));

    $(".sticker").resizable({
        stop: function (event, ui) {
            const stickerId = $(event.target).data('id');
            changeSticker(stickerId, ui.size)
        }
    });

    $(".sticker").draggable({
        stop: function (event, ui) {
            const stickerId = $(event.target).data('id');            
            changeSticker(stickerId, {
                        x: ui.position.left,
                        y: ui.position.top
                    });
        }
    });
}

function generateHtml(sticker) {
    return stickerTemplate
        .replace('{{title}}', sticker.description)
        .replace('{{id}}', sticker.id)
        .replace('{{id}}', sticker.id)
        .replace('{{width}}', sticker.width)
        .replace('{{height}}', sticker.height)
        .replace('{{x}}', sticker.x)
        .replace('{{y}}', sticker.y)
}

function createSticker() {
    let sticker = {
        description: '',
        width: 300,
        height: 200
    };

    fetch(STICKERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sticker),
    })
        .then((res) => res.json())
        .then((data) => getData(data)
        );
}

function onStickersListClick(event) {
    const stickerId = $(event.target).closest('.sticker').data('id');
    deleteSticker(stickerId);
}

function onStickerAreaFocusOut(event) {
    const stickerId = $(event.target).closest('.sticker').data('id');
    changeSticker(stickerId, { description: $(event.target).val() })
}

function changeSticker(id, changes) {
    let sticker;
    fetch(STICKERS_URL + '/' + id)
        .then((res) => res.json())
        .then((data) => {
            sticker = data;
            sticker = { ...sticker, ...changes }
            updateSticker(sticker);
        })
}

function updateSticker(sticker) {
    fetch(STICKERS_URL + '/' + sticker.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sticker),
    })
}

function deleteSticker(stickerId) {
    fetch(STICKERS_URL + '/' + stickerId, {
        method: 'DELETE',
    })
    getStickerElement(stickerId).remove();
}

function getStickerElement(id) {
    return $stickersList.find(`[data-id="${id}"]`);
}