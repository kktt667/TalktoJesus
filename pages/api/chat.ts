import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, chatId } = req.body;
    const systemPrompt = getSystemPrompt(chatId);

    // Using fetch instead of OpenAI client to avoid dependency issues
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('DeepSeek API Error:', errorData);
      
      // More specific error handling
      if (!process.env.DEEPSEEK_API_KEY) {
        throw new Error('API key not configured');
      }
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    return res.status(200).json({ 
      response: data.choices?.[0]?.message?.content || 'I apologize, but I am unable to provide a response at this moment. Please try again.'
    });
  } catch (error) {
    console.error('Error:', error);
    // Return a graceful error message
    return res.status(500).json({ 
      response: "My child, I apologize but I am unable to respond at this moment. Please try again and I will be here to guide you."
    });
  }
} 