function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (message !== "") {
        appendMessage('user', message);

        setTimeout(() => {
            appendMessage('bot', 'Olá! Como posso ajudar você com seus medicamentos?');
        }, 1000);

        chatInput.value = "";
    }
}

function appendMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
