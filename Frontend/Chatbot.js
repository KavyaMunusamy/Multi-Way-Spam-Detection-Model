import React, { useEffect, useState } from 'react';
//import './chatbot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Fuse from 'fuse.js';
import ReactMarkdown from 'react-markdown';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  const predefinedResponses = [
    { question: "How does AdShield detect spam messages?", response: "AdShield uses NLP-based text analysis, keyword filtering, and machine learning models to detect spam messages in social media ads and private messages." },

    { question: "What are some common spam messages detected by AdShield?", response: "AdShield detects spam messages such as: \n 1. **Fake Giveaways** - 'Congratulations! You’ve won an iPhone 15! Click here to claim your prize.' \n 2. **Scam Job Offers** - 'Earn $5000/week from home. No experience needed! DM now.' \n 3. **Phishing Links** - 'Your account has been compromised! Verify your details here: [Suspicious Link].' \n 4. **Fake Crypto Investments** - 'Invest $100 and get $5000 guaranteed! Join now: [Fraudulent Link].' \n 5. **Clickbait Ads** - 'OMG! This celebrity just exposed their secret! Watch the shocking video now!' " },

    { question: "Can AdShield analyze private messages for spam detection?", response: "Yes, AdShield can analyze direct messages and comments for spam content, using AI-based pattern recognition." },

    { question: "How does AdShield differentiate spam from legitimate messages?", response: "AdShield detects spam based on suspicious links, excessive promotions, deceptive language, repeated patterns, and previous scam reports." },

    { question: "What is an example of a phishing spam message?", response: "Example: 'URGENT! Your bank account has been locked. Click here to verify your details: [FakeBank.com]'. This is a classic phishing attempt." },

    { question: "What is an example of a fake e-commerce spam message?", response: "Example: 'FLASH SALE: MacBook Pro for just $199! Limited stock! Order now: [ScamWebsite.com]'. This type of ad usually leads to fraud." },

    { question: "What is an example of a romance scam spam message?", response: "Example: 'Hey handsome, I saw your profile and I think we’re a perfect match! Let’s chat on WhatsApp: [Scammer’s Number]'. These messages are often used to trick victims into sending money." },

    { question: "What is an example of a Ponzi scheme spam message?", response: "Example: 'Join our VIP investment club. Earn 300% returns in just 7 days! DM for details!' These are often illegal investment scams." },

    { question: "Can AdShield block spam messages automatically?", response: "Yes, AdShield can flag and filter spam messages in real-time, preventing users from clicking on harmful links." },

    { question: "How does AdShield analyze spam in video ads?", response: "AdShield extracts text from video captions and transcriptions, detecting scam messages hidden in video content." },

    { question: "Can AdShield detect fake customer reviews?", response: "Yes, AdShield analyzes review patterns, sentiment scores, and duplicate content to identify fake customer reviews used in scam advertisements." },

    { question: "Does AdShield support real-time spam detection?", response: "Yes, AdShield uses real-time AI scanning to instantly detect and flag spam content before users interact with it." },

    { question: "How does AdShield detect spam links?", response: "AdShield cross-checks suspicious URLs against a database of known phishing and scam websites, detecting fraudulent links in ads and messages." },

    { question: "Can users report spam messages to AdShield?", response: "Yes, users can manually report spam messages, and AdShield will verify them using AI-based spam detection techniques." },

    { question: "What types of spam keywords does AdShield look for?", response: "AdShield flags spam messages containing phrases like 'Free money', 'Click here now', 'Limited time offer', 'Guaranteed profits', and other high-risk keywords." },

    { question: "Can AdShield detect spam emails?", response: "Currently, AdShield is focused on social media spam detection, but future updates may include email spam filtering." }
];

  // Set up fuzzy search options
  const fuse = new Fuse(predefinedResponses, {
    keys: ['question'],
    threshold: 0.3, // Adjust this to be more or less strict
  });

  useEffect(() => {
    // Initial setup
  }, []);

  const handleMessageSend = async () => {
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      // Search for the best match
      const result = fuse.search(input);
      if (result.length > 0) {
        const response = result[0].item.response;
        const botMessage = { text: response, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        // If no predefined response matches, fallback to AI
        const generationConfig = {
          stopSequences: ["red"],
          maxOutputTokens: 200,
          temperature: 0.9,
          topP: 0.1,
          topK: 16,
        };

        // Send user's message to the bot and get response
        try {
          const genAI = new GoogleGenerativeAI("AIzaSyDrNIjN3ksV6le2uMB4pC2RLIRr6obpajo");
          const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
          const chat = model.startChat();
          const result = await chat.sendMessage(input);
          const response = await result.response;
          const text = response.text();
          console.log("Response from AI:", text); // Debugging response
          const botMessage = { text: text, sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
          console.error("Error sending message to bot:", error);
        }
      }
    }
  };

  return (
    <div className="chat-container"  style={{height:"600px", width:"1000px"}}>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'bot' ? (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend();
            }
          }}
        />
        <button onClick={handleMessageSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;