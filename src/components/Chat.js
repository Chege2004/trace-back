import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ recipientId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/chats/${recipientId}`, {
            headers: { Authorization: `Bearer ${token}` },
            });
        setMessages(response.data);
        };
        fetchMessages();
    }, [recipientId]);

    const handleSendMessage = async () => {
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:5000/chats',
            { recipient_id: recipientId, message: newMessage },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewMessage('');
    // Refresh messages after sending
        const response = await axios.get(`http://localhost:5000/chats/${recipientId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
    };

    return (
        <div>
            <h3>Chat</h3>
            <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '300px', overflowY: 'scroll' }}>

                {messages.map((msg, index) => (
                    <p key={index}>
                    <strong>{msg.sender_id === parseInt(localStorage.getItem('userId')) ? 'You' : 'User'}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default Chat;
