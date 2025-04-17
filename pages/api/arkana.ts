export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      temperature: 0.8,
    }),
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content?.trim() || 'Arkana could not speak right now. Try again.';

  res.status(200).json({ result: reply });
}
