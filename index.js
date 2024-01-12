// Function to toggle chat container
function toggleChatBox() {
    // Get the chat container
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.toggle('hidden');

    // Get the toggle button
    const toggleBtn = document.querySelector('.caret-down');
    if (toggleBtn) {
        // Check the current SVG state and switch to the other state
        if (toggleBtn.getAttribute('data-state') === 'up') {
            toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path></svg>';
            toggleBtn.setAttribute('data-state', 'down');
        } else {
            toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>';
            toggleBtn.setAttribute('data-state', 'up');
        }
    }
}

// Initial state of the button
const toggleBtn = document.querySelector('.caret-down');
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

    // Add image before the message
    if (role === 'bot' || role === 'hannah') {
        const imageElement = document.createElement('img');
        imageElement.src = `./images/${role}.svg`;
        imageElement.alt = `${role}-icon`;
        messageElement.appendChild(imageElement);
    }

    // Add text content
    const textElement = document.createElement('div');
    textElement.textContent = text;
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);

    // Add activity status after hannah message
    if (role === 'hannah') {
        const activityStatus = document.createElement('div');
        activityStatus.classList.add('activity-status');
        activityStatus.textContent = 'Hannah・Just now';
        chatBox.appendChild(activityStatus);
    }
}

// Function to simulate typing effect
function simulateTyping() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'Typing...';
    chatBox.appendChild(typingIndicator);
}

// Simulate a conversation with delays between messages
function simulateConversation() {
    messages.forEach((message, index) => {
        const delay = index * 2000;
        setTimeout(() => {
            // Remove typing indicator if present
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            // Add the message to the chat box
            addMessage(message.role, message.text);

            // Simulate typing for the next message (except for the last message)
            if (index < messages.length - 1) {
                simulateTyping();
            } else {
                // Add activity status after the last user message
                const activityStatus = document.createElement('div');
                activityStatus.classList.add('activity-status');
                activityStatus.textContent = 'Just now・Not seen yet';
                chatBox.appendChild(activityStatus);
            }
        }, delay);
    });
}
// Start the conversation simulation after a delay
setTimeout(simulateConversation, 1000);
