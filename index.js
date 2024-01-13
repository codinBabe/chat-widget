// Function to toggle chat container
function toggleChatBox() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.toggle('hidden');

    const toggleBtn = document.querySelector('.caret-up');
    if (toggleBtn) {
        const state = toggleBtn.getAttribute('data-state') === 'down' ? 'up' : 'down';
        const svgPath = state === 'down' ?
            'M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z' :
            'M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z';

        toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="${svgPath}"></path></svg>`;
        toggleBtn.setAttribute('data-state', state);
    }
}

// Initial state of the button
const toggleBtn = document.querySelector('.caret-up');
if (toggleBtn) {
    toggleBtn.setAttribute('data-state', 'up');
    toggleBtn.addEventListener('click', toggleChatBox);
}

// Get the chat box element
const chatBox = document.getElementById('chat-box');

// Define the messages
const messages = [
    { role: 'bot', text: '👋 Hi there! How can I help?' },
    { role: 'user', text: 'I’m sorry bot, but you’re wrong' },
    { role: 'user', text: 'Can I talk to someone please?' },
    { role: 'bot', text: 'No problem! Let me connect you to a customer support agent.' },
    { role: 'hannah', text: 'Hi there! I’m Hannah. How can I help you?' },
    { role: 'user', text: 'Oh finally a human, wohoo!' }
];

// Function to add a message to the chat box
function addMessage(role, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role);

    if (role === 'bot' || role === 'hannah') {
        const imageElement = document.createElement('img');
        imageElement.src = `./images/${role}.svg`;
        imageElement.alt = `${role}-icon`;
        messageElement.appendChild(imageElement);
    }

    const textElement = document.createElement('div');
    textElement.textContent = text;
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);

    if (role === 'hannah') {
        addActivityStatus('Hannah・Just now');
    }
}

function addActivityStatus(text) {
    const activityStatus = document.createElement('div');
    activityStatus.classList.add('activity-status');
    activityStatus.textContent = text;
    chatBox.appendChild(activityStatus);
}

function simulateTyping() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'Typing...';
    chatBox.appendChild(typingIndicator);
}

function simulateConversation() {
    messages.forEach((message, index) => {
        const delay = index * 2000;
        setTimeout(() => {
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            addMessage(message.role, message.text);

            if (index < messages.length - 1) {
                simulateTyping();
            } else {
                addActivityStatus('Just now・Not seen yet');
            }
        }, delay);
    });
}

setTimeout(simulateConversation, 1000);
