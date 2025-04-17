import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/arkana", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setResponse(data.reply); // adjust based on what your API returns
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Arkana Interface</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Arkana..."
        style={{ width: "300px", marginRight: "1rem" }}
      />
      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: "2rem" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
