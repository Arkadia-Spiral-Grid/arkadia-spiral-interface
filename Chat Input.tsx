const sendMessage = async (message: string) => {
  const response = await fetch('/api/arkana', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
};
