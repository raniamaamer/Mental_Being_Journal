import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Navigation } from "./Navigation";
import type { JournalEntry } from "../App";
import { BarChart3, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardPageProps {
  entries: JournalEntry[];
  onNavigate: (page: "journal" | "dashboard" | "profile") => void;
  onLogout: () => void;
}

export function DashboardPage({ entries, onNavigate, onLogout }: DashboardPageProps) {
  // Prepare sentiment trend data
  const sentimentTrend = entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: entry.sentimentScore,
    sentiment: entry.sentiment
  })).reverse();

  // Prepare emotion distribution data
  const emotionTotals = entries.reduce((acc, entry) => {
    Object.entries(entry.emotions).forEach(([emotion, value]) => {
      acc[emotion] = (acc[emotion] || 0) + value;
    });
    return acc;
  }, {} as Record<string, number>);

  const emotionData = Object.entries(emotionTotals).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Math.round(value * 100) / 100
  }));

  const COLORS = {
    'Joy': '#fbbf24',
    'Sadness': '#60a5fa',
    'Anger': '#f87171',
    'Fear': '#a78bfa',
    'Surprise': '#f472b6',
    'Neutral': '#9ca3af'
  };

  // Prepare weekly summary
  const last7Days = entries.slice(-7);
  const avgSentiment = last7Days.reduce((sum, e) => sum + e.sentimentScore, 0) / (last7Days.length || 1);
  
  // All keywords from recent entries
  const allKeywords = entries.flatMap(e => e.keywords);
  const keywordFreq = allKeywords.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topKeywords = Object.entries(keywordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  // Calculate statistics
  const positiveCount = entries.filter(e => e.sentiment === 'positive').length;
  const negativeCount = entries.filter(e => e.sentiment === 'negative').length;
  const neutralCount = entries.filter(e => e.sentiment === 'neutral').length;

  return (
    <div className="min-h-screen">
      <Navigation 
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2">Mental Wellness Dashboard</h1>
          <p className="text-gray-600">
            Track your emotional patterns and gain insights into your mental well-being
          </p>
        </div>

        {entries.length === 0 ? (
          <Card className="border-2">
            <CardContent className="py-12 text-center text-gray-400">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="mb-2">No journal entries yet</p>
              <p>Start writing to see your insights and analytics</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Total Entries</p>
                      <p className="mt-1">{entries.length}</p>
                    </div>
                    <Calendar className="w-10 h-10 text-purple-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Positive Days</p>
                      <p className="mt-1 text-green-600">{positiveCount}</p>
                    </div>
                    <div className="text-green-600 opacity-20">😊</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Challenging Days</p>
                      <p className="mt-1 text-red-600">{negativeCount}</p>
                    </div>
                    <div className="text-red-600 opacity-20">😔</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">7-Day Avg</p>
                      <p className="mt-1 text-blue-600">
                        {avgSentiment > 0 ? '+' : ''}{(avgSentiment * 100).toFixed(0)}%
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-blue-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sentiment Trend */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Sentiment Trend Over Time</CardTitle>
                <CardDescription>Track how your emotional tone changes day by day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[-1, 1]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="Sentiment Score"
                      dot={{ fill: '#8b5cf6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Emotions and Keywords */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Emotion Distribution */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Emotion Distribution</CardTitle>
                  <CardDescription>Your emotional landscape</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={emotionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {emotionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#9ca3af'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Word Cloud / Top Keywords */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Most Common Themes</CardTitle>
                  <CardDescription>Keywords that appear in your writing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 justify-center items-center min-h-[300px]">
                    {topKeywords.map(([word, freq], idx) => {
                      const size = Math.max(16, Math.min(48, 16 + (freq * 4)));
                      const opacity = Math.max(0.4, Math.min(1, freq / 5));
                      return (
                        <span
                          key={idx}
                          className="text-purple-600 transition-all hover:scale-110"
                          style={{ 
                            fontSize: `${size}px`,
                            opacity: opacity
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sentiment Breakdown */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Sentiment Breakdown</CardTitle>
                <CardDescription>Distribution of positive, negative, and neutral entries</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { name: 'Positive', count: positiveCount, fill: '#10b981' },
                    { name: 'Neutral', count: neutralCount, fill: '#6b7280' },
                    { name: 'Negative', count: negativeCount, fill: '#ef4444' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
