const colorInput = document.getElementById('color');
const figure = document.getElementById('figure');
const figureSelect = document.getElementById('figureSelect')
let leftMove = 0;
let topMove = 27;

colorInput.addEventListener('change', onInputKeyDown);

figureSelect.addEventListener('change', changeFigure);

function onInputKeyDown() {    
    figure.style.background = colorInput.value;
}

function changeFigure() {    
    switch (figureSelect.value) {
        case 'rectangle':
            figure.classList.remove('square');
            figure.classList.remove('circle');
            figure.classList.add('rectangle');
            break;
        case 'circle':
            figure.classList.remove('square');
            figure.classList.remove('rectangle');
            figure.classList.add('circle');
            break;
        case 'square':
            figure.classList.remove('rectangle');
            figure.classList.remove('circle');
            figure.classList.add('square');
            break;        
    }
}

document.onkeydown = function(e) {    
    if (e.key == 'ArrowRight') {
        figure.style.left = leftMove + 'px';
        leftMove = leftMove + 10;
    }
    if (e.key == 'ArrowDown') {
        figure.style.top = topMove + 'px';
        topMove = topMove + 10;
    }
    if (e.key == 'ArrowUp') {
        figure.style.top = topMove + 'px';
        topMove = topMove - 10;
    }
    if (e.key == 'ArrowLeft') {
        figure.style.left = leftMove + 'px';
        leftMove = leftMove - 10;
    }
}

