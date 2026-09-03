import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/constants/env";

/**
 * Single entry point to the retreat API.
 *
 * No endpoints exist yet — the site renders from `src/lib/data` — so this is
 * deliberately the plain base query. When auth arrives, wrap it the way
 * `waveclubs_booking` does: a `BaseQueryFn` that catches a 401, refreshes
 * through the httpOnly cookie once for all in-flight calls, and retries.
 *
 * `credentials: "include"` is set now so that a future refresh cookie is sent
 * without every caller having to opt in.
 */
export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});
