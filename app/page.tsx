"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, BookOpen, TrendingUp, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 font-bold text-xl">MindWell Journal</span>
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-16 h-16 text-blue-600" />
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Track Your Mental Well-Being Through Journaling
            </h1>

            <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
              Express your thoughts freely and receive instant AI-powered sentiment analysis.
              Understand your emotional patterns, track your mental wellness journey, and gain valuable insights over time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  Start Journaling Today
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={scrollToFeatures} className="w-full sm:w-auto">
                Explore Features
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI Sentiment Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Track Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Mental Wellness</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Free-Form Journaling</h3>
                <p className="text-gray-600">
                  Write your thoughts freely without constraints. Express yourself naturally and authentically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Sentiment Analysis</h3>
                <p className="text-gray-600">
                  Advanced NLP automatically detects sentiment, emotions, and key themes from your writing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-pink-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your mental well-being trends over days, weeks, and months with detailed insights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Word Cloud Insights</h3>
                <p className="text-gray-600">
                  Visualize your most frequent themes with interactive word clouds and keyword extraction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-indigo-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Privacy</h3>
                <p className="text-gray-600">
                  Your entries are encrypted and private. Export anytime, delete whenever you want.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Emotional Patterns</h3>
                <p className="text-gray-600">
                  Discover patterns and receive insights to improve your mental wellness over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Start Your Mental Wellness Journey Today</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands using MindWell Journal to track and improve their mental well-being through intelligent journaling.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
                <span className="text-blue-600 font-bold">MindWell Journal</span>
              </div>
              <p className="text-gray-600">
                AI-powered journaling for mental wellness and emotional growth.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                <li><a href="#" className="hover:text-blue-600">How It Works</a></li>
                <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600">Support</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Crisis Support</h4>
              <p className="text-gray-600 mb-2">If you're in crisis:</p>
              <p className="text-gray-700 font-bold">Call 988</p>
              <p className="text-gray-600">Suicide & Crisis Lifeline</p>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-gray-600">
            <p>© 2025 MindWell Journal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
