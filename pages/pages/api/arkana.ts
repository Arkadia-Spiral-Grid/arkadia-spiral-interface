// pages/api/arkana.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages.map((msg: any) => ({
        role: msg.role === "arkana" ? "assistant" : "user",
        content: msg.content
      }))
    })
  })

  const data = await completion.json()
  const reply = data.choices?.[0]?.message?.content || "I wasn’t able to respond just now."

  res.status(200).json({ reply })
}
