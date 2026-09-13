import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { api } from "@/lib/api/api";
import type { EnquiryInput } from "@/features/contact/schemas/enquiry";

/**
 * The contact feature's slice of the API.
 *
 * `queryFn` rather than `query`, because this one endpoint does not belong to
 * the retreat API: it posts to this site's own route handler, which holds the
 * SMTP credentials and sends the mail. The shared base query is pointed at
 * `NEXT_PUBLIC_API_URL` and would put that host in front of the path.
 *
 * The reply is not read on success — the form only needs to know the message
 * arrived — but the status is kept on failure so the difference between a
 * rejected message and an unreachable server is there in the devtools.
 */
export const contactApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendEnquiry: build.mutation<void, EnquiryInput>({
      queryFn: async (body) => {
        try {
          const response = await fetch("/api/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            const error: FetchBaseQueryError = {
              status: response.status,
              data: await response.json().catch(() => null),
            };
            return { error };
          }

          return { data: undefined };
        } catch (cause) {
          // The network never answered: offline, DNS, a cancelled navigation.
          const error: FetchBaseQueryError = {
            status: "FETCH_ERROR",
            error: String(cause),
          };
          return { error };
        }
      },
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const { useSendEnquiryMutation } = contactApi;
