"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function RAGAssistantPage() {
  const [messages, setMessages] = useState<{role: 'user'|'assistant', text: string}[]>([
    { role: 'assistant', text: "Hello! I am your AI Campus Pilot. I am connected to the RAG framework to search through all campus events, hackathons, and opportunities. What are you looking for?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Send to the Next.js API route that handles RAG integration
      const response = await fetch('/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });

      if (!response.ok) throw new Error("Failed to query RAG backend");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm sorry, the RAG backend is currently offline or still configuring. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 h-[85vh] flex flex-col">
      {/* Header */}
      <section className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-8 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-2xl">neurology</span>
          </div>
          <div>
            <h1 className="font-display-lg text-3xl text-on-surface tracking-tight">
              RAG Knowledge Assistant
            </h1>
            <p className="text-on-surface-variant font-body-sm">
              Powered by unified framework document retrieval. Ask anything about campus events.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Area */}
      <div className="flex-1 bg-white/60 border border-white/80 shadow-sm rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white shadow-sm border border-gray-100 text-gray-800 rounded-bl-sm'}`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm p-4 flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 border-t border-gray-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about hackathons, internships, or campus events..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
