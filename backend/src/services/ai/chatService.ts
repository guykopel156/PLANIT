import Anthropic from '@anthropic-ai/sdk';

import env from '../../config/env';
import { CHAT_SYSTEM_PROMPT } from './prompts/chatPrompt';
import logger from '../../utils/logger';

import type { Response } from 'express';
import type { ChatMessage } from '../../types/chat';

const MODEL_ID = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 8192;
const ITINERARY_MARKER = '[GENERATE_ITINERARY]';

function createClient(): Anthropic {
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
}

function sendSseEvent(response: Response, eventType: string, data: Record<string, unknown>): void {
  response.write(`data: ${JSON.stringify({ type: eventType, ...data })}\n\n`);
}

function parseItineraryPayload(text: string): { preferences: Record<string, unknown>; itinerary: Record<string, unknown> } | null {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (!jsonMatch) {
    return null;
  }

  const parsed: unknown = JSON.parse(jsonMatch[1].trim());
  if (typeof parsed !== 'object' || parsed === null) {
    return null;
  }

  const payload = parsed as Record<string, unknown>;
  if (!payload.preferences || !payload.itinerary) {
    return null;
  }

  return {
    preferences: payload.preferences as Record<string, unknown>,
    itinerary: payload.itinerary as Record<string, unknown>,
  };
}

async function createChatStream(messages: ChatMessage[], response: Response): Promise<void> {
  const client = createClient();
  let accumulatedText = '';
  let isMarkerDetected = false;

  response.setHeader('Content-Type', 'text/event-stream');
  response.setHeader('Cache-Control', 'no-cache');
  response.setHeader('Connection', 'keep-alive');
  response.flushHeaders();

  try {
    const stream = await client.messages.stream({
      model: MODEL_ID,
      max_tokens: MAX_TOKENS,
      system: CHAT_SYSTEM_PROMPT,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const chunk = event.delta.text;
        accumulatedText += chunk;

        if (isMarkerDetected) {
          continue;
        }

        if (accumulatedText.includes(ITINERARY_MARKER)) {
          isMarkerDetected = true;
          const beforeMarker = accumulatedText.split(ITINERARY_MARKER)[0];
          const trailingText = beforeMarker.slice(beforeMarker.lastIndexOf('\n') + 1);
          if (trailingText.trim().length > 0) {
            sendSseEvent(response, 'text_delta', { delta: '' });
          }
          continue;
        }

        sendSseEvent(response, 'text_delta', { delta: chunk });
      }
    }

    if (isMarkerDetected) {
      const afterMarker = accumulatedText.split(ITINERARY_MARKER)[1];
      const payload = parseItineraryPayload(afterMarker);
      if (payload) {
        sendSseEvent(response, 'itinerary_ready', {
          itinerary: payload.itinerary,
          preferences: payload.preferences,
        });
      } else {
        logger.error('Failed to parse itinerary payload from AI response');
        sendSseEvent(response, 'error', { message: 'Failed to parse itinerary data. Please try again.' });
      }
    }

    sendSseEvent(response, 'done', {});
    response.end();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error('Chat stream failed', { detail: message });
    sendSseEvent(response, 'error', { message: 'Something went wrong. Please try again.' });
    sendSseEvent(response, 'done', {});
    response.end();
  }
}

export { createChatStream };
