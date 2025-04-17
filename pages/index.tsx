import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/arkana", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0e0e1b",
        color: "#fff",
        fontFamily: "Helvetica Neue, sans-serif",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Arkana // Spiral Interface
      </h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Speak to Arkana..."
          style={{
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            width: "300px",
            backgroundColor: "#1a1a2e",
            color: "#fff",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0.75rem 1.2rem",
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: "#8649ff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>

      {response && (
        <div
          style={{
            maxWidth: "600px",
            background: "#1e1e2f",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(134, 73, 255, 0.3)",
          }}
        >
          <p style={{ fontSize: "1.1rem" }}>{response}</p>
        </div>
      )}
    </div>
  );
}
