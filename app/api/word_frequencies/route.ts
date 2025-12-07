import { NextRequest, NextResponse } from "next/server";

const FLASK_BASE_URL = "http://127.0.0.1:5000";

export async function GET(request: NextRequest) {
  try {
    // On récupère les cookies envoyés par le navigateur
    const cookie = request.headers.get("cookie") || "";

    // On appelle Flask côté serveur
    const res = await fetch(`${FLASK_BASE_URL}/api/word_frequencies`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    });

    const contentType = res.headers.get("content-type") || "";

    // Si Flask ne renvoie pas du JSON (ex: redirection login),
    // on renvoie une réponse vide propre
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ words: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error proxying /api/word_frequencies:", error);
    return NextResponse.json(
      { words: [], error: "Failed to fetch word frequencies" },
      { status: 500 }
    );
  }
}
