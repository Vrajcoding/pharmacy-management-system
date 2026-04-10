import { NextResponse } from "next/server";

/**
 * GET /api/health
 *
 * Next.js API Route — proxies the Flask backend root health check.
 * Returns { ok: true, backend: "Flask server running" } when Flask is up,
 * or { ok: false, error: "..." } when it's unreachable.
 */

const FLASK_BASE_URL =
  process.env.FLASK_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export async function GET() {
  try {
    const res = await fetch(`${FLASK_BASE_URL}/`, {
      cache: "no-store",
    });

    const text = await res.text();

    return NextResponse.json(
      { ok: res.ok, backend: text, status: res.status },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message, hint: `Flask not reachable at ${FLASK_BASE_URL}` },
      { status: 502 }
    );
  }
}
