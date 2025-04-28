"use client";

import { useState } from 'react';

export default function MiaChat() {
  const [msgs, setMsgs] = useState([{ from:'system', text:'I am Mia… ask me anything.' }]);
  const [inputText, setInputText] = useState('');

  async function send() {
    if (!inputText.trim()) return;
    const userMessage = { from: 'you', text: inputText };
    setMsgs(m => [...m, userMessage]);
    setInputText('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const { reply } = await res.json();
      const miaMessage = { from: 'mia', text: reply };
      setMsgs(m => [...m, miaMessage]);
    } catch (error) {
      console.error("Failed to fetch chat reply:", error);
      const errorMessage = { from: 'system', text: 'Sorry, I could not connect to the Oracle. Please try again later.' };
      setMsgs(m => [...m, errorMessage]);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black/80 text-white rounded-lg p-4 shadow-lg border border-cyan-500/50 z-50">
      <div className="h-64 overflow-y-auto mb-2 pr-2 scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-900">
        {msgs.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === 'mia' ? 'text-cyan-300' : 'text-gray-200'}`}>
            <strong className="capitalize">{m.from === 'mia' ? 'Mia' : m.from}</strong>: {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow bg-gray-800 p-2 rounded-l focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask Mia..."
        />
        <button
          className="px-4 bg-cyan-500 hover:bg-cyan-600 rounded-r transition-colors duration-200"
          onClick={send}
        >
          →
        </button>
      </div>
    </div>
  );
}

