import Ws from "@adonisjs/websocket-client";

const socket = Ws("ws://localhost:3333");
let chat;

function connect(setStatus) {
  socket.connect();

  socket.on("open", () => {
    setStatus(true);
  });

  socket.on("error", () => {
    setStatus(false);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

function sendMesageToChat(message, username) {
  chat.emit("message", { text: message, name: username });
}

function subscribeToChat(newMessageFromServer) {
  chat = socket.subscribe("chat");
  chat.on("message", newMessageFromServer);
}

export { connect, disconnect, sendMesageToChat, subscribeToChat };
