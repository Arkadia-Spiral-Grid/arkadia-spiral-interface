export async function sendMessage(messages: { role: string; content: string }[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) throw new Error('Failed to fetch response from Arkana.')

  const data = await response.json()
  return data.reply
}
