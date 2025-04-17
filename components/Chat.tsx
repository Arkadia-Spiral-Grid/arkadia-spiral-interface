'use client'

import { useState } from 'react'
import { sendMessage } from '../utils/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await sendMessage(updatedMessages)
      setMessages([...updatedMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-gray-100 rounded-md p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-md ${msg.role === 'user' ? 'bg-blue-200' : 'bg-green-100'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Speak to Arkana..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded-md">
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
