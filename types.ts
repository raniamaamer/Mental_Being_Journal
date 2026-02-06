export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface JournalEntry {
  id: number;
  text: string;
  timestamp: string;
  date?: string;
  sentiment_score: number;
  sentimentScore?: number;
  sentiment_label: string;
  sentiment?: string;
  emotions?: Record<string, number>;
  keywords?: string[];
}
