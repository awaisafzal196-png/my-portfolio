"use client";

import { FormEvent, useState } from "react";

type FormFields = {
  name: string;
  email: string;
  phoneOrSubject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const initialFields: FormFields = {
  name: "",
  email: "",
  phoneOrSubject: "",
  message: "",
};

const MIN_MESSAGE_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.phoneOrSubject.trim()) {
    errors.phoneOrSubject = "Phone or subject is required.";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    const fieldName = name as keyof FormFields;

    setFields((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setServerError("");

    const validationErrors = validateForm(fields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phoneOrSubject: fields.phoneOrSubject.trim(),
          message: fields.message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
      setFields(initialFields);
      setErrors({});
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-6"
    >
      {submitted && (
        <div
          role="status"
          className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300"
        >
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-800 dark:text-red-300"
        >
          {serverError}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`mt-2 block w-full rounded-lg border px-4 py-3 text-slate-900 dark:text-slate-100 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.name
                ? "border-red-400 bg-red-50 dark:bg-red-950/30"
                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
            }`}
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`mt-2 block w-full rounded-lg border px-4 py-3 text-slate-900 dark:text-slate-100 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.email
                ? "border-red-400 bg-red-50 dark:bg-red-950/30"
                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
            }`}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-phone-subject"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Phone / Subject{" "}
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-phone-subject"
          name="phoneOrSubject"
          type="text"
          autoComplete="tel"
          value={fields.phoneOrSubject}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.phoneOrSubject ? "true" : "false"}
          aria-describedby={
            errors.phoneOrSubject ? "contact-phone-subject-error" : undefined
          }
          className={`mt-2 block w-full rounded-lg border px-4 py-3 text-slate-900 dark:text-slate-100 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.phoneOrSubject
              ? "border-red-400 bg-red-50 dark:bg-red-950/30"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
          }`}
          placeholder="(555) 123-4567 or Project inquiry"
        />
        {errors.phoneOrSubject && (
          <p
            id="contact-phone-subject-error"
            role="alert"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {errors.phoneOrSubject}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={
            errors.message
              ? "contact-message-error contact-message-hint"
              : "contact-message-hint"
          }
          className={`mt-2 block w-full resize-y rounded-lg border px-4 py-3 text-slate-900 dark:text-slate-100 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.message
              ? "border-red-400 bg-red-50 dark:bg-red-950/30"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
          }`}
          placeholder="Tell me about your project..."
        />
        <p id="contact-message-hint" className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          Minimum {MIN_MESSAGE_LENGTH} characters.
        </p>
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 sm:w-auto"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}