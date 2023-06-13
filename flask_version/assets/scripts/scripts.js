document.addEventListener("DOMContentLoaded", function () {
    // document.getElementById('saveButton').addEventListener('click', () => {
    //   const data = { asdf: 'someValue' };
    //   console.log("brother");
    //   window.api.send('save-data', data);
    // });

    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatInput = document.querySelector('#chat-input input');

    function handleMessage() {
        const message = userInput.value;
        userInput.value = '';
        addMessage('You', message);

        fetch('http://localhost:5000/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        })
            .then(response => response.json())
            .then(data => {
                const chatbotResponse = data.message;
                addMessage('Chatbot', chatbotResponse);
            })
            .catch(error => console.error(error));
    }
    function addMessage(user, message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');

        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerText = user;
        messageWrapper.appendChild(userElement);

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        // Split the message into parts using "```" as a separator
        const parts = message.split("```");

        // Loop through the parts and create an element for each part
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            // If this is an odd-numbered part (i.e. it was enclosed in "```"), create a div element and apply the code-block style
            if (i % 2 === 1) {

                const div = document.createElement('div');
                div.classList.add('code-block');
                div.innerText = part;

                // Add an event listener to save the code block content to the sidebar when clicked
                div.addEventListener('click', () => {
                    saveToSidebar(part);
                });
                messageElement.appendChild(document.createElement("br"));
                messageElement.appendChild(div);
                messageElement.appendChild(document.createElement("br"));
            } else {
                // Otherwise, create a span element
                const span = document.createElement('span');
                span.innerText = part;
                messageElement.appendChild(span);
            }
        }

        messageWrapper.appendChild(messageElement);

        chatMessages.appendChild(messageWrapper);
    }

    // Function to save content to the sidebar
    function saveToSidebar(content) {
        // Get a reference to the sidebar element
        const sidebar = document.getElementById('sidebar');

        // // Create a new paragraph element with the content
        // const p = document.createElement('p');
        // p.innerText = content;

        // // Append the paragraph element to the sidebar
        // sidebar.appendChild(p);
        console.log(content);

        // Save the content to local storage
        let savedContent = localStorage.getItem('sidebarContent');
        if (savedContent) {
            savedContent = JSON.parse(savedContent);
        } else {
            savedContent = [];
        }
        savedContent.push(content);
        localStorage.setItem('sidebarContent', JSON.stringify(savedContent));
    }

    // chatInput.addEventListener('keydown', (event) => {
    //   if (event.keyCode === 13) {
    //     handleMessage();
    //   }
    // });

    sendButton.addEventListener('click', handleMessage);

    // Get references to the toggle button and sidebar
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    // Add an event listener to the toggle button
    toggleButton.addEventListener('click', () => {
        // Toggle the "visible" class on the sidebar and toggle button
        sidebar.classList.toggle('visible');
        toggleButton.classList.toggle('visible');
    });

    // Add an event listener to the document object to close the sidebar when the user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove('visible');
            toggleButton.classList.remove('visible');
        }
    });

    function autoExpand(textarea) {
        // Reset field height
        textarea.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(textarea);

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                    + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
                    + textarea.scrollHeight;
                    
        textarea.style.height = height + 'px';
    };
    document.getElementById("user-input").addEventListener('input', function() {
        autoExpand(this);
    });

    document.getElementById('user-input').addEventListener('keydown', function (event) {
        // Check if the Enter key was pressed without the Shift key
        if (event.key === 'Enter' && !event.shiftKey) {
            // Prevent the default action (creating a new line)
            event.preventDefault();
            // Trigger the send action
            document.getElementById('send-button').click();
        }
    });

    document.getElementById("showSavedBlocksButton").addEventListener('click', () =>{
    
        fetch('/saved_data.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('main_block').innerHTML = html;
            });
    })
});
