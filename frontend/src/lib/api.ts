/**
 * API Service Layer
 *
 * All calls go to Next.js /api/* route handlers (same origin).
 * Those handlers proxy requests server-side to the Flask backend.
 *
 * Route map (merged):
 *  Browser            → Next.js API route        → Flask backend
 *  ──────────────────────────────────────────────────────────────
 *  GET /api/predict/:drugId  → app/api/predict/[drugId]/route.ts → :5000/predict/:drugId
 *  GET /api/health           → app/api/health/route.ts           → :5000/
 *  GET /api/flask/*          → next.config.ts rewrite            → :5000/* (pass-through)
 */

// In the browser this resolves to "" (same origin).
// On the server (SSR / API routes) it reads the env var if set.
const API_BASE =
  typeof window !== "undefined"
    ? ""                                          // browser: relative path → same origin
    : process.env.NEXT_PUBLIC_BACKEND_URL || "";  // server: absolute if needed

export interface PredictionResult {
  success: boolean;
  drug_id: string;
  predicted_next_month: number;
  suggested_order: number;
  confidence: "high" | "low" | "none";
  trend: "increasing" | "decreasing" | "stable" | "unknown";
  status: string;
  error?: string;
}

/**
 * GET /api/predict/<drugId>
 * Fetches demand forecasting prediction for a given drug.
 * Routed → app/api/predict/[drugId]/route.ts → Flask /predict/<drugId>
 */
export async function fetchPrediction(drugId: string): Promise<PredictionResult> {
  const response = await fetch(
    `${API_BASE}/api/predict/${encodeURIComponent(drugId)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }

  return response.json();
}

/**
 * GET /api/health
 * Health check — returns true when Flask is reachable.
 * Routed → app/api/health/route.ts → Flask /
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/health`, {
      cache: "no-store",
    });
    if (!response.ok) return false;
    const data = await response.json();
    return data.ok === true;
  } catch {
    return false;
  }
}

