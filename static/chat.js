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

    // Lista de mensagens para escolher aleatoriamente
    const mensagens = [
        `E ai ${userName}, beleza, em que posso te ajudar?`,
        `Fala ${userName}, como posso ajudar?`,
        `Oi ${userName}, tudo bem? Em que posso ser útil?`,
        `Olá ${userName}, estou aqui para te ajudar, o que você precisa?`,
        `Hey ${userName}, como posso ser útil hoje?`,
        `Saudações ${userName}, em que posso te auxiliar?`,
        `Olá ${userName}, o que você precisa?`,
        `Hey! ${userName}, Como vai? Vamos espalhar um pouco de magia por aí? Zueira, em que posso ajudar?`,
        `Oi, ${userName}, beleza? Estou aqui para te guiar, o que você precisa?`,
        `${userName}, e aí, meu chapa! Preparado para dominar o domínio? Kkkk, o que vai querer saber hoje?`,
        `Olá! ${userName}, como anda a vida? Estou pronto para te auxiliar hoje!`,
        `${userName} parceiro(a)! Vamos botar pra quebrar? O que vai ser hoje?`,
        `${userName}? E aí, chuchu! Pronto para bater um papo?`,
        `Olá, ${userName}, estou à disposição para te auxiliar!`,
        `${userName}, tudo tranquilo? Estou aqui para te ajudar, firme e forte!`,
        `Ei, ${userName}! Tô aqui para desenrolar qualquer situação!`,
        `Hey, ${userName}, beleza? Estou pronto para te dar uma força!`,
        `Olá, pipoca! Bora resolver essas paradas?`,
        `Oi, pão na chapa! Como posso facilitar o seu dia?`,
        `Olá, ovo frito! Estou à disposição para te auxiliar!`
    ];

    // Escolhe uma mensagem aleatória da lista
    const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

    addMessageToChatBox("Bot", mensagemAleatoria);
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

    // Substitui a URL diretamente pelo link formatado com target="_blank"
    return text.replace(urlPattern, function(url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}
