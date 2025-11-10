import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faLeaf, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = React.useRef(null);

  // Initialize session ID once
  useEffect(() => {
    let id = localStorage.getItem("session_id");
    
    if (!id) {
      id = uuidv4();
      localStorage.setItem("session_id", id);
    }
    
    setSessionId(id);
  }, []);
  
  // Load chat history after session ID is set
  useEffect(() => {
    if (sessionId) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/history/${sessionId}`)
        .then((res) => setChatHistory(res.data.chat_history))
        .catch((err) => console.error("Error loading chat history:", err))
        .finally(() => setIsLoading(false));
    }
  }, [sessionId]);

  // Scroll to bottom when chat history updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Handle input field changes
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid newline in input
      sendMessage();
    }
  };

  // Send message to backend
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const token = localStorage.getItem("token");
    
    // Add user message immediately for better UX
    setChatHistory((prev) => [
      ...prev,
      { sender: "You", message: message.trim() }
    ]);
    
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          session_id: sessionId,
          message: currentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setChatHistory((prev) => [
        ...prev,
        { sender: "Bot", message: res.data.response }
      ]);
    } catch (error) {
      console.error("Chat API error:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "Bot", message: "Something went wrong. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format message with plant disease recommendations
  const formatBotMessage = (message) => {
    // This could be expanded to add formatting for plant disease info
    return message;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md flex items-center">
        <div className="bg-white rounded-full p-2 mr-3">
          <FontAwesomeIcon icon={faLeaf} className="text-green-600 text-lg" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Plant Disease Assistant</h1>
          <p className="text-sm text-green-100">Ask questions about plant diseases and treatments</p>
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FontAwesomeIcon icon={faLeaf} className="text-green-500 text-4xl mb-3" />
            <p className="text-center max-w-sm">
              Welcome to the Plant Disease Assistant! Describe your plant's symptoms or upload an image for diagnosis.
            </p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`max-w-3/4 ${
                chat.sender === "You" 
                ? "ml-auto bg-green-600 text-white rounded-lg rounded-tr-none" 
                : "mr-auto bg-white text-gray-800 rounded-lg rounded-tl-none border border-gray-200"
              } px-4 py-3 shadow-sm`}
            >
              {chat.sender === "Bot" ? formatBotMessage(chat.message) : chat.message}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="mr-auto bg-white text-gray-800 rounded-lg rounded-tl-none border border-gray-200 px-4 py-3 shadow-sm flex items-center">
            <FontAwesomeIcon icon={faSpinner} className="text-green-600 mr-2 animate-spin" />
            Analyzing...
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <textarea
            className="flex-1 bg-transparent outline-none resize-none py-1 max-h-32"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Describe your plant's symptoms or ask a question..."
            rows={1}
          ></textarea>
          <button 
            className={`ml-2 rounded-full w-10 h-10 flex items-center justify-center ${
              message.trim() 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={sendMessage}
            disabled={!message.trim() || isLoading}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          Ask specific questions about plant diseases, symptoms, or treatments for better results.
        </div>
      </div>
    </div>
  );
};

export default Chatbot;