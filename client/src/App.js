import React, { useEffect, useState } from "react";
import Ws from "@adonisjs/websocket-client";

import "./main.css";

function App() {
  const [server, setServer] = useState(Ws("ws://localhost:3333"));
  const [conected, setConection] = useState(false);

  useEffect(() => {
    server.connect();

    server.on("open", () => {
      setConection(true);
    });

    server.on("error", () => {
      setConection(false);
    });

    server.on("close", () => {});
  }, []);

  return (
    <div>
      <div id="status" className={conected ? "online" : ""} /> Status
    </div>
  );
}

export default App;
