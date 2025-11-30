"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface Entry {
    id: number;
    text: string;
    timestamp: string;
    sentiment_score: number;
    sentiment_label: string;
}

export function EntryList() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const fetchEntries = async () => {
        try {
            const response = await fetch('/api/entries');
            if (response.ok) {
                const data = await response.json();
                setEntries(data);
            }
        } catch (error) {
            console.error("Failed to fetch entries", error);
        }
    };

    useEffect(() => {
        fetchEntries();
        // Poll for updates every 5 seconds to keep list fresh
        const interval = setInterval(fetchEntries, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        try {
            const response = await fetch(`/api/entries/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success("Entry deleted");
                fetchEntries();
            } else {
                toast.error("Failed to delete entry");
            }
        } catch (error) {
            toast.error("Error deleting entry");
        }
    };

    const startEdit = (entry: Entry) => {
        setEditingId(entry.id);
        setEditText(entry.text);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const saveEdit = async (id: number) => {
        try {
            const response = await fetch(`/api/entries/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: editText }),
            });

            if (response.ok) {
                toast.success("Entry updated");
                setEditingId(null);
                fetchEntries();
            } else {
                toast.error("Failed to update entry");
            }
        } catch (error) {
            toast.error("Error updating entry");
        }
    };

    const getSentimentColor = (label: string) => {
        switch (label) {
            case "Positive": return "bg-green-100 text-green-800 hover:bg-green-200";
            case "Negative": return "bg-red-100 text-red-800 hover:bg-red-200";
            default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
        }
    };

    if (entries.length === 0) {
        return (
            <Card className="mt-8">
                <CardContent className="pt-6 text-center text-gray-500">
                    No entries yet. Start writing your journal above!
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Journal History</h2>
            {entries.map((entry) => (
                <Card key={entry.id} className="transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                {new Date(entry.timestamp).toLocaleString()}
                            </span>
                            <Badge className={getSentimentColor(entry.sentiment_label)}>
                                {entry.sentiment_label}
                            </Badge>
                        </div>
                        <div className="flex gap-2">
                            {editingId === entry.id ? (
                                <>
                                    <Button size="icon" variant="ghost" onClick={() => saveEdit(entry.id)} className="h-8 w-8 text-green-600">
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={cancelEdit} className="h-8 w-8 text-red-600">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size="icon" variant="ghost" onClick={() => startEdit(entry)} className="h-8 w-8 text-blue-600">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(entry.id)} className="h-8 w-8 text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {editingId === entry.id ? (
                            <Textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="min-h-[100px]"
                            />
                        ) : (
                            <p className="whitespace-pre-wrap text-gray-700">{entry.text}</p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
