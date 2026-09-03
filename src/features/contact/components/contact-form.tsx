"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, LoaderCircle, MailCheck } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendEnquiryMutation } from "@/features/contact/contactApi";
import {
  enquirySchema,
  type EnquiryInput,
} from "@/features/contact/schemas/enquiry";
import { cn } from "@/lib/utils/cn";

const labelClass =
  "text-house-muted font-mono text-xs tracking-[0.18em] uppercase group-data-[invalid=true]/field:text-destructive";

const controlClass =
  "rounded-xl border-house-ink/15 bg-house-shell px-4 text-base text-house-ink placeholder:text-house-dim md:text-base";

/**
 * The enquiry form.
 *
 * Five fields — phone optional — validated on blur so a typo in the email
 * shows before the reader reaches the button, not after. Every field keeps its label above it
 * — the placeholder is an example, never the name of the field. A failed send
 * keeps everything typed and says so in one line above the button; a
 * successful one swaps the whole form for a note that reads back the first
 * name, so there is no doubt which message went.
 */
export function ContactForm({ className }: { className?: string }) {
  const [sendEnquiry, { isLoading, isError, reset: resetSend }] =
    useSendEnquiryMutation();
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const { errors, isSubmitting } = form.formState;
  const busy = isSubmitting || isLoading;

  async function onSubmit(values: EnquiryInput) {
    try {
      await sendEnquiry(values).unwrap();
      setSentTo(values.firstName);
      form.reset();
    } catch {
      // `isError` carries the state; the form stays filled for a retry.
    }
  }

  React.useEffect(() => {
    if (sentTo) successRef.current?.focus();
  }, [sentTo]);

  if (sentTo) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "bg-house-shell shadow-card flex flex-col items-start rounded-3xl p-6 outline-none sm:p-8",
          className,
        )}
      >
        <MailCheck aria-hidden className="text-house-tide size-6" />
        <h3 className="font-display mt-4 text-2xl leading-[1.1] text-balance sm:text-3xl">
          Thanks, {sentTo}. It is on its way.
        </h3>
        <p className="text-house-muted mt-3 text-base leading-relaxed text-pretty">
          Someone at the house reads every message and replies by email, so keep
          an eye on your inbox — and the spam folder, the first time.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSentTo(null);
            resetSend();
          }}
          className="mt-8 h-12 w-full cursor-pointer rounded-xl sm:w-auto border-house-ink/15 bg-transparent px-6 font-mono text-xs tracking-[0.14em] uppercase hover:bg-house-sand"
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      aria-label="Send a message to the house"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        "bg-house-shell shadow-card flex flex-col gap-5 rounded-3xl p-6 sm:p-8",
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel htmlFor="enquiry-first-name" className={labelClass}>
            First name
          </FieldLabel>
          <Input
            id="enquiry-first-name"
            autoComplete="given-name"
            placeholder="Amina"
            aria-invalid={!!errors.firstName}
            aria-describedby={
              errors.firstName ? "enquiry-first-name-error" : undefined
            }
            className={cn(controlClass, "h-12")}
            {...form.register("firstName")}
          />
          <FieldError
            id="enquiry-first-name-error"
            errors={[errors.firstName]}
          />
        </Field>

        <Field data-invalid={!!errors.lastName}>
          <FieldLabel htmlFor="enquiry-last-name" className={labelClass}>
            Last name
          </FieldLabel>
          <Input
            id="enquiry-last-name"
            autoComplete="family-name"
            placeholder="Benali"
            aria-invalid={!!errors.lastName}
            aria-describedby={
              errors.lastName ? "enquiry-last-name-error" : undefined
            }
            className={cn(controlClass, "h-12")}
            {...form.register("lastName")}
          />
          <FieldError id="enquiry-last-name-error" errors={[errors.lastName]} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="enquiry-email" className={labelClass}>
            Email
          </FieldLabel>
          <Input
            id="enquiry-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className={cn(controlClass, "h-12")}
            {...form.register("email")}
          />
          <FieldError id="enquiry-email-error" errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="enquiry-phone" className={labelClass}>
            Phone
            {/* Marked in the label rather than with a required star on the
                other four: one "optional" is less noise than four asterisks. */}
            <span className="text-house-dim normal-case tracking-normal">
              Optional
            </span>
          </FieldLabel>
          <Input
            id="enquiry-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+212 6 12 34 56 78"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            className={cn(controlClass, "h-12")}
            {...form.register("phone")}
          />
          <FieldError id="enquiry-phone-error" errors={[errors.phone]} />
        </Field>
      </div>

      <Field data-invalid={!!errors.message}>
        <FieldLabel htmlFor="enquiry-message" className={labelClass}>
          Message
        </FieldLabel>
        <Textarea
          id="enquiry-message"
          rows={5}
          placeholder="Dates you have in mind, how many of you, and what you would like to get out of the week."
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "enquiry-message-error" : undefined
          }
          className={cn(
            controlClass,
            // Grows with the text (field-sizing-content) up to ~20 lines, so the
            // browser's resize grip would only duplicate that and scuff the corner.
            "max-h-80 min-h-36 resize-none py-3 leading-relaxed",
          )}
          {...form.register("message")}
        />
        <FieldError id="enquiry-message-error" errors={[errors.message]} />
      </Field>

      {isError && (
        <p
          role="alert"
          className="text-destructive flex items-start gap-2 text-sm leading-relaxed"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          That did not send. Nothing you wrote is lost — please try again in a
          moment.
        </p>
      )}

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="clay"
          disabled={busy}
          aria-busy={busy}
          className="h-12 w-full cursor-pointer gap-2 px-6 text-xs sm:w-auto"
        >
          {busy && (
            <LoaderCircle
              aria-hidden
              className="size-4 animate-spin motion-reduce:animate-none"
            />
          )}
          {busy ? "Sending" : "Send message"}
        </Button>
        <p className="text-house-muted text-xs leading-relaxed">
          We only use your details to reply.
        </p>
      </div>
    </form>
  );
}
