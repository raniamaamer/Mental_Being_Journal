"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function HistoryPage() {
    const [user, setUser] = useState<User | null>(null);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await fetch('/api/user');
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                } else {
                    router.push('/login');
                    return;
                }

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

    const getSentimentEmoji = (label: string) => {
        switch (label) {
            case "Positive": return "😊";
            case "Negative": return "😔";
            default: return "😐";
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navigation user={user} />

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Journal History</h1>
                    <p className="text-gray-600">Review your past entries and emotional journey.</p>
                </div>

                <div className="space-y-4">
                    {entries.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No entries found yet.</p>
                        </div>
                    ) : (
                        entries.map((entry) => (
                            <Card key={entry.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm text-gray-500">
                                            {new Date(entry.timestamp).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                        <Badge variant="outline" className="text-sm px-3 py-1">
                                            {getSentimentEmoji(entry.sentiment_label)} {entry.sentiment_label}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {entry.text}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
