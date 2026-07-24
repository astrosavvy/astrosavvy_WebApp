/**
 * Cloudflare Worker for Astro Savvy Love Report Engine
 * Domain: love.astrosavvysingh.com / astrosavvy-love.fmea.workers.dev
 *
 * Features:
 * 1. Edge-level Server-Side Mobile/Desktop User-Agent Detection (Zero Client-Side Redirect Loops)
 * 2. Same-Origin Server-Side Proxying for /api/* requests (Zero CORS/Network Errors)
 * 3. Clean Headers for Razorpay Floating Checkout Window
 */

const BACKEND_API = "https://api.astrosavvysingh.com";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // 1. SAME-ORIGIN BACKEND API PROXY (/api/*)
    if (url.pathname.startsWith("/api/")) {
      const targetUrl = BACKEND_API + url.pathname + url.search;
      
      // Clone request headers and add origin header
      const headers = new Headers(request.headers);
      headers.set("Host", "api.astrosavvysingh.com");

      try {
        const backendRes = await fetch(targetUrl, {
          method: request.method,
          headers: headers,
          body: ["GET", "HEAD"].includes(request.method) ? null : request.body
        });

        // Add same-origin CORS headers to backend response
        const responseHeaders = new Headers(backendRes.headers);
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        responseHeaders.set("Access-Control-Allow-Headers", "*");

        if (request.method === "OPTIONS") {
          return new Response(null, { status: 200, headers: responseHeaders });
        }

        return new Response(backendRes.body, {
          status: backendRes.status,
          statusText: backendRes.statusText,
          headers: responseHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Backend proxy error", detail: err.message }), {
          status: 502,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    // 2. EDGE SERVER-SIDE ROUTING & MOBILE DETECTION
    let assetPath = url.pathname;

    // Handle Root and Order Routes
    if (assetPath === "/" || assetPath === "/index.html" || assetPath === "/order") {
      assetPath = isMobile ? "/mobile.html" : "/index.html";
    } else if (assetPath === "/mobile" || assetPath === "/mobile/") {
      assetPath = "/mobile.html";
    } else if (assetPath === "/love-report" || assetPath === "/love-report/") {
      assetPath = isMobile ? "/mobile.html" : "/love-report.html";
    } else if (assetPath === "/love-calculator" || assetPath === "/love-calculator/") {
      assetPath = "/love_calculator.html";
    } else if (assetPath === "/success" || assetPath === "/success/") {
      assetPath = "/success.html";
    }

    // Fetch static asset from Cloudflare KV / Assets binding
    try {
      if (env.ASSETS) {
        const assetUrl = new URL(assetPath, request.url);
        return await env.ASSETS.fetch(assetUrl);
      }
      
      // Fallback: fetch static asset from current site origin
      return await fetch(new URL(assetPath, request.url));
    } catch (e) {
      return new Response("Asset not found", { status: 404 });
    }
  }
};
