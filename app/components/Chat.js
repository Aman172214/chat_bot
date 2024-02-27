"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

const sendMessage = async (message) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: "user", content: message }],
        max_tokens: 100,
        model: "gpt-3.5-turbo-0125",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );
    const botResponse = response.data.choices[0].message.content.trim();
    return botResponse;
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return "Sorry, an error occurred while processing your request.";
  }
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      setIsLoading(true);
      const userMessage = { message, type: "user" };
      setChatHistory((prevChatHistory) => [...prevChatHistory, userMessage]);

      const botMessagePlaceholder = {
        message: "...",
        type: "bot",
        isLoading: true,
      };
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        botMessagePlaceholder,
      ]);

      const botResponse = await sendMessageMutation.mutateAsync(message);

      const formattedBotMessage = {
        message: botResponse.trim(),
        type: "bot",
        isLoading: false,
      };
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory.filter((msg) => msg.isLoading !== true),
        formattedBotMessage,
      ]);

      queryClient.invalidateQueries("chatHistory");
      setMessage("");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sendMessageMutation = useMutation(sendMessage);

  return (
    <div className="p-4">
      <div>
        {chatHistory.map((entry, index) => (
          <div key={index}>
            {entry.type === "bot" ? (
              <h3 className="text-lg mt-2">
                AI: {entry.isLoading ? "..." : entry.message}
              </h3>
            ) : (
              <h3 className="text-lg mt-2">User: {entry.message}</h3>
            )}
          </div>
        ))}
      </div>

      <textarea
        ref={inputRef}
        rows={1}
        placeholder={"What are data structures and algorithims?"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-6 w-full bg-slate-600 p-2 rounded"
      />

      <button
        onClick={handleSendMessage}
        className="rounded-md bg-blue-600 p-2 mt-2"
      >
        Ask anything!
      </button>
    </div>
  );
};

export default Chat;
