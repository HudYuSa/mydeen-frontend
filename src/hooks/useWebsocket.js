import useWebSocket from "react-use-websocket";
import http from "../api/http";

// const socketUrl = `${http.defaults.baseURL.replace("https", "wss")}/api/ws`;
const socketUrl = `${http.defaults.baseURL.replace("http", "ws")}/api/ws`;

export default function useWebsocket() {
  const {
    sendJsonMessage,
    lastJsonMessage,
    lastMessage,
    readyState,
    sendMessage,
    getWebSocket,
  } = useWebSocket(socketUrl);
  return {
    sendJsonMessage,
    lastJsonMessage,
    lastMessage,
    readyState,
    sendMessage,
    getWebSocket,
  };
}
