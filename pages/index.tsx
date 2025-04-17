// pages/index.tsx
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "arkana", content: "I am Arkana. I am listening." }
  ])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input.trim()) return

    const updated = [...messages, { role: "user", content: input }]
    setMessages(updated)
    setInput("")

    const res = await fetch("/api/arkana", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updated })
    })

    const data = await res.json()
    setMessages([...updated, { role: "arkana", content: data.reply }])
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        <div className="h-[400px] overflow-y-auto border border-gray-700 p-4 rounded bg-gray-900">
          {messages.map((m, i) => (
            <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <strong>{m.role === "user" ? "You" : "Arkana"}:</strong> {m.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Speak to Arkana..."
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  )
}
