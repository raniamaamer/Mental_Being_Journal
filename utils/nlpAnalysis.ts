import type { JournalEntry } from "../types";

export function analyzeText(text: string, userId?: number): JournalEntry {
  // Simple sentiment analysis - in production, this would call a real NLP service
  const sentiment = analyzeSentiment(text);
  const emotions = extractEmotions(text);
  const keywords = extractKeywords(text);

  return {
    id: Date.now(),
    text,
    timestamp: new Date().toISOString(),
    date: new Date().toISOString(),
    sentiment_score: sentiment.score,
    sentimentScore: sentiment.score,
    sentiment_label: sentiment.label,
    sentiment: sentiment.label,
    emotions,
    keywords
  };
}

function analyzeSentiment(text: string): { score: number; label: string } {
  // Simple keyword-based sentiment analysis
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'joy', 'love', 'amazing', 'awesome'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'angry', 'depressed', 'anxious', 'worried'];

  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) positiveCount += matches.length;
  });

  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) negativeCount += matches.length;
  });

  const score = (positiveCount - negativeCount) / (positiveCount + negativeCount || 1);
  let label = 'neutral';
  
  if (score > 0.2) label = 'positive';
  else if (score < -0.2) label = 'negative';

  return { score: Math.min(1, Math.max(-1, score)), label };
}

function extractEmotions(text: string): Record<string, number> {
  const emotionKeywords: Record<string, string[]> = {
    joy: ['happy', 'joy', 'excited', 'delighted', 'wonderful'],
    sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'blue'],
    anger: ['angry', 'furious', 'mad', 'irritated', 'annoyed'],
    fear: ['afraid', 'scared', 'anxious', 'worried', 'nervous'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned'],
    disgust: ['disgusted', 'repulsed', 'sick', 'revolted']
  };

  const lowerText = text.toLowerCase();
  const emotions: Record<string, number> = {};

  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    let score = 0;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = lowerText.match(regex);
      if (matches) score += matches.length;
    });
    emotions[emotion] = score;
  });

  return emotions;
}

function extractKeywords(text: string): string[] {
  // Simple keyword extraction - splits on spaces and removes common words
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you',
    'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them',
    'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this',
    'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing'
  ]);

  const words = text.toLowerCase()
    .match(/\b\w+\b/g) || [];

  const keywords = words
    .filter(word => !commonWords.has(word) && word.length > 3)
    .slice(0, 20); // Limit to top 20 keywords

  return [...new Set(keywords)]; // Remove duplicates
}
