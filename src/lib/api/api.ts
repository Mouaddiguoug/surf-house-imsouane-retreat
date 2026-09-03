import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

/**
 * The one RTK Query API slice for the whole app.
 *
 * Features never call `createApi` themselves — they call
 * `api.injectEndpoints()` from their own `<feature>Api.ts`, which keeps a
 * single cache, a single middleware, and cross-feature invalidation working.
 *
 * `tagTypes` has to be complete here: `injectEndpoints` can add endpoints but
 * not new tag types.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Availability", "Booking", "Enquiry", "Guest", "Retreat", "Room"],
  endpoints: () => ({}),
});
