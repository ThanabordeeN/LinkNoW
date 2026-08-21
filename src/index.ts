export interface Env {
  ASSETS: Fetcher;
}

interface ContactRequestBody {
  organization?: string;
  email?: string;
  service?: string;
  details?: string;
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle preflight OPTIONS requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // API Route: Contact / Inquiry form submission
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = (await request.json().catch(() => ({}))) as ContactRequestBody;
        console.log("New contact inquiry received:", JSON.stringify(body));

        return new Response(
          JSON.stringify({ success: true, message: "Inquiry received successfully" }),
          {
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ success: false, error: "Failed to submit form" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
          }
        );
      }
    }

    // Serve static assets from ./public directory
    return env.ASSETS.fetch(request);
  },
};
