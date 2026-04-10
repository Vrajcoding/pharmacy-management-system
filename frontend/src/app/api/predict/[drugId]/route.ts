import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/predict/[drugId]
 *
 * Next.js API Route — proxies the request to the Flask ML backend.
 * Merges the frontend and backend routing under a single origin so
 * the browser never needs to reach localhost:5000 directly.
 *
 * Flask endpoint:  GET http://localhost:5000/predict/<drug_id>
 * Frontend calls:  GET /api/predict/<drugId>   (same origin — no CORS)
 */

const FLASK_BASE_URL =
  process.env.FLASK_INTERNAL_URL ||       // server-side env var (no NEXT_PUBLIC_ needed)
  process.env.NEXT_PUBLIC_BACKEND_URL ||  // fallback to the public var
  "http://localhost:5000";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ drugId: string }> }
) {
  const { drugId } = await params;

  if (!drugId) {
    return NextResponse.json(
      { success: false, error: "Missing drugId parameter" },
      { status: 400 }
    );
  }

  const flaskUrl = `${FLASK_BASE_URL}/predict/${encodeURIComponent(drugId)}`;

  try {
    const flaskResponse = await fetch(flaskUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // No caching — always return a fresh prediction from Flask
      cache: "no-store",
    });

    const data = await flaskResponse.json();

    return NextResponse.json(data, { status: flaskResponse.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Flask backend unreachable";
    return NextResponse.json(
      {
        success: false,
        error: message,
        hint: `Could not connect to Flask at ${FLASK_BASE_URL}. Is the backend running?`,
      },
      { status: 502 }
    );
  }
}
