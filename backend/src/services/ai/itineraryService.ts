import Anthropic from '@anthropic-ai/sdk';

import env from '../../config/env';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompts/itineraryPrompt';
import { AppError } from '../../utils/appError';
import logger from '../../utils/logger';

import type { ContentBlock } from '@anthropic-ai/sdk/resources/messages';
import type { TripPreferences, GeneratedItinerary } from '../../types/trip';

const MODEL_ID = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 4096;
const HTTP_INTERNAL_ERROR = 500;
const AI_ERROR_CODE = 'AI_GENERATION_FAILED';

function createClient(): Anthropic {
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
}

function isGeneratedItinerary(value: unknown): value is GeneratedItinerary {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.destination === 'string' &&
    typeof candidate.startDate === 'string' &&
    typeof candidate.endDate === 'string' &&
    typeof candidate.totalBudget === 'string' &&
    typeof candidate.travelStyle === 'string' &&
    typeof candidate.summary === 'string' &&
    Array.isArray(candidate.days) &&
    Array.isArray(candidate.tips)
  );
}

function parseItineraryResponse(content: string): GeneratedItinerary {
  const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parsed: unknown = JSON.parse(cleaned);

  if (!isGeneratedItinerary(parsed)) {
    throw new Error('Response does not match expected itinerary format');
  }

  return parsed;
}

async function generateItinerary(preferences: TripPreferences): Promise<GeneratedItinerary> {
  const client = createClient();
  const userPrompt = buildUserPrompt(preferences);

  try {
    const response = await client.messages.create({
      model: MODEL_ID,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const textBlock = response.content.find((block: ContentBlock) => block.type === 'text');

    if (!textBlock || textBlock.type !== 'text') {
      throw new AppError('No text response from AI', HTTP_INTERNAL_ERROR, AI_ERROR_CODE);
    }

    return parseItineraryResponse(textBlock.text);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    logger.error('AI itinerary generation failed', { detail: message });

    throw new AppError(
      'Failed to generate itinerary. Please try again.',
      HTTP_INTERNAL_ERROR,
      AI_ERROR_CODE,
    );
  }
}

export { generateItinerary };
