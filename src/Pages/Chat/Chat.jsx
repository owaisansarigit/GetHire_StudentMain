import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { GetApi } from "../utilis/Api_Calling";

// const socket = io("http://localhost:5000", { withCredentials: true });
// const socket = io("https://get-hire.vercel.app", { withCredentials: true });
const socket = io("https://gethire-backend.onrender.com", { withCredentials: true });

const ChatComponent = () => {
  const studentId = localStorage.getItem("Studentid");
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showOldMessages, setShowOldMessages] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});

  const getCompanies = async () => {
    try {
      const response = await GetApi("api/adminroutes/GetAllCompany");
      setCompanies(response?.data?.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoadingCompanies(false);
    }
  };

  const getMessages = async (conversationId) => {
    try {
      setLoadingMessages(true);
      const response = await GetApi(
        `api/chatroutes/conversations/${conversationId}/messages`
      );
      setMessages(response?.data?.data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    getCompanies();
    socket.emit("userConnected", studentId);

    socket.on("userStatus", ({ userId, online }) => {
      setOnlineUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: online,
      }));
      console.log(userId);
    });

    return () => {
      socket.emit("userDisconnected");
      socket.off("userStatus");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentConversationId) {
      socket.emit("joinConversation", currentConversationId);
      getMessages(currentConversationId);

      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [currentConversationId]);

  const sendMessage = () => {
    if (message.trim() && currentConversationId) {
      const data = {
        conversationId: currentConversationId,
        senderId: studentId,
        senderType: "Student",
        message,
      };
      socket.emit("sendMessage", data);
      setMessage("");
    }
  };

  const handleCompanyClick = async (companyId, company) => {
    try {
      setSearchQuery("");
      const response = await GetApi(
        `api/chatroutes/conversation/${studentId}/${companyId}`
      );
      setCurrentConversationId(response?.data?.data?._id);
      setCurrentCompany(company);
      setMessages([]);
      setShowOldMessages(false);
    } catch (error) {
      console.error("Error fetching or creating conversation:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadOldMessages = () => {
    setShowOldMessages(false);
  };

  return (
    <div className="flex overflow-hidden min-h-full max-h-full">
      <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Companies</h2>
        {loadingCompanies ? (
          <p>Loading companies...</p>
        ) : (
          <ul>
            <li>
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full p-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </li>
            {companies.map((company) => (
              <li
                key={company._id}
                className={`p-2 hover:bg-gray-200 mt-1 cursor-pointer rounded-lg 
                  ${searchQuery !== "" ? "font-semibold" : ""}
                  ${
                    company._id === currentCompany?._id
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                onClick={() => handleCompanyClick(company._id, company)}
              >
                {company.Name}
                {onlineUsers[company._id] ? (
                  <span className="ml-2 text-green-500">●</span>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-3/4 flex flex-col relative max-h-[86vh] overflow-hidden">
        {currentCompany && (
          <div className="p-2 bg-blue-400 text-white text-lg font-semibold rounded-t flex flex-col">
            {currentCompany.Name}
            <span className="text-sm">{currentCompany.Email}</span>
          </div>
        )}
        <div
          className="flex-1 p-4 overflow-y-auto bg-gray-100"
          style={{ paddingBottom: "4rem" }}
        >
          {loadingMessages ? (
            <p className="mx-auto">Loading messages...</p>
          ) : (
            <div className="messages flex flex-col p-2">
              {showOldMessages && (
                <button
                  onClick={loadOldMessages}
                  className="text-blue-500 mb-2 self-center"
                >
                  Load older messages
                </button>
              )}
              {messages?.slice(-10).map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg inline-block max-w-xs ${
                    msg.senderId === studentId
                      ? "bg-blue-200 self-end text-right"
                      : "bg-gray-200 text-left self-start"
                  }`}
                >
                  <div>{msg.message}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full flex p-4 bg-white border-t border-gray-300">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-blue-500 text-white rounded-lg p-2"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
