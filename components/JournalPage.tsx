import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Navigation } from "./Navigation";
import { analyzeText } from "../utils/nlpAnalysis";
import type { User, JournalEntry } from "../App";
import { Sparkles, Save } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Badge } from "./ui/badge";

interface JournalPageProps {
  user: User;
  onAddEntry: (entry: JournalEntry) => void;
  onNavigate: (page: "journal" | "dashboard" | "profile") => void;
  onLogout: () => void;
}

export function JournalPage({ user, onAddEntry, onNavigate, onLogout }: JournalPageProps) {
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState<JournalEntry | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!content.trim()) {
      toast.error("Please write something first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const result = analyzeText(content, user.id);
      setAnalysis(result);
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 1500);
  };

  const handleSave = () => {
    if (analysis) {
      onAddEntry(analysis);
      toast.success("Journal entry saved!");
      setContent("");
      setAnalysis(null);
    }
  };

  const handleNewEntry = () => {
    setContent("");
    setAnalysis(null);
  };

  const getEmotionColor = (emotion: string, value: number) => {
    if (value < 0.2) return "bg-gray-200 text-gray-700";
    
    switch(emotion) {
      case "joy": return "bg-yellow-200 text-yellow-800";
      case "sadness": return "bg-blue-200 text-blue-800";
      case "anger": return "bg-red-200 text-red-800";
      case "fear": return "bg-purple-200 text-purple-800";
      case "surprise": return "bg-pink-200 text-pink-800";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case "positive": return "text-green-600 bg-green-100";
      case "negative": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        currentPage="journal"
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={user.name}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2">Daily Journal</h1>
          <p className="text-gray-600">
            Write freely about your day, thoughts, and feelings. Our AI will help you understand your emotional patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Writing Area */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Today's Entry</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="How are you feeling today? What's on your mind?&#10;&#10;Write as much or as little as you'd like. This is your safe space to express yourself..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
                disabled={!!analysis}
              />
              
              <div className="flex gap-2">
                {!analysis ? (
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !content.trim()}
                    className="bg-purple-600 hover:bg-purple-700 flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Text
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Entry
                    </Button>
                    <Button 
                      onClick={handleNewEntry}
                      variant="outline"
                    >
                      New Entry
                    </Button>
                  </>
                )}
              </div>

              <p className="text-gray-500">
                Word count: {content.trim().split(/\s+/).filter(w => w.length > 0).length}
              </p>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Emotional insights from your writing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysis ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                  <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                  <p>Write your thoughts and click "Analyze Text"</p>
                  <p>to see emotional insights</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Sentiment */}
                  <div>
                    <h4 className="mb-3">Overall Sentiment</h4>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getSentimentColor(analysis.sentiment)} px-4 py-2`}>
                        {analysis.sentiment.toUpperCase()}
                      </Badge>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            analysis.sentiment === 'positive' ? 'bg-green-500' :
                            analysis.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                          }`}
                          style={{ width: `${Math.abs(analysis.sentimentScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Emotions */}
                  <div>
                    <h4 className="mb-3">Detected Emotions</h4>
                    <div className="space-y-3">
                      {Object.entries(analysis.emotions).map(([emotion, value]) => (
                        <div key={emotion}>
                          <div className="flex justify-between mb-1">
                            <span className="capitalize">{emotion}</span>
                            <span className="text-gray-600">{Math.round(value * 100)}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getEmotionColor(emotion, value).split(' ')[0].replace('bg-', 'bg-').replace('-200', '-500')}`}
                              style={{ width: `${value * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h4 className="mb-3">Key Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="bg-purple-50">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
