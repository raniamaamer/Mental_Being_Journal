"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { BookOpen, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EntryList } from "@/components/EntryList";

interface Entry {
    id: number;
    text: string;
    timestamp: string;
    sentiment_score: number;
    sentiment_label: string;
}

interface User {
    name: string;
    email: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const userRes = await fetch('/api/user');
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                } else {
                    router.push('/login');
                    return;
                }

                // Fetch entries
                const entriesRes = await fetch('/api/entries');
                if (entriesRes.ok) {
                    const entriesData = await entriesRes.json();
                    setEntries(entriesData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) return null;

    const recentEntries = entries.slice(0, 3);

    const getSentimentEmoji = (label: string) => {
        switch (label) {
            case "Positive": return "😊";
            case "Negative": return "😔";
            default: return "😐";
        }
    };

    // Calculate stats
    // Note: Assuming entries are sorted by date desc
    const last7Days = entries.filter(e => {
        const date = new Date(e.timestamp);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return date >= sevenDaysAgo;
    });

    const avgSentiment = last7Days.length > 0
        ? last7Days.reduce((sum, e) => sum + (e.sentiment_score || 0), 0) / last7Days.length
        : 0;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navigation user={user} />

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
                    <p className="text-gray-600">How are you feeling today? Start writing to track your mental wellness.</p>
                </div>

                {/* Main Action Card */}
                <Link href="/journal">
                    <Card
                        className="border-2 border-purple-200 hover:border-purple-300 transition-all cursor-pointer hover:shadow-lg mb-8"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-purple-600" />
                                </div>
                                Write in Journal
                            </CardTitle>
                            <CardDescription>
                                Express your thoughts and get instant sentiment analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Start Writing
                            </Button>
                        </CardContent>
                    </Card>
                </Link>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600">Journal Entries</p>
                                    <p className="mt-1 text-2xl font-bold">{entries.length}</p>
                                </div>
                                <BookOpen className="w-10 h-10 text-purple-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-green-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600">7-Day Avg</p>
                                    <p className="mt-1 text-2xl font-bold text-green-600">
                                        {avgSentiment > 0 ? '+' : ''}{(avgSentiment * 100).toFixed(0)}%
                                    </p>
                                </div>
                                <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600">This Week</p>
                                    <p className="mt-1 text-2xl font-bold text-blue-600">{last7Days.length} entries</p>
                                </div>
                                <Calendar className="w-10 h-10 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Journal Entries */}
                    <div className="lg:col-span-2">
                        <Card className="border-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Journal Entries</CardTitle>
                                    <Link href="/history">
                                        <Button variant="ghost" size="sm">
                                            View All
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentEntries.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No entries yet</p>
                                        <Link href="/journal">
                                            <Button
                                                className="mt-4 bg-purple-600 hover:bg-purple-700"
                                            >
                                                Write Your First Entry
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    recentEntries.map((entry) => (
                                        <Link href="/history" key={entry.id}>
                                            <div
                                                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer mb-2"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-gray-600 text-sm">
                                                        {new Date(entry.timestamp).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    <Badge variant="outline" className="text-sm">
                                                        {getSentimentEmoji(entry.sentiment_label)} {entry.sentiment_label}
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-700 line-clamp-2 text-sm">
                                                    {entry.text.substring(0, 100)}...
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/journal" className="block">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-auto py-4"
                                >
                                    <BookOpen className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <p className="font-semibold">New Entry</p>
                                        <p className="text-gray-500 text-sm">Write today's journal</p>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/insights" className="block">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-auto py-4"
                                >
                                    <TrendingUp className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <p className="font-semibold">View Insights</p>
                                        <p className="text-gray-500 text-sm">Charts & patterns</p>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/history" className="block">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-auto py-4"
                                >
                                    <Calendar className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <p className="font-semibold">Entry History</p>
                                        <p className="text-gray-500 text-sm">All journal entries</p>
                                    </div>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Entry List Section */}
                <div className="mt-8">
                    <EntryList />
                </div>
            </div>
        </div>
    );
}
