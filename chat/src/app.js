import './styles.css';
import $ from 'jquery';

$(() => {
    const $sendButton = $('#sendBtn');
    const $userNameInput = $('#userNameInput');
    const $userMessageInput = $('#userMessageInput');
    const $messageList = $('#messageList');
    const $textarea = $('textarea');
    const socket = new WebSocket('wss://fep-app.herokuapp.com/')

    $sendButton.click(sendMessage);
    $textarea.on('keyup', resizeArea);

    function sendMessage() {
        message.payload.username = $userNameInput.val();
        message.payload.message = $userMessageInput.val();
        socket.send(JSON.stringify(message));
        $userMessageInput.val('');
    };

    function resizeArea() {
        if (this.scrollTop > 0) {
            this.style.height = this.scrollHeight + "px";
        }
    };

    socket.onmessage = (e) => {
        renderData(JSON.parse(e.data))
    };

    function renderData(message) {
        $messageList.append(`<div id="message"><strong>${message.payload.username}</strong>:  
        <em>${message.payload.message}</em></div>`);
    };

    const message = {
        type: 'message',
        payload: {
            username: '',
            message: ''
        }
    };
});