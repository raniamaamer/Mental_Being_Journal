"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Need to ensure this exists or use standard textarea
import { Navigation } from "@/components/Navigation";
import { Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
}

export default function JournalPage() {
    const [user, setUser] = useState<User | null>(null);
    const [text, setText] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');
            }
        };
        fetchUser();
    }, [router]);

    const handleSave = async () => {
        if (!text.trim()) {
            toast.error("Please write something before saving");
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                toast.success("Entry saved successfully!");
                setText("");
                router.push('/dashboard');
            } else {
                toast.error("Failed to save entry");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navigation user={user} />

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">New Journal Entry</h1>
                    <p className="text-gray-600">Express yourself freely. Your thoughts are private and secure.</p>
                </div>

                <Card className="border-2 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-medium">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            What's on your mind?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <textarea
                            className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none outline-none text-lg leading-relaxed"
                            placeholder="Start writing here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-purple-600 hover:bg-purple-700 min-w-[120px]"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Entry
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
