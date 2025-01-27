import React, { useState } from 'react'
import './main.css'
import assets from '../../assets/assets'
import { GoogleGenerativeAI } from "@google/generative-ai"

const Main = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async(e) => {
    e.preventDefault();
    if (!message) return;

    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (import.meta.env.DEV) {
        console.log("Environment variables:", import.meta.env);
        console.log("API Key:", apiKey);
      }
      
      if (!apiKey) {
        throw new Error("API key is not configured. Check your .env file.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Add user message to chat
      setChats(prev => [...prev, { role: 'user', content: message }]);
      
      // Clear input
      setMessage("");

      const result = await model.generateContent(message);
      const response = await result.response.text();
      
      // Add AI response to chat
      setChats(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      console.error("Detailed error:", {
        message: error.message,
        stack: error.stack,
        details: error
      });
      setChats(prev => [...prev, { 
        role: 'ai', 
        content: `Error: ${error.message}. Please try again.` 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user} alt="" />
      </div>
      <div className="main-container">
        {chats.length === 0 ? (
          <div className="greet">
              <p><span>Hello, Chief</span></p>
              <p>How can I help you today?</p>
          </div>
        ) : (
          <div className="chat-container">
            {chats.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.role}`}>
                <img src={chat.role === 'ai' ? assets.gemini : assets.user} alt="" />
                <p>{chat.content}</p>
              </div>
            ))}
            {loading && (
                <div className="chat-message ai">
                    <img src={assets.gemini} alt="" />
                    <p>Thinking...</p>
                </div>
            )}
          </div>
        )}
        
        {/* Only show cards when there are no chats */}
        {chats.length === 0 && (
          <div className="cards">
            <div className="card">
                <p>Gemini AI's ability to guide users through processes, help with decision-making, or assist in exploring new ideas.</p>
                <img src={assets.compass} alt="" />
            </div>
            <div className="card">
                <p>Creative capabilities of Gemini AI, whether it's for brainstorming, generating new content, or offering inspiration.</p>
                <img src={assets.bulb} alt="" />
            </div>
            <div className="card">
                <p>Engage in conversation with Gemini AI, where users can ask questions or have discussions on various topics.</p>
                <img src={assets.message} alt="" />
            </div>
            <div className="card">
                <p>AI's has ability to assist in coding tasks, generate code snippets, or automate repetitive tasks for developers.</p>
                <img src={assets.code} alt="" />
            </div>
          </div>
        )}

        <div className="main-bottom">
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder='Enter a Prompt here'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(e)}
                />
                <div>
                    <img 
                      src={assets.send} 
                      alt="" 
                      onClick={sendMessage}
                      style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so double-check its responses.  
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
