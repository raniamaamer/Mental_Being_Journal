import { NextRequest, NextResponse } from "next/server";

const FLASK_BASE_URL = "http://127.0.0.1:5000";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie") || "";

    const res = await fetch(`${FLASK_BASE_URL}/api/sentiment_over_time`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    });

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json({ points: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error proxying /api/sentiment_over_time:", error);
    return NextResponse.json(
      { points: [], error: "Failed to fetch sentiment over time" },
      { status: 500 }
    );
  }
}
