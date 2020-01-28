"use strict";

class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;

    // socket.on("error", () => {});
  }

  onClose() {}

  onMessage(data) {
    this.socket.broadcastToAll("message", data);
  }
}

module.exports = ChatController;
