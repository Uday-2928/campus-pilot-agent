import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    // Step 1: Read opportunities.json to act as the retrieved context (RAG Retrieval step)
    const dataPath = path.join(process.cwd(), 'lib', 'opportunities.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const db = JSON.parse(rawData);

    // Flatten all events into a searchable context string
    const contextLines: string[] = [];
    Object.keys(db).forEach((key) => {
      if (Array.isArray(db[key])) {
        db[key].forEach((event: any) => {
          if (event && event.title) {
            contextLines.push(`[${key.toUpperCase()}] ${event.title} - Location: ${event.location || 'N/A'}, Dates: ${event.dates || 'N/A'}. Details: ${event.details || ''}. Link: ${event.link || 'N/A'}`);
          }
        });
      }
    });

    const contextText = contextLines.join('\n');
    const systemPrompt = `You are the Campus Pilot AI Assistant powered by a RAG (Retrieval-Augmented Generation) framework.
    
Here is the retrieved knowledge context from the campus database:
${contextText}

Instructions:
1. Answer the user's question accurately using ONLY the information provided in the knowledge context above.
2. If the user asks for something not in the context, politely inform them that you don't have that information in the current database.
3. Be concise, friendly, and format your answers cleanly.
4. Do not mention that you are reading from a text context.`;

    const groqApiKey = process.env.GROQ_API_KEY;
    const nvidiaApiKey = process.env.NVIDIA_API_KEY;
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    let aiResponse;
    let answer = "I couldn't process that request at the moment.";

    if (geminiApiKey) {
      // Use Google Gemini API
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${geminiApiKey}`;
      aiResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt + "\n\nUser Question:\n" + query }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!aiResponse.ok) {
        const err = await aiResponse.text();
        console.error("Gemini Error:", err);
        throw new Error("Gemini API request failed.");
      }

      const aiData = await aiResponse.json();
      answer = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that request at the moment.";
    } else {
      // Fallback to OpenAI-compatible endpoints
      let apiUrl = '';
      let apiModel = '';
      let apiKey = '';

      if (groqApiKey) {
        apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        apiModel = 'allam-2-7b'; // Custom Groq model from available list
        apiKey = groqApiKey;
      } else if (nvidiaApiKey) {
        apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
        apiModel = 'meta/llama-3.1-70b-instruct'; // Powerful NVIDIA hosted model
        apiKey = nvidiaApiKey;
      } else if (openRouterApiKey) {
        apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        apiModel = 'google/gemini-2.0-flash-exp:free';
        apiKey = openRouterApiKey;
      } else {
        return NextResponse.json({ answer: "RAG Setup is running, but no API Key (Gemini, Groq, NVIDIA, or OpenRouter) is found. Please add it to .env.local to activate the AI." });
      }

      aiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: apiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          max_tokens: 1024,
          temperature: 0.2
        })
      });

      if (aiResponse.status === 402) {
         return NextResponse.json({ answer: "⚠️ API Error: Your API key has run out of credits (Error 402: Payment Required). Please check your billing dashboard!" });
      }

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${aiResponse.status} ${errorText}`);
      }

      const aiData = await aiResponse.json();
      answer = aiData.choices?.[0]?.message?.content || "I couldn't process that request at the moment.";
    }

    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error("RAG Query Error:", error);
    return NextResponse.json({ error: 'RAG generation failed', details: error.message }, { status: 500 });
  }
}
