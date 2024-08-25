document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    fetch('/chat', {
        method: 'POST',
        body: new URLSearchParams({ 'user_input': userInput }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.response, 'bot');
    });
});

function addMessage(content, type) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.classList.add('chat-message', type);
    message.textContent = content;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
