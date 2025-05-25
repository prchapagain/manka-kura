
export enum ReactionType {
  HEART = '❤️',
  SAD = '😢',
  THINKING = '🤔',
  GROWTH = '🌱', // Represents growth/hope
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string; // Optional
}

export interface Comment {
  id: string;
  postId: string;
  author: User | { name: 'Anonymous' }; // Simplified author
  content: string;
  createdAt: string; // ISO date string
}

export interface Post {
  id: string;
  author: User | { name: 'Anonymous' }; // Simplified author
  content: string;
  imageUrl?: string; // Optional image URL
  voiceNoteUrl?: string; // Optional: path to voice note (mocked)
  tags: string[];
  reactions: Record<ReactionType, number>;
  comments: Comment[];
  createdAt: string; // ISO date string
  isAnonymous: boolean;
  language: Language; // Language of the post
}

export enum Language {
  ENGLISH = 'en',
  NEPALI = 'ne',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface DailyPrompt {
  id: string;
  prompt: string;
  date: string; // ISO date string
}

export interface AppTranslations {
  [key: string]: {
    [lang in Language]: string;
  };
}
