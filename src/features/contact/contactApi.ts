import { api } from "@/lib/api/api";
import type { EnquiryInput } from "@/features/contact/schemas/enquiry";

/**
 * The contact feature's slice of the retreat API.
 *
 * `POST /enquiries` is the first endpoint the site sends anything to. The
 * server's reply is not read — the form only needs to know it arrived — so
 * the result type stays `void` until there is a reason to show a reference
 * number or similar.
 */
export const contactApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendEnquiry: build.mutation<void, EnquiryInput>({
      query: (body) => ({ url: "/enquiries", method: "POST", body }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const { useSendEnquiryMutation } = contactApi;
