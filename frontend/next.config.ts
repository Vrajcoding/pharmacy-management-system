import type { NextConfig } from "next";

/**
 * Next.js configuration.
 *
 * Route merging strategy
 * ──────────────────────
 * Frontend pages are served by Next.js (port 3000 in dev).
 * Backend API lives in Flask (port 5000 in dev).
 *
 * Two layers bring them together:
 *
 *  1. /api/*  → src/app/api/ route handlers (server-side proxy to Flask)
 *     These are the canonical URLs the browser hits. No CORS, no port exposure.
 *
 *  2. /api/flask/* rewrites → direct pass-through to Flask
 *     Useful for routes not yet wrapped by a dedicated route handler.
 *     e.g.  GET /api/flask/predict/drug_A  →  http://localhost:5000/predict/drug_A
 */
const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    const flaskBase =
      process.env.FLASK_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "http://localhost:5000";

    return [
      // Pass-through rewrite: /api/flask/<any path> → Flask
      {
        source: "/api/flask/:path*",
        destination: `${flaskBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;

