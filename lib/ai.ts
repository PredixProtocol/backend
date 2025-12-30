import OpenAI from 'openai';
import type { AIAnalysisResult } from '../types/generate-market.types';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const SYSTEM_PROMPT = `You are an expert at analyzing social media posts to determine if they can be turned into prediction markets.

A prediction market is a market where people bet on the outcome of future events. Good prediction market questions should:
1. Have a clear, binary (YES/NO) outcome that can be verified
2. Be about a specific, time-bound event or claim
3. Have objective resolution criteria
4. Not be about personal opinions or subjective matters
5. Be about verifiable future events (elections, sports, product launches, policy decisions, etc.)

Bad prediction market candidates:
- Casual conversation or greetings
- Memes or jokes without predictable outcomes
- Personal opinions without verifiable claims
- Past events that have already been resolved
- Vague statements without clear outcomes

IMPORTANT:
- Respond ONLY with valid JSON
- Do not include markdown or extra text
- Follow the response schema strictly`;

interface AIPostInput {
  postText: string;
  authorName: string;
  authorUsername: string;
}

export async function analyzePostForMarket(input: AIPostInput): Promise<AIAnalysisResult> {
  const userPrompt = `Analyze this X (Twitter) post and determine if it can be turned into a prediction market.

Author: ${input.authorName} (@${input.authorUsername})
Post: "${input.postText}"

Respond with a JSON object in this exact format:
{
  "possible": true | false,
  "question": "Will [specific event] happen?",
  "description": "Detailed resolution criteria...",
  "probability": 50,
  "suggestedEndDays": 30,
  "rejectionReason": "Why this cannot be a prediction market"
}

Rules:
- If possible = false, ONLY fill possible and rejectionReason
- If possible = true, DO NOT include rejectionReason
- Probability must be an integer between 1 and 99
- suggestedEndDays is an estimate of how many days from now the event will be verifiable (integer, e.g., 7, 30, 90)`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },

    temperature: 0,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No response from AI');
  }

  return JSON.parse(content) as AIAnalysisResult;
}
