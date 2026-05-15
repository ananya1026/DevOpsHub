import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import axios from 'axios';
import './Chatbot.css';

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'bot', content: 'Hello! I\'m DevOpsHub Assistant. How can I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', {
        message: userMessage
      });
      setMessages(prev => [...prev, { role: 'bot', content: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error.' }]);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
      >
        <MessageCircle size={24} />
      </button>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h4>DevOpsHub Assistant</h4>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <p>{msg.content}</p>
              </div>
            ))}
            {loading && <div className="message bot"><p>Typing...</p></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me about courses..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};