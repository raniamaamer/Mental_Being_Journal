"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
}

export default function InsightsPage() {
    const [user, setUser] = useState<User | null>(null);
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

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navigation user={user} />
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-4">Insights</h1>
                <p className="text-gray-600">Coming soon in Sprint 3...</p>
            </div>
        </div>
    );
}
