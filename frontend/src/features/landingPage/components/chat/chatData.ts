type MessageRole = 'user' | 'ai';

interface IChatMessage {
  role: MessageRole;
  text: string;
}

export const MESSAGES: IChatMessage[] = [
  { role: 'user', text: 'Plan me a 5-day trip to Tokyo!' },
  {
    role: 'ai',
    text: "I'd love to help! Here's a curated 5-day Tokyo itinerary with the best spots for food, culture, and nightlife.",
  },
  { role: 'user', text: 'Add a day trip to Mount Fuji' },
  {
    role: 'ai',
    text: "Done! Day 3 is now a scenic Fuji day trip. I've added a bullet train from Shinjuku and a lakeside lunch spot.",
  },
  { role: 'user', text: 'What about budget-friendly hotels?' },
  {
    role: 'ai',
    text: 'I found 3 top-rated hotels under $80/night near Shibuya station. Want me to add them to your itinerary?',
  },
];

export const SCROLL_MESSAGE_START = 0.15;
export const SCROLL_MESSAGE_RANGE = 0.55;
export const SCROLL_TEXT_START = 0.1;
export const SCROLL_TEXT_RANGE = 0.3;
export const TEXT_TRANSLATE_PX = 40;
export const CHAT_MIN_HEIGHT_PX = 320;
export const BOUNCE_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export type { IChatMessage };
