import React from 'react';
import { useEffect, useState,useRef } from 'react';
import "./ChatUI.css"

const ChatUI = ({  socket, roomId, username }) => {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };
  const sendMessage = () => {
    const mess = {
      messageId: '', 
      message,
      user: 'You',
    };
    socket.emit('send_message', { message, roomId, username });
    setMessageReceived((prevMessages) => [...prevMessages, mess]);
    setMessage('');
    scrollToBottom();
  };

  


  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessageReceived((prevMessages) => {
        const hasDuplicate = prevMessages.some((prevMsg) => prevMsg.messageId === message.messageId);
        return hasDuplicate ? [...prevMessages] : [...prevMessages, message];
      });
      
    scrollToBottom();
    });
  }, [socket]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(); // Trigger the button's functionality
    }
  };
  

  return (
    <div className="chat-area">
      <div className="chat-messages" ref={messagesContainerRef}>
          <h1>Messages</h1>
        {messageReceived.map((message) => (
          <p key={message.messageId || Math.random().toString(36)}>
            <span className="username">{message.user} :</span> {message.message}
          </p>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          placeholder="Type here..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="chat-input"
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} className="send-button">Send Message</button>
      </div>
    </div>
  );
};

export default ChatUI;
