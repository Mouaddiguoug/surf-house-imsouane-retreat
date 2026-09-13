import { enquirySchema } from "@/features/contact/schemas/enquiry";
import { sendEnquiryMail } from "@/lib/mail/enquiry-mail";

/**
 * `POST /api/enquiry` — the "Get in touch" form's one endpoint.
 *
 * Nodemailer opens a TCP socket to an SMTP server, which the edge runtime
 * cannot do, so this is pinned to Node explicitly rather than left to the
 * default. Route handlers are not cached for POST, so nothing else is needed
 * to keep it dynamic.
 *
 * The body is validated here with the same schema the form uses. That is not
 * belt and braces: the form's copy of it runs in the browser, where it is a
 * courtesy to the reader rather than a control, and this route is reachable
 * without ever loading the page.
 */
export const runtime = "nodejs";

/** How many messages one address may send, and over what window. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * A rate limit that lives in memory.
 *
 * Deliberately modest: it holds for one server instance and resets on deploy,
 * so it is a brake on a single impatient or scripted sender rather than a
 * defence against a distributed one. If enquiries ever get expensive, this is
 * the thing to move to a shared store.
 */
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing for every address that ever posted once.
  if (hits.size > 500) {
    for (const [otherKey, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(otherKey);
    }
  }

  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  // Behind a proxy the socket address is the proxy's. The first entry of
  // `x-forwarded-for` is the client as the nearest proxy saw it.
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages. Give it a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected JSON." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "That message did not validate." },
      {
        status: 400,
      },
    );
  }

  const result = await sendEnquiryMail(parsed.data);
  if (!result.ok) {
    // Both failures read the same from outside — the reader can only retry,
    // and which of the two it was is the operator's business, already logged.
    return Response.json(
      { error: "The message could not be sent." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
