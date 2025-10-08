// middleware.js

import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { CheckUser } from "@/lib/checkUser"; // import your DB sync function

// ✅ Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

// ✅ Public routes
const isPublicRoute = createRouteMatcher([
  "/", // homepage
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // 🔹 1. Let public routes pass through
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 🔹 2. If route is protected, ensure user is logged in
  const { userId, redirectToSignIn } = getAuth(req);
  if (isProtectedRoute(req)) {
    if (!userId) return redirectToSignIn();
  }

  // 🔹 3. If a user is logged in, ensure they're in your database
  if (userId) {
    try {
      await CheckUser(); // ensures DB user exists once
    } catch (err) {
      console.error("❌ Middleware CheckUser error:", err.message);
    }
  }

  // 🔹 4. Continue request
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Run middleware on all app routes and APIs, except static assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
