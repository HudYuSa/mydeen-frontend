import { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import useWebsocket from "../../hooks/useWebsocket";

const Question = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebsocket();

  useEffect(() => {
    console.log(
      "🚀 |~~| file: Question.jsx:13 |~~| lastJsonMessage:",
      lastJsonMessage,
    );
    if (lastJsonMessage !== null) {
      const receivedMessage = lastJsonMessage.content;
      console.log(
        "🚀 |~~| file: Question.jsx:18 |~~| receivedMessage:",
        receivedMessage,
      );
      setMessages((prev) => [...prev, receivedMessage]);
    }
  }, [lastJsonMessage, setMessages]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("🚀 |~~| file: Question.jsx:25 |~~| sending");
      console.log("🚀 |~~| file: Question.jsx:26 |~~| message:", message);
      sendJsonMessage({
        type: "createQuestion",
        event_id: "315e2b92-5f7b-4068-a170-0990fc235b13",
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div className="flex w-full gap-4 p-4">
        <input
          className="flex-grow border-2 pl-4"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="rounded-full bg-blue-400 px-4 py-2"
          onClick={sendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Question;
