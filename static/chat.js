let userName = '';

document.getElementById("user-name").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Impede o comportamento padrão do Enter
        setUserName();  // Chama a função para definir o nome
    }
});

function setUserName() {
    userName = document.getElementById('user-name').value.trim();
    if (userName === "") {
        alert("Por favor, insira seu nome.");
        return;
    }

    document.getElementById('name-container').style.display = 'none';
    document.getElementById('chat-box').style.display = 'block';
    document.getElementById('input-container').style.display = 'flex';
    addMessageToChatBox("Bot", `Olá, ${userName}! Como posso ajudar você hoje?`);
}

document.getElementById("message").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    var message = document.getElementById('message').value;
    if (message.trim() === "") return;

    addMessageToChatBox(userName, message);
    document.getElementById('message').value = "";

    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var botResponse = data.response;
        botResponse = linkify(botResponse);
        addMessageToChatBox("Bot", botResponse);
    })
    .catch(error => {
        console.error('Erro:', error);
        addMessageToChatBox("Bot", "Desculpe, houve um erro ao processar sua mensagem.");
    });
}

function addMessageToChatBox(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (sender === userName) {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }
    
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function linkify(text) {
    var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
}
