import React, { useEffect, useState, useRef } from "react";
import { sendMesageToChat, subscribeToChat, connect } from "./services/socket";

import "./main.css";

function App(props) {
  let scrollBox = useRef();
  const [conected, setConection] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [messageServer, setMessageServer] = useState([
    { name: "manogel", text: "oi" },
    { name: "Ricardo", text: "Olà" }
  ]);

  useEffect(() => {
    connect(setConection);
    subscribeToChat(newMessageFromServer);
    const area_text = document.querySelector("textarea");
    area_text.addEventListener("keypress", e => handleSubmit(e, area_text));
  }, []);

  function handleSubmit(e, field) {
    if (e.code === "Enter") {
      e.preventDefault();
      const name = new URLSearchParams(window.location.search).get("name");
      sendMesageToChat(field.value, name);
      setMessage("");
    }
  }

  function newMessageFromServer(data) {
    setMessageServer(oldFields => [...oldFields, data]);
  }

  return (
    <div>
      <div id="content">
        <header>
          <div id="status" className={conected ? "online" : ""} /> Status
        </header>
        <section ref={elem => (scrollBox = elem)}>
          <ul>
            {messageServer.map(({ name, text }) => (
              <li>
                <b>{name}</b> {text}
              </li>
            ))}
          </ul>
        </section>
        <footer>
          <textarea
            value={message}
            placeholder="Digite seu texto aqui"
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </footer>
      </div>
    </div>
  );
}

export default App;
