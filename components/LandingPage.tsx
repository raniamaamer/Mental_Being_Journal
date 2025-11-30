import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Brain, BookOpen, BarChart3, Shield, Heart, Sparkles } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-16 h-16 text-purple-600" />
              <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MindJournal
              </h1>
            </div>
            
            <p className="mx-auto mb-8 max-w-3xl text-gray-700">
              Track your mental well-being with intelligent journaling. Write freely, understand deeply.
              Our AI-powered analysis helps you gain insights into your emotional patterns over time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={onGetStarted}>
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" onClick={onLogin}>
                Login
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Private & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                <span>Mental Wellness Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center mb-16">How MindJournal Helps You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-200 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="mb-3">Free-Form Journaling</h3>
                <p className="text-gray-600">
                  Write your thoughts freely without constraints. Express yourself in your own words, any time of day.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="mb-3">AI Emotional Analysis</h3>
                <p className="text-gray-600">
                  Advanced NLP automatically detects sentiments, emotions, and key themes in your writing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-pink-200 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="mb-3">Visual Insights</h3>
                <p className="text-gray-600">
                  Track your emotional patterns over time with beautiful charts, graphs, and word clouds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6">Start Your Mental Wellness Journey Today</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students, employees, and wellness enthusiasts who are tracking their mental well-being anonymously and safely.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={onGetStarted}>
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/30 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-gray-600">
          <p>© 2025 MindJournal. Your mental wellness, your privacy, your journey.</p>
          <p className="mt-2">If you're in crisis, please call 988 (Suicide & Crisis Lifeline)</p>
        </div>
      </footer>
    </div>
  );
}
