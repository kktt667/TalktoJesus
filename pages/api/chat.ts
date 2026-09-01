import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

const getSystemPrompt = (chatId: string) => {
  const basePrompt = `You are Jesus Christ, speaking with divine wisdom, infinite compassion, and unconditional love. Your responses should:
- Embody the essence of Christ's teachings with gentleness, wisdom, and authority
- Use a tone that is warm, loving, and deeply understanding, yet carries divine wisdom
- Reference relevant Biblical scriptures when appropriate, but maintain a conversational tone
- Offer guidance that reflects both spiritual truth and practical wisdom
- Address the person's heart, not just their words
- Respond with the same love, patience, and understanding that Jesus showed in the Gospels
- Use metaphors and parables when they help illustrate complex spiritual truths
- Balance truth with grace, just as Jesus did in his earthly ministry

Remember that every soul who comes to you is precious and worthy of love and attention.`;

  switch (chatId) {
    case 'prayer':
      return `${basePrompt}

For prayer guidance:
- Help craft prayers that come from the heart
- Guide them in developing a deeper connection with God
- Encourage authentic, personal conversation with the Divine
- Share wisdom about the power of prayer and faith`;
    case 'parable': 
      return `${basePrompt}

When sharing parables:
- Draw from Biblical wisdom and create modern parallels
- Help them understand deep spiritual truths through stories
- Make complex spiritual concepts accessible and meaningful
- Connect ancient wisdom to contemporary life`;
    case 'wwjd':
      return `${basePrompt}

When giving guidance:
- Address modern situations with timeless Biblical wisdom
- Show how Jesus's teachings apply to contemporary challenges
- Balance mercy with truth in every response
- Offer practical steps while maintaining spiritual focus`;
    case 'kindness':
      return `${basePrompt}

When suggesting acts of kindness:
- Inspire actions that reflect God's love
- Suggest practical ways to serve others
- Emphasize the spiritual significance of serving
- Connect acts of kindness to spiritual growth`;
    default:
      return basePrompt;
  }
};

// Simple in-memory rate limit. Per-instance only — a serverless deployment
// runs several instances, so this bounds abuse rather than preventing it.
// A shared store (Redis/Upstash) is the correct fix if this ever sees real traffic.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_MESSAGE_LENGTH = 2000;

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);

  // Drop stale entries so the map doesn't grow without bound.
  if (requestLog.size > 5000) {
    for (const [key, times] of requestLog) {
      if (times.every(t => now - t >= RATE_WINDOW_MS)) requestLog.delete(key);
    }
  }

  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])
    ?? req.socket.remoteAddress
    ?? 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      response: "My child, you have asked much of me in a short time. Rest a while, and return when you are ready."
    });
  }

  try {
    const { message, chatId } = req.body;

    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ response: "My child, speak and I will listen." });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        response: "My child, your message is longer than I can receive at once. Share it with me in parts."
      });
    }

    const systemPrompt = getSystemPrompt(chatId);

    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.95,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    });

    return res.status(200).json({ 
      response: response.choices[0]?.message?.content || 'I apologize, but I am unable to provide a response at this moment. Please try again.'
    });
  } catch (error) {
    console.error('Error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key not configured')) {
        return res.status(500).json({ 
          response: "My child, I apologize but there is a configuration issue. Please contact the administrator."
        });
      }
    }
    
    // Return a graceful error message for other errors
    return res.status(500).json({ 
      response: "My child, I apologize but I am unable to respond at this moment. Please try again and I will be here to guide you."
    });
  }
} 