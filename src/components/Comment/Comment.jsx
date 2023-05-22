import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import "./Comment.css";

const Comment = () => {
  const [messages, setMessages] = useState([]);
  const { email, user } = useAuth();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user1")) || [];
    localStorage.setItem("user1", JSON.stringify(data));
  }, []);

  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setNewMessage("");

      const obj = { user1: updatedMessages };
      const data = JSON.parse(localStorage.getItem("user1"));
      data.push(obj);
      localStorage.setItem("user1", JSON.stringify(data));
    }
  };

  return (
    <div className="forum-container">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <div className="avatar">
                <img
                  src="https://www.pngall.com/wp-content/uploads/10/Message-Logo-PNG-Photo.png"
                  alt="Avatar"
                />
              </div>
              <div>
                <h2>{user.email}</h2>
                <h5>{Date()}</h5>
              </div>
              <div className="content">{message}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Введите ваш отзыв"
          />
          <button onClick={handleSendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
